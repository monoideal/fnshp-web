import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Divider, TextField } from '@material-ui/core';
import Button from 'components/shared/Button';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '20px',
  },
  bookCover: {
    width: '100%',
    maxHeight: '200px',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      maxHeight: '100px',
    },
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  divider: {
    margin: '30px 5px',
  },
  shareContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
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
  textField: {
    width: '100%',
    '& label': {
      fontSize: 14,
    },
  },
}));

export default function RecommendBookReadYear({ book, onNext }) {
  const classes = useStyles();
  const { fanshipUser } = React.useContext(AppContext);
  const user = fanshipUser;

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <div style={{ height: '100%' }}>
            <img
              alt="book-cover"
              className={classes.bookCover}
              src={book.coverUrl}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={9} className={classes.descriptionContainer}>
          <Box
            fontSize={{ xs: 17, md: 31 }}
            marginBottom={{ xs: 2, md: 0 }}
            fontWeight="fontWeightBold"
          >
            {`${user.fan.username}'s Recommendation`}
          </Box>
          <Box fontSize={{ xs: 17, md: 20 }}>{book.title}</Box>
          <Box fontSize={{ xs: 14, md: 17 }}>
            {book.contributors
              ? `by ${book.contributors
                  .slice(0, 1)
                  .map(a => a.displayName)
                  .join(', ')}`
              : ''}
          </Box>
        </Grid>
      </Grid>
      <Divider variant="middle" className={classes.divider} />
      <div className={classes.shareContainer}>
        <Box fontSize={{ xs: 14, md: 17 }} fontWeight="fontWeightBold">
          Have you read this book before?
        </Box>
        <div>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Enter the year you read the book"
            margin="normal"
            variant="outlined"
          />
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
      </div>
    </div>
  );
}

RecommendBookReadYear.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    coverUrl: PropTypes.string,
    title: PropTypes.string,
    contributors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    isbn: PropTypes.string,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
};
