import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const selectPointsStyle = makeStyles(theme => ({
  container: {
    maxWidth: '400px',
  },
  text: {
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '18px',
    color: theme.palette.black.main,
    marginBottom: '22px',
  },
  pointsCalculator: {
    marginTop: '20px',
    '& span': {
      fontFamily: "'Rubik','sans-serif'",
      fontSize: '18px',
    },
  },
  cadPoints: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  edit: {
    color: '#c04800',
    textDecoration: 'underline',
    fontSize: '14px',
    cursor: 'pointer',
  },
  bottomTxt: {
    marginTop: '42px',
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '14px',
    maxWidth: '550px',
  },
}));

export default function PointsConfirmation({
  handleEdit,
  donationValue,
  selectedPoints,
}) {
  const classes = selectPointsStyle();

  return (
    <>
      <Grid container className={classes.container}>
        <Typography gutterBottom className={classes.text}>
          Please confirm you donation amount.
        </Typography>
        <Grid item xs={12} className={classes.pointsCalculator}>
          <span className={classes.cadPoints}>$ {donationValue} CAD </span>
          <span>({selectedPoints} points) &nbsp;&nbsp;</span>
          <span className={classes.edit} onClick={handleEdit}>
            edit
          </span>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.bottomTxt}>
        Click confirm to complete your donation.  
      </Grid>
    </>
  );
}

PointsConfirmation.propTypes = {
  selectedPoints: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired,
  donationValue: PropTypes.string.isRequired,
};
