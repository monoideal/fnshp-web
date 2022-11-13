import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Slider } from '@material-ui/core';

const PrettoSlider = withStyles(theme => ({
  root: {
    height: 10,
    paddingTop: '2px',
  },
  thumb: {
    height: 33,
    width: 18,
    backgroundColor: theme.palette.white.main,
    border: '2px solid #D3D3D3',
    borderRadius: '8px',
    marginTop: -7,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  track: {
    height: 6,
    borderRadius: 5,
    marginTop: '7px',
    marginLeft: '5px',
    marginRight: '5px',
    background: theme.palette.red.main,
  },
  rail: {
    height: 15,
    borderRadius: 3,
    color: '#fff',
    border: '2px solid #BEBEBE',
  },
}))(Slider);

const selectPointsStyle = makeStyles(theme => ({
  container: {
    maxWidth: '400px',
    margin: '5px',
  },
  text: {
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '18px',
    color: theme.palette.black.main,
    marginBottom: '22px',
  },
  sliderPoints: {
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '14px',
    color: '#999999',
  },
  pointsCalculator: {
    marginTop: '42px',
    '& div': {
      fontFamily: "'Rubik','sans-serif'",
      fontSize: '20px',
    },
  },
  pointsBox: {
    border: '1px solid #999999',
    borderRadius: '4px',
    textAlign: 'end',
    width: '95px',
    fontWeight: 'bold',
  },
  equalSign: {
    textAlign: 'center',
    fontWeight: 'bold',
    '@media (max-width: 400px)': {
      textAlign: 'left',
    },
  },
  bottomTxt: {
    marginTop: '42px',
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '14px',
    maxWidth: '550px',
  },
  sliderBox: {
    marginLeft: '10px',
  },
}));

export default function SelectPoints({
  handlePoints,
  fanPoints,
  selectedPoints,
  donationValue,
}) {
  const classes = selectPointsStyle();

  return (
    <>
      <Grid container className={classes.container}>
        <Typography gutterBottom className={classes.text}>
          How much you want to donate?
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography className={classes.sliderPoints}>0 Pt</Typography>
          <Typography className={classes.sliderPoints}>
            {fanPoints} Pt
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.sliderBox}>
          <PrettoSlider
            aria-label="pretto slider"
            defaultValue={selectedPoints}
            min={0}
            max={fanPoints}
            onChange={handlePoints}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} className={classes.pointsCalculator}>
            <Grid item xs={6} sm={2} className={classes.pointsBox}>
              {selectedPoints}
            </Grid>
            <Grid item xs={6} sm={2}>
              Points
            </Grid>
            <Grid item xs={12} sm={2} className={classes.equalSign}>
              =
            </Grid>
            <Grid item xs={6} sm={2} className={classes.pointsBox}>
              {donationValue}
            </Grid>
            <Grid item xs={6} sm={2}>
              CAD
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.bottomTxt}>
      Click continue to confirm your donation.
      </Grid>
    </>
  );
}

SelectPoints.propTypes = {
  fanPoints: PropTypes.number.isRequired,
  selectedPoints: PropTypes.number.isRequired,
  handlePoints: PropTypes.func.isRequired,
  donationValue: PropTypes.string.isRequired,
};
