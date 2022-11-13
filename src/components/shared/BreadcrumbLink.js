import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function BreadcrumbLink({ to, text }) {
  return (
    <Link to={to}>
      <Grid item>
        <ArrowBackIosIcon style={{ fontSize: 15, marginBottom: '-2px' }} />{' '}
        {text}
      </Grid>
    </Link>
  );
}

BreadcrumbLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
