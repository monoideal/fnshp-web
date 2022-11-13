import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReactGA from 'react-ga';
import Button from 'components/shared/Button';
import { useApi } from 'api/';
import _ from 'lodash';
import { useAuth0 } from '@auth0/auth0-react';
import { RATING_ALERT_MSG } from 'constants.js';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  rating: {
    color: theme.palette.red.main,
  },
  formContainer: {
    margin: '30px 0',
    [theme.breakpoints.down('md')]: {
      padding: '0 20px',
    },
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  submitContainer: {
    textAlign: 'center',
  },
  submit: {
    borderWidth: 2,
    color: theme.palette.black.main,
    '&:hover': {
      borderWidth: 2,
      background: theme.palette.white.main,
    },
  },
  loginButton: {
    color: '#c04800',
    textDecoration: 'underline',
    cursor: 'pointer',
    textTransform: 'none',
    verticalAlign: 'none',
    minWidth: '55px',
  },
  alert: {
    color: '#c04800',
    margin: '10px',
  },
}));

const MyRating = ({ bookId, callBack }) => {
  const classes = useStyles();

  const [ratingValue, setRatingValue] = useState(0);
  const [displayName, setDisplayName] = React.useState('');
  const api = useApi();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [isPurchased, setIsPurchased] = useState(true);
  const { fanshipUser, initUsers } = React.useContext(AppContext);

  React.useEffect(() => {
    async function initialize() {
      if (!fanshipUser) {
        initUsers();
      }
      const username = fanshipUser?.fan?.username;
      setDisplayName(username);
    }
    initialize();
  }, [fanshipUser]);

  React.useEffect(() => {
    async function initialize() {
      try {
        const purchaseHistory = await api.fetchOrders();
        if (purchaseHistory.length !== 0) {
          setIsPurchased(
            !!purchaseHistory
              .map(orders => orders.orderItems.map(a => a.bookId).join(','))
              .filter(bookItem => bookItem.includes(bookId)).length,
          );
        }
        const myRating = await api.fetchMyRatingForBook(bookId);
        if (myRating) setRatingValue(myRating.rating);
      } catch (err) {
        console.log(err);
      }
    }
    initialize();
  }, []);

  async function handleClick() {
    try {
      if (isPurchased) {
        const res = await api.updateBookRatings(bookId, ratingValue);
        if (res) {
          setRatingValue(res.rating);
          callBack();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid container className={classes.formContainer}>
      <Grid item xs={12}>
        <Box fontWeight="fontWeightBold">Rate the book</Box>
      </Grid>
      {!_.isEmpty(displayName) ? (
        <Grid item xs={12} className={classes.input}>
          <Rating
            name="rating"
            value={ratingValue}
            onChange={(_, newValue) => setRatingValue(newValue)}
            emptyIcon={<StarBorderIcon className={classes.rating} />}
            className={classes.rating}
          />
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            To rate this book, please
            {!isAuthenticated && (
              <Button
                className={classes.loginButton}
                onClick={() => {
                  ReactGA.event({
                    category: 'User',
                    action: 'Clicked Log in',
                  });
                  loginWithRedirect({
                    appState: { targetUrl: window.location.pathname },
                  });
                }}
              >
                log in
              </Button>
            )}
            or
            {!isAuthenticated && (
              <Button
                className={classes.loginButton}
                onClick={() => {
                  ReactGA.event({
                    category: 'User',
                    action: 'Clicked Join Fanship',
                  });
                  loginWithRedirect({
                    appState: { targetUrl: window.location.pathname },
                  });
                }}
              >
                sign up
              </Button>
            )}
          </Grid>
        </Grid>
      )}
      {isAuthenticated && (
        <Grid item xs={12} className={classes.submitContainer}>
          <Button
            variant="outlined"
            type="button"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            SUBMIT RATING
          </Button>
          {!_.isEmpty(displayName) ? (
            <Grid item xs={12} className={classes.alert}>
              {isPurchased ? '' : RATING_ALERT_MSG}
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      )}
      ;
    </Grid>
  );
};

MyRating.propTypes = {
  bookId: PropTypes.number.isRequired,
  callBack: PropTypes.func,
};

MyRating.defaultProps = {
  callBack: undefined,
};

export default MyRating;
