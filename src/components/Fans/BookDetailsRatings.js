import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { pluralizeIfNecessary } from 'util/helpers';
import MyRating from 'components/shared/MyRating';

const useStyles = makeStyles(theme => ({
  ratingContainer: {
    marginTop: 40,
    paddingBottom: 20,
    borderBottom: `solid 1px ${theme.palette.grey.main}`,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '0 20px',
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  rating: {
    color: theme.palette.red.main,
  },
  ratingBox: {
    marginTop: theme.spacing(1),
  },
}));

export default function BookDetailsRatings({ book, callBackRating }) {
  const classes = useStyles();

  return (
    <div className={classes.ratingContainer}>
      <Box className={classes.title}>Current rating</Box>
      <Rating
        key="rating"
        name="readRating"
        readOnly
        value={book.rating}
        className={classes.rating}
        emptyIcon={<StarBorderIcon className={classes.rating} />}
      />
      <Box key="box" className={classes.ratingBox}>
        {`Based on ${book.numRatings} ${pluralizeIfNecessary(
          'review',
          book.numRatings,
        )}`}
      </Box>
      <MyRating bookId={book.id} callBack={callBackRating} />
    </div>
  );
}

BookDetailsRatings.propTypes = {
  book: PropTypes.shape({
    rating: PropTypes.number,
    numRatings: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  callBackRating: PropTypes.func,
};
BookDetailsRatings.defaultProps = {
  callBackRating: undefined,
};
