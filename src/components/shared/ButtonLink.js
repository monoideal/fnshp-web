import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  buttonLink: {
    // This makes a button look and act like a link
    textAlign: 'left',
    color: theme.palette.darkOrange.main,
    margin: '10px',

    '&:hover': {
      textDecoration: 'underline',
    },
    fontFamily: theme.fontFamily,
  },
}));

export default function ButtonLink({ children, ...props }) {
  const classes = useStyles();

  return (
    <Link
      component="button"
      variant="body2"
      type="button"
      className={classes.buttonLink}
      {...props}
    >
      {children}
    </Link>
  );
}

ButtonLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};
