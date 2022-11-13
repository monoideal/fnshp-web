import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#c04800',
    color: 'white',
  },
}));
const BrowserWarning = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      For the best experience on Fanship, we recommend using the latest versions
      of Chrome or Safari browsers.
    </div>
  );
};

export default BrowserWarning;
