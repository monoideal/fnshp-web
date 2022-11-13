import React from 'react';
import DefaultButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles(theme => ({
  root: {
    borderRadius: '4px',
    boxShadow: 'none',
    fontWeight: 'bold',
  },
}))(DefaultButton);

export default function Button(props) {
  return <StyledButton {...props} />;
}
