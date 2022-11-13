import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Breadcrumbs from 'components/Fans/Breadcrumbs';

const useStyles = makeStyles(theme => ({
  container: {
    '& > h1': {
      margin: '7px 0 0',
      fontSize: 32,
      fontWeight: 'bold',
      color: '#361550',
      [theme.breakpoints.down('md')]: {
        marginTop: 0,
        padding: '0 15px',
        fontSize: 24,
      },
    },
  },
}));

export default function BrowseHeader({ category, isPopularBooks }) {
  const classes = useStyles();
  return (
    <Grid container direction="row" className={classes.container}>
      <Breadcrumbs />
      {isPopularBooks ? (
        <h1>Popular Books</h1>
      ) : (
        <h1>{category && category.name ? category.name : 'All Books'}</h1>
      )}
    </Grid>
  );
}

BrowseHeader.defaultProps = {
  category: { name: '' },
  isPopularBooks: false,
};

BrowseHeader.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
  }),
  isPopularBooks: PropTypes.bool,
};
