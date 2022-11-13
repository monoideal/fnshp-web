import React from 'react';
import { Table } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '10px 0px',
    alignSelf: 'center',
    fontFamily: theme.fontFamily,

    '& td': {
      border: 0,
      padding: '10px 15px',
      textAlign: 'center',
      fontFamily: 'inherit',
    },

    '& th': {
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#000',
      borderTop: '1px solid rgba(131, 126, 152, 0.2)',
      borderBottom: '1px solid rgba(131, 126, 152, 0.2)',
      backgroundColor: '#f9f9f9',
      padding: '5px 20px',
      fontFamily: 'inherit',
    },
  },
}));

export default function StyledTable({ children, ...props }) {
  const classes = useStyles();

  return (
    <Table classes={classes} {...props}>
      {children}
    </Table>
  );
}
