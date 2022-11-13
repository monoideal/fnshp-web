import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const bookPreveiwHeight = '40px';
const bookPreviewWidth = '30px';

const useStyles = makeStyles({
  image: {
    height: bookPreveiwHeight,
    width: bookPreviewWidth,
    marginRight: '2%',
  },
  gridItem: {
    width: '16.6%',
    marginRight: '2%',
  },
  box: {
    boxSizing: 'border-box',
    height: bookPreveiwHeight,
    lineHeight: bookPreveiwHeight,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
});

export default function BookRow({ book }) {
  const classes = useStyles();
  return (
    <>
      <img alt="book-preview" src={book.coverUrl} className={classes.image} />
      <Grid item xs={2} zeroMinWidth classes={{ root: classes.gridItem }}>
        {/*
        FIXME I don't think this is right. books have many isbns
        <Box classes={{ root: classes.box }}>
          {book.isbn}
        </Box>
        */}
      </Grid>
      <Grid item xs={2} zeroMinWidth classes={{ root: classes.gridItem }}>
        <Box classes={{ root: classes.box }}>{book.title}</Box>
      </Grid>
      <Grid item xs={2} zeroMinWidth classes={{ root: classes.gridItem }}>
        <Box classes={{ root: classes.box }}>
          {book.contributors.map(a => a.displayName).join(', ')}
        </Box>
      </Grid>
      <Grid item xs={2} zeroMinWidth classes={{ root: classes.gridItem }}>
        <Box classes={{ root: classes.box }}>{book.publisher}</Box>
      </Grid>
      <Grid item xs={2} zeroMinWidth classes={{ root: classes.gridItem }}>
        <Box classes={{ root: classes.box }}>{book.subject}</Box>
      </Grid>
      <Grid item xs={2} zeroMinWidth classes={{ root: classes.gridItem }}>
        <img alt="approved" src={`/${book.status.toLowerCase()}.svg`} />
      </Grid>
    </>
  );
}

BookRow.propTypes = {
  book: PropTypes.shape({
    coverUrl: PropTypes.string,
    // isbn: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.string,
    contributors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    publisher: PropTypes.string,
    subject: PropTypes.string,
  }).isRequired,
};
