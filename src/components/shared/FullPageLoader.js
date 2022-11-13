import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      boxShadow: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 2000,
    },
    container: {
      width: '100%',
    },
    label: {
      color: `#ffc555`,
      fontWeight: `bold`,
    },
  }),
);

export default function FullPageLoader({ withPercentage, percentage }) {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <CircularProgress size={80} className={classes.loader} />
      {withPercentage && (
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            className={classes.label}
          >{`${Math.round(percentage)}%`}</Typography>
        </Box>
      )}
    </Grid>
  );
}

FullPageLoader.propTypes = {
  withPercentage: PropTypes.bool,
  percentage: PropTypes.number,
};

FullPageLoader.defaultProps = {
  withPercentage: false,
  percentage: 0,
};
