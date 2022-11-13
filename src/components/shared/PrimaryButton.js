import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Button } from '@material-ui/core';
// import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    padding: '15px 20px',
    margin: '0px 10px',
    minWidth: '200px',
    backgroundImage: 'linear-gradient(90deg, #00BBEF 0%, #377FC5 100%)',
    border: '1px solid #1497D6',
    boxShadow: '0 2px 4px 0 #808080',
    borderRadius: '4px',
    color: 'white',
    textTransform: 'none',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "'Rubik','sans-serif'",
  },
}));

export default function PrimaryButton({ children, ...props }) {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      className={classes.root}
      {...props}
      endIcon={<ArrowForwardIcon />}
    >
      {children}
    </Button>
  );
}

PrimaryButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};
