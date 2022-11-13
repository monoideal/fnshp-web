import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from 'prop-types';
import Client from 'shopify-buy';
import { omit, get, merge, map, flatMap, sumBy, pick } from 'lodash';
import base64 from 'base-64';
import ReactGA from 'react-ga';

import CartModal from 'components/Fans/CartModal';
import { useApi } from 'api/';
import config from 'config';
import { AppContext } from 'components/AppContext';
import { createRecommendationHitsStore } from 'util/helpers';

const client = Client.buildClient({
  domain: config.SHOPIFY_DOMAIN,
  storefrontAccessToken: config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const { isAuthenticated } = useAuth0();
  const [checkoutId, setCheckoutId] = useState();
  const [discountCode, setDiscountCode] = useState();
  const [showModal, setShowModal] = useState(false);
  const [activeBook, setActiveBook] = useState(null);
  const persistRecommendationHits = useCallback(
    createRecommendationHitsStore(),
    [],
  );

  const { fanshipUser, initUsers } = React.useContext(AppContext);
  const api = useApi();

  async function persistCart(updatedCart) {
    if (fanshipUser?.id) {
      // write current state to datastore
      const cartState = { cart: updatedCart, checkoutId, discountCode };
      await api.setCartState(cartState);
    }

    const cartState = JSON.stringify({
      checkoutId,
      cart: updatedCart,
      discountCode,
    });
    sessionStorage.setItem('cartState', cartState);
  }

  async function loadCart() {
    if (fanshipUser?.id) {
      // read state from datastore if exist
      const cartState = await api.fetchCartState();
      const guestCartState = JSON.parse(
        sessionStorage.getItem('cartState') || '{}',
      );

      sessionStorage.setItem(
        'cartState',
        JSON.stringify(merge({}, cartState, guestCartState)),
      );
      return merge({}, cartState, guestCartState);
    }
    return JSON.parse(sessionStorage.getItem('cartState') || '{}');
  }

  async function checkOrderCompletion(oldChekoutId) {
    try {
      if (!oldChekoutId) return;
      const oldCheckout = await client.checkout.fetch(oldChekoutId);
      if (oldCheckout && oldCheckout.completedAt) {
        setCart({});
        setCheckoutId(undefined);
        setDiscountCode(undefined);

        sessionStorage.setItem('cartState', JSON.stringify({}));

        if (fanshipUser?.id) {
          // write current state to datastore
          await api.setCartState({
            cart: {},
            checkoutId: undefined,
            discountCode: undefined,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function initialize() {
      if (!fanshipUser && isAuthenticated) {
        try {
          await initUsers();
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const {
            cart: oldCart,
            checkoutId: oldChekoutId,
            discountCode: oldDiscountCode,
          } = await loadCart();
          if (oldCart) setCart(oldCart);
          if (oldChekoutId) setCheckoutId(oldChekoutId);
          if (oldDiscountCode) setDiscountCode(oldDiscountCode);
          await checkOrderCompletion(oldChekoutId);
        } catch (err) {
          console.log(err);
        }
      }
    }
    initialize();
  }, [fanshipUser]);

  async function addDiscountCode(bookId) {
    const { code } = await api.generateDiscountCode(bookId);
    setDiscountCode({ bookId, code });
  }

  async function generateCheckoutUrl() {
    let checkout = await client.checkout.create();
    setCheckoutId(checkout.id);

    const lineItems = Object.values(cart).map(book => ({
      variantId: base64.encode(
        `gid://shopify/ProductVariant/${book.variantId}`,
      ),
      quantity: 1,
    }));

    const downloadUrls = Object.values(cart).map(book =>
      pick(book, ['id', 'title', 'downloadUrl']),
    );

    const customAttributes = [
      {
        key: 'homepage',
        value: `${window.location.protocol}//${window.location.host}/`,
      },
      { key: 'serverHost', value: config.SERVER_HOST },
      { key: 'downloadUrls', value: JSON.stringify(downloadUrls) },
    ];
    if (fanshipUser?.id) {
      customAttributes.push({ key: 'userId', value: `${fanshipUser?.id}` });
    }

    const tips = flatMap(Object.values(cart), book =>
      map(book.tips, (value, key) => ({
        profileId: key,
        bookId: book.id,
        value,
      })),
    );

    const recommendations = Object.values(cart)
      .filter(book => book.recHitId)
      .map(book => ({ bookId: book.id, recHitId: book.recHitId }));
    customAttributes.push({
      key: 'recommendations',
      value: JSON.stringify(recommendations),
    });

    const sumTips = sumBy(tips, 'value');
    if (tips.length) {
      customAttributes.push({ key: 'tips', value: JSON.stringify(tips) });
      const tipProduct = await client.product.fetchByHandle('tips');
      if (sumTips) {
        lineItems.push({
          variantId: tipProduct.variants[0].id,
          quantity: Math.ceil(sumTips),
        });
      }
    }

    if (discountCode) {
      checkout = await client.checkout.addDiscount(
        checkout.id,
        discountCode.code,
      );
    }

    checkout = await client.checkout.updateAttributes(checkout.id, {
      customAttributes,
    });
    checkout = await client.checkout.addLineItems(checkout.id, lineItems);

    if (fanshipUser?.id) {
      // write current state to datastore
      const cartState = { cart, checkoutId: checkout.id, discountCode };
      await api.setCartState(cartState);
    }

    const cartState = JSON.stringify({
      checkoutId: checkout.id,
      cart,
      discountCode,
    });
    sessionStorage.setItem('cartState', cartState);

    return checkout.webUrl;
  }

  function addToCart(newBook, asset) {
    if (fanshipUser && (fanshipUser.organization || fanshipUser.creator))
      return;
    const book = cart[newBook.id] || newBook;
    ReactGA.event({
      category: 'User',
      action: `Cart - Adding book to cart with id ${book.id}`,
    });
    book.variantId = asset.shopifyId;
    book.downloadUrl = asset.downloadUrl;

    const recHits = persistRecommendationHits.get();
    const recHit = Object.values(recHits).find(hit => hit.bookId === book.id);
    if (recHit && recHit.recHitId) {
      book.recHitId = recHit.recHitId;
    }

    setCart({ ...cart, [book.id]: book });
    persistCart({ ...cart, [book.id]: book });
    setActiveBook(book);
    setShowModal(true);
  }

  function updateTip(bookId, profileId, tip) {
    const book = cart[bookId];
    if (!book.tips) book.tips = {};
    book.tips[profileId] = tip;
    setCart({ ...cart, [bookId]: book });
    persistCart({ ...cart, [book.id]: book });
  }

  function removeFromCart(bookId) {
    setCart(omit(cart, bookId));
    persistCart(omit(cart, bookId));
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateTip,
        generateCheckoutUrl,
        addDiscountCode,
        discountCode,
      }}
    >
      <CartModal
        show={showModal}
        onCloseModal={handleCloseModal}
        book={activeBook}
        cart={cart}
      />
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};
