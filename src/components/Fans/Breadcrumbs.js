import React from 'react';
import { Grid } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { AppContext } from 'components/AppContext';
import { findCategory } from 'util/helpers';

const useStyles = makeStyles(theme => ({
  breadcrumbContainer: {
    marginTop: 5,
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      margin: '0px 15px 8px',
    },
  },
  breadcrumb: {
    padding: '0px 3px',
  },
}));

export default function Breadcrumbs() {
  const classes = useStyles();
  const { categories } = React.useContext(AppContext);
  const { parent, child } = useParams();
  const selectedParentCategory = findCategory(categories, parent, null);
  const selectedChildCategory = findCategory(categories, parent, child);

  return (
    <Grid
      container
      justify="flex-start"
      className={classes.breadcrumbContainer}
    >
      <Grid
        item
        className={classes.breadcrumb}
        style={{ textDecoration: 'underline', paddingLeft: 0 }}
      >
        <Link to="/">Home</Link>
      </Grid>
      <Grid item className={classes.breadcrumb}>
        {' '}
        /{' '}
      </Grid>
      <Grid
        item
        className={classes.breadcrumb}
        style={selectedParentCategory && { textDecoration: 'underline ' }}
      >
        <Link to="/books">Books</Link>
      </Grid>
      {selectedParentCategory && (
        <React.Fragment>
          <Grid item className={classes.breadcrumb}>
            {' '}
            /{' '}
          </Grid>
          <Grid item className={classes.breadcrumb}>
            <Link to={`/books/${selectedParentCategory.url}`}>
              {selectedParentCategory.name}
            </Link>
          </Grid>
        </React.Fragment>
      )}
      {child && selectedChildCategory && (
        <React.Fragment>
          <Grid item className={classes.breadcrumb}>
            /
          </Grid>
          <Grid item className={classes.breadcrumb}>
            <Link
              to={`/books/${selectedParentCategory.url}/${selectedChildCategory.url}`}
            >
              {selectedChildCategory.name}
            </Link>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}
