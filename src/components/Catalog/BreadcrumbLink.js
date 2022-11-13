import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

export default function BreadcrumbLink({ to, text }) {
  return (
    <Link to={to}>
      <Grid item>{text}</Grid>
    </Link>
  );
}

BreadcrumbLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
