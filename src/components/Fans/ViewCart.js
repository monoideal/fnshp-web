import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import AlignedItems from 'components/shared/AlignedItems';
import Button from 'components/shared/Button';
import { useCart } from 'components/Fans/Cart';
import ViewCartItems from 'components/Fans/ViewCartItems';
import { formatCurrency, calculateSubtotal } from 'util/helpers';
import LockIcon from '@material-ui/icons/Lock';
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles(theme => ({
  titleContainer: {
    textAlign: 'center',
    margin: '80px 0 60px',
  },
  titleContent: {
    borderBottom: `solid ${theme.palette.primary.main} 4px`,
    width: '100%',
  },
  regContainer: {
    marginTop: 30,
    padding: '20px 25px 10px',
    border: `solid ${theme.palette.primary.main} 1px`,
    borderRadius: 5,
    background: '#FFF9F2',
    maxWidth: '500px',
    '& > h3': {
      textAlign: 'left',
      marginTop: 0,
      [theme.breakpoints.down('md')]: {
        fontSize: '16px',
        textAlign: 'center',
      },
    },
    '& > ul': {
      [theme.breakpoints.down('md')]: {
        textAlign: 'left',
      },
    },
    '& > ul > li': {
      listStylePosition: 'inside',
      [theme.breakpoints.down('md')]: {
        listStylePosition: 'outside',
      },
    },
    '& button': {
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    '& button svg': {
      width: 18,
      marginLeft: 5,
    },
  },
  regTitle: {
    borderBottom: `solid ${theme.palette.primary.main} 4px`,
    width: '100%',
  },
}));

const useFooterStyles = makeStyles(theme => ({
  checkoutContainer: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
      marginBottom: 50,
    },
  },
  leftContainer: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      alignItems: 'flex-end',
      paddingRight: 20,
      fontWeight: 500,
    },
  },
  rightContainer: {
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      margin: '0 20px 20px 20px',
      lineHeight: '24px',
      textAlign: 'center',
    },
  },
  arrowIcon: {
    marginRight: '10px',
  },
  buttonContainer: {
    marginTop: '30px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      marginBottom: 20,
    },
    '& button svg': {
      width: 18,
      marginLeft: 5,
    },
  },
  noPointsEarned: {
    marginTop: 10,
  },
  anonCheckoutButton: {
    color: '#000000',
    borderColor: '#000000',
  },
}));

function Title() {
  const classes = useStyles();
  return (
    <div className={classes.titleContainer}>
      <Box
        className={classes.titleContent}
        fontSize="22px"
        fontWeight="fontWeightBold"
        component="span"
      >
        Your shopping cart
      </Box>
    </div>
  );
}

function RegisteredLogin() {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  return (
    <div className={classes.regContainer}>
      <h3>Purchase with a Fanship account</h3>
      <Button
        type="button"
        color="primary"
        variant="contained"
        onClick={() => {
          ReactGA.event({
            category: 'User',
            action: 'Clicked Log in',
          });
          loginWithRedirect()
        }}
      >
        Member Checkout <LockIcon />
      </Button>
      <ul>
        <li>Earn 50 points each purchase</li>
        <li>Earn points by making recommondations</li>
      </ul>
    </div>
  );
}

function Footer({ countBooks, generateCheckoutUrl }) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const classes = useFooterStyles();
  const { cart } = useCart();
  const { isAuthenticated } = useAuth0();

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  }

  async function handleClickCheckout() {
    const checkoutUrl = await generateCheckoutUrl();
    window.location.href = checkoutUrl;
  }

  const subtotal = calculateSubtotal(cart);
  return (
    <>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Cart has been updated"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      />
      <Grid container className={classes.checkoutContainer}>
        <Grid className={classes.leftContainer} item xs={12} md={6}>
          <Link to="/books">
            <AlignedItems
              items={[
                <ArrowBackIcon
                  className={classes.arrowIcon}
                  color="primary"
                  key="icon"
                />,
                'CONTINUE SHOPPING',
              ]}
            />
          </Link>
        </Grid>
        <Grid className={classes.rightContainer} item xs={12} md={6}>
          <Box fontSize="20px" fontWeight="fontWeightBold">
            {`Subtotal: ${formatCurrency(subtotal)}`}
          </Box>
          <Box fontSize="14px">
            {'Discounts & Taxes Calculated at Checkout'}
          </Box>
          {!isAuthenticated ? (
            <>
              <div className={classes.buttonContainer}>
                <Button
                  type="button"
                  disabled={!countBooks}
                  color="primary"
                  variant="outlined"
                  onClick={handleClickCheckout}
                  className={classes.anonCheckoutButton}
                >
                  Anonymous Checkout <LockIcon />
                </Button>
                <div className={classes.noPointsEarned}>0 points earned</div>
              </div>
              <RegisteredLogin />{' '}
            </>
          ) : (
            <div className={classes.buttonContainer}>
              <Button
                type="button"
                disabled={!countBooks}
                color="primary"
                variant="contained"
                onClick={handleClickCheckout}
              >
                Checkout <LockIcon />
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}

Footer.propTypes = {
  countBooks: PropTypes.number.isRequired,
  generateCheckoutUrl: PropTypes.func.isRequired,
};

export default function ViewCart() {
  const { cart, generateCheckoutUrl } = useCart();

  const countBooks = Object.keys(cart).length;

  if (!cart) return 'Loading...';

  return (
    <>
      <Title />
      <ViewCartItems books={Object.values(cart)} />
      <Footer
        generateCheckoutUrl={generateCheckoutUrl}
        countBooks={countBooks}
      />
    </>
  );
}
