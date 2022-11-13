import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { shuffle } from 'lodash';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: theme.fanSite.tombstoneMinHeight('book'),
    marginTop: '65px',
  },
  banner: {
    height: theme.fanSite.tombstoneMinHeight('book'),
    background: theme.palette.darkOrange.main,
    color: theme.palette.white.main,
    padding: '14px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 40,
      height: 'auto',
    },
  },
  bannerTitle: {
    fontWeight: 'bold',
    fontSize: '28px',
  },
  bannerContent: {
    fontSize: '18px',
    marginTop: '40px',
    [theme.breakpoints.down('md')]: {
      marginTop: 20,
    },
  },
  itemCollections: {
    [theme.breakpoints.down('md')]: {
      marginBottom: 40,
    },
  },
}));

export default function PaginatedCollection({
  collection,
  isLoading,
  mobileJustify,
}) {
  const currentItems = shuffle(collection).slice(0, 4);
  const classes = useStyles();

  return (
    <Grid container justify={mobileJustify} className={classes.container}>
      {isLoading && 'Loading...'}
      {!isLoading && (
        <Grid item classes={{ root: classes.banner }} xs={12} md={3}>
          <Box classes={{ root: classes.bannerTitle }}>
            What are fans recommending?
          </Box>
          <Box classes={{ root: classes.bannerContent }}>
            {'Here’s what fans in your network are most excited about'}
          </Box>
        </Grid>
      )}
      {currentItems.map(item => (
        <Grid
          key={item.key}
          item
          xs={7}
          md={2}
          className={classes.itemCollections}
        >
          {item}
        </Grid>
      ))}
    </Grid>
  );
}

PaginatedCollection.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.node).isRequired,
  isLoading: PropTypes.bool,
  mobileJustify: PropTypes.string,
};

PaginatedCollection.defaultProps = {
  isLoading: false,
  mobileJustify: 'space-between',
};
