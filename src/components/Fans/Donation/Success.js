import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const selectPointsStyle = makeStyles(theme => ({
  container: {
    background: '#cee7f5',
    textAlign: 'center',
  },
  title: {
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '22px',
    color: theme.palette.black.main,
    marginBottom: '22px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    textAlign: 'center',
  },
  mobileImage: {
    '@media (max-width: 400px)': {
      width: '200px',
    },
  },
  thanksMessage: {
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '24px',
    marginTop: '15px',
  },
  bottomTxt: {
    marginTop: '42px',
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '14px',
    marginRight: '10%',
    marginLeft: '10%',
    marginBottom: '5%',
  },
}));

export default function Success({ displayMessage }) {
  const classes = selectPointsStyle();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.title}>
        {displayMessage}
      </Grid>
      <Grid item xs={12} className={classes.image}>
        <img
          className={classes.mobileImage}
          src="/img/rewardsSuccess.png"
          alt="navigation icon"
        />
      </Grid>
      <Grid item xs={12} className={classes.thanksMessage}>
        Thanks for your donation!
      </Grid>
      <Grid item xs={12} className={classes.bottomTxt}>
        Thank you for using your Fanship points to support a great cause. Earn more points by continuing to buy and recommend great reads on Fanship.
      </Grid>
    </Grid>
  );
}

Success.propTypes = {
  displayMessage: PropTypes.string.isRequired,
};
