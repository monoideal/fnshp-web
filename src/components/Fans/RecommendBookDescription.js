import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from 'components/shared/Button';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  image: {
    width: '100%',
    height: '100%',
    maxWidth: '300px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '200px',
    },
  },
  descriptionContainer: {
    marginBottom: '90px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '30px',
    },
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '15px',
  },
  button: {
    color: theme.palette.black.main,
    borderWidth: '2px',
    '&:hover': {
      background: 'inherit',
      borderWidth: '2px',
    },
  },
}));

export default function RecommendBookDescription({ bookTitle, onNext }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          alt="recommending"
          src="/img/deco/recommending.png"
        />
      </div>
      <div className={classes.descriptionContainer}>
        <Box fontSize="17px">
          Thank you for selecting <b>{bookTitle}</b> to recommend. Click
          Continue to access your unique link to recommend this book to anyone
          you think will love it as much as you.
          <br /> <br />
          When your recommendations result in a sale, you’ll earn reward points
          that can be redeemed for free books or donated to a worthy cause. You
          can also see how your recommendations are acted upon in the “My
          Recommendations” tab of your account.
        </Box>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          type="button"
          onClick={onNext}
        >
          CONTINUE
        </Button>
      </div>
    </>
  );
}

RecommendBookDescription.propTypes = {
  onNext: PropTypes.func.isRequired,
  bookTitle: PropTypes.string.isRequired,
};
