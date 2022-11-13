import * as React from 'react';
import PropTypes from 'prop-types';
import webShare from 'react-web-share-api';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  shareButton: {
    textTransform: 'none',
    fontWeight: 'bold',
  },
}));

const ShareButton = ({ share, isSupported, children }) => {
  const classes = useStyles();
  return isSupported ? (
    <Button
      variant="contained"
      color="primary"
      onClick={share}
      className={classes.shareButton}
    >
      {children}
    </Button>
  ) : (
    <span>Web Share not supported</span>
  );
};

export default webShare()(ShareButton);

ShareButton.propTypes = {
  share: PropTypes.string.isRequired,
  isSupported: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};
