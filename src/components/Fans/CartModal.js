import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ReactGA from 'react-ga';
import { Dialog, Box, IconButton, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'components/shared/Button';
import CartItem from 'components/Fans/CartItem';
import { formatCurrency, calculateSubtotal } from 'util/helpers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Applaud from 'components/Fans/Applaud';
import { find } from 'lodash';

const useStyles = makeStyles(theme => ({
  dialog: {
    maxWidth: '700px',
    height: 'auto',
    padding: '30px',
    [theme.breakpoints.down('md')]: {
      padding: '40px 20px 20px',
    },
    overflow: 'hidden',
  },
  closeIconContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  header: {
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      marginBottom: 0,
    },
  },
  previewImage: {
    width: '100%',
  },
  paddedItem: {
    padding: '15px 0',
  },
  subtotalValue: {
    color: theme.palette.red.main,
  },
  button: {
    display: 'block',
    marginBottom: '10px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      width: '100%',
    },
    textTransform: 'none',
  },
  regButton: {
    color: theme.palette.black.main,
    fontSize: '17px',
  },
  buttonSecondary: {
    display: 'block',
    padding: 0,
    margin: 0,
    background: 'transparent',
    fontSize: '14px',
    fontWeight: 'normal',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& span span': {
      color: '#c04800',
      textDecoration: 'underline',
    },
  },
  continueShoppingButton: {
    marginBottom: 0,
    color: theme.palette.black.main,
    borderWidth: '2px',
    '&:hover': {
      borderWidth: '2px',
      background: 'inherit',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  adcontainer: {
    marginBottom: '20px',
    background: '#FFF9F2',
    padding: '15px 20px',
    fontSize: '17px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  title: {
    margin: 0,
    fontSize: '17px',
    fontWeight: 'normal',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  body: {
    margin: '10px 0',
    lineHeight: '1.3',
    '& > ul': {
      margin: '10px 0 0',
      paddingLeft: 20,
      fontWeight: 'bold',
    },
  },
  arrowIcon: {
    marginBottom: '-7px',
  },
  buttonlink: {
    fontWeight: 'normal',
  },
}));

function RegAd() {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={classes.adcontainer}>
      <h3 className={classes.title}>
        Don't miss out! Create a Fanship account to:
      </h3>
      <div className={classes.body}>
        <ul>
          <li>Earn 50 points each purchase</li>
          <li>Redeem points to get FREE books</li>
          <li>Recommend books to gain more points</li>
          <li>Post reviews and ratings</li>
        </ul>
      </div>
      <Button
        onClick={() => {
          ReactGA.event({
            category: 'User',
            action: 'Clicked Join Fanship',
          });
          loginWithRedirect();
        }}
        color="primary"
        variant="contained"
        className={clsx(classes.button, classes.regButton)}
      >
        Create your FREE account
      </Button>
      <Button
        className={classes.buttonSecondary}
        onClick={() => loginWithRedirect()}
      >
        Already have an account? <span>Sign In</span>
      </Button>
    </div>
  );
}

export default function CartModal({ show, onCloseModal, book, cart }) {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const { isAuthenticated } = useAuth0();

  if (!book) return '';

  const fullContributors = book.contributors.map(contributor => {
    const profile = find(book.profiles, { id: contributor.profileId });
    return { ...contributor, ...profile };
  });

  const subtotal = calculateSubtotal(cart);

  const DesktopContent = () => (
    <>
      <CartItem book={book} />
      <div className={classes.paddedItem}>
        <Box>{`Items in your cart: ${Object.keys(cart).length}`}</Box>
        {/* <div className={classes.paddedItem}>
          <Box fontSize="17px">Applaud the author</Box>
          {fullContributors &&
            fullContributors
              .filter(author => author.contributorType === 'AUTHOR')
              .filter(author => author.profileId)
              .map(author => (
                <Applaud
                  key={author.id}
                  author={author}
                  profileId={author.profileId}
                  initialTip={2}
                  bookId={book.id}
                  isPopup={false}
                />
              ))}
        </div> */}
        <div>
          <Box component="span" fontWeight="fontWeightBold" fontSize="17px">
            Subtotal{' '}
          </Box>
          <Box
            component="span"
            className={classes.subtotalValue}
            fontWeight="fontWeightBold"
            fontSize="24px"
          >
            {formatCurrency(subtotal)}
          </Box>
        </div>
      </div>
      {isAuthenticated ? (
        <>
          <Link to="/fans/cart">
            <Button
              color="primary"
              variant="contained"
              onClick={onCloseModal}
              className={classes.button}
            >
              Continue to checkout{' '}
              <ArrowRightAltIcon className={classes.arrowIcon} />
            </Button>
          </Link>
        </>
      ) : (
        <>
          <RegAd />
          <Link to="/fans/cart">
            <Button
              onClick={onCloseModal}
              className={clsx(classes.button, classes.buttonlink)}
            >
              Continue to checkout without claiming points{' '}
              <ArrowRightAltIcon className={classes.arrowIcon} />
            </Button>
          </Link>
        </>
      )}
    </>
  );
  const MobileContent = () => (
    <>
      <Grid item xs={12}>
        <div className={classes.paddedItem}>
          <Box fontSize={{ xs: 14, md: 17 }}>
            {`There are ${Object.keys(cart).length} items in your cart`}
          </Box>
          <div>
            <Box
              component="span"
              fontWeight="fontWeightBold"
              fontSize={{ xs: 16, md: 17 }}
            >
              SUBTOTAL
            </Box>
            <Box
              component="span"
              className={classes.subtotalValue}
              fontWeight="fontWeightBold"
              fontSize={{ xs: 21, md: 24 }}
              px={1}
            >
              {formatCurrency(subtotal)}
            </Box>
          </div>
        </div>
        {isAuthenticated ? (
          <>
            <Link to="/fans/cart">
              <Button
                color="primary"
                variant="contained"
                onClick={onCloseModal}
                className={classes.button}
              >
                Continue to checkout{' '}
                <ArrowRightAltIcon className={classes.arrowIcon} />
              </Button>
            </Link>
          </>
        ) : (
          <>
            <RegAd />
            <Link to="/fans/cart">
              <Button
                onClick={onCloseModal}
                className={clsx(classes.button, classes.buttonlink)}
              >
                Continue to checkout without claiming points{' '}
                <ArrowRightAltIcon className={classes.arrowIcon} />
              </Button>
            </Link>
          </>
        )}
      </Grid>
    </>
  );

  return (
    <Dialog
      onBackdropClick={onCloseModal}
      TransitionProps={{ tabIndex: {} }}
      open={show}
      classes={{ paper: classes.dialog }}
    >
      <div className={classes.closeIconContainer}>
        <IconButton size="small" onClick={onCloseModal}>
          <CloseIcon />
        </IconButton>
      </div>
      <Box
        fontWeight="fontWeightBold"
        fontSize="22px"
        className={classes.header}
      >
        {'Added to cart successfully!'}
      </Box>
      <Grid spacing={4}>
        {desktopView ? <DesktopContent /> : <MobileContent />}
      </Grid>
    </Dialog>
  );
}

CartModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  cart: PropTypes.shape({}).isRequired,
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    coverUrl: PropTypes.string,
    assets: PropTypes.arrayOf(PropTypes.shape({ format: PropTypes.string })),
    authors: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    tips: PropTypes.shape({}),
    price: PropTypes.number,
  }),
};

CartModal.defaultProps = {
  book: null,
};
