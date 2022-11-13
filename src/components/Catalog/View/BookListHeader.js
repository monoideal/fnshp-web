import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    background: theme.palette.lightGrey.main,
    padding: '12px 70px 8px 74px',
    borderTop: `solid ${theme.palette.grey.main} 1px`,
    borderBottom: `solid ${theme.palette.grey.main} 1px`,
  },
  gridItem: {
    width: '16.6%',
  },
}));

export default function BookListHeader() {
  const classes = useStyles();
  const columns = [
    'ISBN',
    'TITLE',
    'AUTHOR(S)',
    'PUBLISHER',
    'SUBJECT',
    'STATUS',
  ];
  return (
    <Grid container classes={{ root: classes.root }}>
      {columns.map(column => (
        <Grid
          key={column}
          item
          zeroMinWidth
          xs={2}
          classes={{ root: classes.gridItem }}
        >
          <Box fontWeight="fontWeightBold" fontSize={12}>
            {column}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
