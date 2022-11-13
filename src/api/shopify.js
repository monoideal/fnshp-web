import Client from 'shopify-buy';

import config from 'config';

export default function initializeShopify() {
  const client = Client.buildClient({
    domain: config.SHOPIFY_DOMAIN,
    storefrontAccessToken: config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  });

  return {
    fetchBooks: async ids => client.product.fetchMultiple(ids),

    fetchBook: async productId => client.product.fetch(productId),

    createCheckout: async variantId => {
      const emptyCheckout = await client.checkout.create();
      const checkout = await client.checkout.addLineItems(emptyCheckout.id, {
        variantId,
        quantity: 1,
      });
      window.location.href = checkout.webUrl;
    },
  };
}
