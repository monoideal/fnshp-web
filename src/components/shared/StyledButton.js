import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    // Styles button according to style guide
    borderColor: '#ffe3ac',
    padding: '10px 20px',
    margin: '0px 10px',
    minWidth: '100px',
    fontWeight: 'bold',
  },
  greyButton: {
    // A variant of the button
    margin: '10px',
    backgroundColor: '#e5e3e9',
    borderColor: '#b0acbd',
  },
}));

export default function StyledButton({ children, isGreyButton, ...props }) {
  const classes = useStyles();
  const mixedStyle = clsx(
    classes.root,
    isGreyButton ? classes.greyButton : undefined,
  );

  return (
    <Button variant="outlined" className={mixedStyle} {...props}>
      {children}
    </Button>
  );
}

StyledButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
  isGreyButton: PropTypes.bool,
};

StyledButton.defaultProps = {
  isGreyButton: false,
};
