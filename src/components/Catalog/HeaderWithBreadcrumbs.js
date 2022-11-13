import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import BreadcrumbLink from 'components/Catalog/BreadcrumbLink';

const useStyles = makeStyles({
  breadcrumb: {
    textDecoration: 'underline',
    marginRight: '10px',
  },
  title: {
    paddingLeft: '15px',
  },
});

export default function HeaderWithBreadcrumb({ breadcrumbLinks, title }) {
  const classes = useStyles();
  return (
    <>
      <Box fontSize={16}>
        <Grid container alignItems="center">
          <Grid item>
            <KeyboardArrowLeftIcon />
          </Grid>
          {breadcrumbLinks.map(({ to, text }) => (
            <span key={to} className={classes.breadcrumb}>
              <BreadcrumbLink key={to} to={to} text={text} />
            </span>
          ))}
        </Grid>
      </Box>
      <Grid container classes={{ root: classes.title }}>
        <Box fontSize="27px" fontWeight="bold">
          {title}
        </Box>
      </Grid>
    </>
  );
}

HeaderWithBreadcrumb.propTypes = {
  breadcrumbLinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
};
