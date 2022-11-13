import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

const InlineLoader = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: '100vh', position: 'fixed', top: 0 }}
    >
      <Grid item>
        <CircularProgress
          size={75}
          style={{ color: 'rgba(255, 197, 85, 0.3)' }}
        />
      </Grid>
    </Grid>
  );
};

export default InlineLoader;
