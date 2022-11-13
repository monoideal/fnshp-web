import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles(theme => ({
  marginAdjust: {
    margin: '30px 20px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '30px 100px 0',
    },
  },
  container: {
    background: 'linear-gradient(180deg, #EAE5FF 23%, #FFFFFF 100%)',
    backgroundSize: '100%',
    borderRadius: 6,
    [theme.breakpoints.up('md')]: {
      background: `url(/img/bubble-back-2.png) no-repeat top 53px right,
        url(/img/bubble-back-1.png) no-repeat top 100px right 300px, 
        linear-gradient(180deg, #EAE5FF 23%, #FFFFFF 100%)`,
      backgroundSize: '134px 126px, 120px, 100%',
    },
  },
  header: {
    padding: '10px 15px 12px',
    background:
      'url(/img/bubble-corner-decal@2x.png) no-repeat top 5px right 5px, linear-gradient(90deg, #9282DC 1%, #5341AB 99%)',
    backgroundSize: '38px, 100%',
    boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,0.50)',
    borderRadius: 6,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0,0,0,0.50)',
    [theme.breakpoints.up('sm')]: {
      fontSize: 21,
      padding: '15px 15px 17px',
    },
  },
  advantages: {
    padding: 15,
    fontSize: 15,
    fontWeight: 'bold',
    '& > p': {
      margin: '0 0 10px',
      fontWeight: 'normal',
    },
    [theme.breakpoints.up('sm')]: {
      padding: 25,
      fontSize: 16,
    },
  },
  signup: {
    padding: '0 15px',
    textAlign: 'center',
    '& > div': {
      margin: 10,
      fontSize: 14,
    },
    '& > div > a': {
      textDecoration: 'underline',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 25px',
    },
  },
  signupButton: {
    width: '100%',
    maxWidth: 330,
    padding: '10px',
    backgroundImage: 'linear-gradient(180deg, #FFDD70 0%, #FFC555 100%)',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.50)',
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'none',
    color: '#353535',
  },
}));

const RecommendAdvert = ({ book }) => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();

  return (
    <div className={classes.marginAdjust}>
      <Grid container className={classes.container} alignItems="center">
        <Grid item xs={12} className={classes.header}>
          “{book.title}” has been personally recommended to you!
        </Grid>
        {!isAuthenticated && (
          <>
            <Grid item xs={12} md={6} className={classes.advantages}>
              <p>Don’t miss out! Create a Fanship account to:</p>
              <div>
                <div>
                  <span role="img" aria-label="Checkmark">
                    ✅
                  </span>{' '}
                  Gain 50 points each purchase
                </div>
                <div>
                  <span role="img" aria-label="Checkmark">
                    ✅
                  </span>{' '}
                  Redeem points to get FREE books
                </div>
                <div>
                  <span role="img" aria-label="Checkmark">
                    ✅
                  </span>{' '}
                  Recommend books to gain more points
                </div>
                <div>
                  <span role="img" aria-label="Checkmark">
                    ✅
                  </span>{' '}
                  Post reviews and ratings
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.signup}>
              <Link to="/onboarding">
                <Button className={classes.signupButton}>
                  Create your FREE account!
                </Button>
              </Link>
              <div>
                Already have an account? <Link to="/onboarding">Sign in</Link>
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

RecommendAdvert.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default RecommendAdvert;
