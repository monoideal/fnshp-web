import React from 'react';
import PropTypes from 'prop-types';
import history from 'lib/history';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 50,
    backgroundImage: 'linear-gradient(180deg, #E0ECEE 0%, #FFFFFF 100%)',
    border: '1px solid #D5E1E3',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      marginTop: 60,
    },
  },
  titleCont: {
    padding: 30,
    boxSizing: 'border-box',
    width: '40%',
    '& > h2': {
      marginTop: 0,
      fontSize: '21px',
    },
    '& > h3 > a': {
      textDecoration: 'underline',
    },
    '& > h3': {
      marginBottom: 0,
      fontSize: '18px',
      fontWeight: 'normal',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 15px',
      width: '100%',
      textAlign: 'center',
    },
  },
  imageCont: {
    width: '20%',
    marginTop: '-55px',
    // marginTop: '-51px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-51px',
      width: '100%',
      order: '-1',
      paddingTop: 0,
    },
  },
  buttonCont: {
    width: '40%',
    padding: 30,
    boxSizing: 'border-box',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingTop: 0,
    },
  },
  button: {
    width: 250,
    minHeight: 40,
    backgroundColor: '#629FA9',
    boxShadow: '1px 2px 6px 0 rgba(0,0,0,0.26)',
    color: '#FFFFFF',
    lineHeight: '1.5',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#033C5D',
    },
  },
  weekly: {
    width: '100%',
    padding: 20,
    borderTop: 'solid 1px #D5E1E3',
    fontSize: '16px',
    color: '#838484',
    letterSpacing: '0.31px',
    textAlign: 'center',
  },
}));
/**
 * Use H2 as a title if one exsists
 * User H3 as the description text
 */
export default function Discovery({ callBack }) {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleClick = () => {
    ReactGA.event({
      category: 'Discovery',
      action: 'Link used to Discover Fanship Staff Picks search',
    });
    history.push('/books?q=Staff%20Picks%202020');
    callBack();
  };

  const handleClickJoin = () => {
    ReactGA.event({
      category: 'Discovery',
      action: 'Link used to Discover Fanship Staff Picks signup',
    });
    loginWithRedirect();
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleCont}>
        <h2>Books of Our Year</h2>
        <h3>
          Browse books read, loved and recommended by Fanship staff in 2020.
        </h3>
      </div>
      <div className={classes.imageCont}>
        <img
          className={classes.booksImage}
          srcSet="
						/img/discovery-staff-picks-2020.png 1x, 
						/img/discovery-staff-picks-2020@2x.png 2x"
          alt="Books"
        />
      </div>
      <div className={classes.buttonCont}>
        <Button className={classes.button} onClick={handleClick}>
          DISCOVER OUR STAFF PICKS
        </Button>
        {!isAuthenticated && (
          <>
            <Button
              style={{ marginTop: 15 }}
              className={classes.button}
              onClick={handleClickJoin}
            >
              JOIN FANSHIP
            </Button>
            <p style={{ marginTop: 5, fontSize: 14, marginBottom: 0 }}>
              Earn points when you
              <br />
              recommend books!
            </p>
          </>
        )}
      </div>
      <div className={classes.weekly}>
        <strong>DISCOVERY ZONE:</strong> Where the thrill of the hunt uncovers
        your next favourite read.
      </div>
    </div>
  );
}

Discovery.propTypes = {
  callBack: PropTypes.func,
};

Discovery.defaultProps = {
  callBack: () => {},
};
