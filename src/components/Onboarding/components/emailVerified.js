import React, { useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from 'components/shared/PrimaryButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    height: '100%',
  },
  main: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  contentBox: {
    padding: theme.spacing(4),
  },
  textContent: {
    fontSize: '16px',
  },
  check: {
    marginTop: '10%',
  },
}));

const EmailVerified = () => {
  const classes = useStyles();

  const sendToDashboard = useCallback(() => {
    window.location.assign('/dashboard');
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      className={classes.main}
    >
      <img src="/img/logo.png" width={120} height={43} alt="Fanship Logo" />

      <Grid item xs={12} className={classes.check}>
        <img src="/img/check.png" width={120} height={120} alt="Fanship Logo" />
      </Grid>

      <h2>Email Verified!</h2>

      <Grid item component="p" md={6} className={classes.textContent}>
        Your account has been approved.
      </Grid>

      <Grid item xs={12} className={classes.check}>
        <PrimaryButton
          variant="contained"
          color="primary"
          style={{ width: '320px' }}
          onClick={sendToDashboard}
        >
          Continue to Dashboard
        </PrimaryButton>
      </Grid>
      <Grid item md={12} style={{ paddingBottom: '60px' }} />
    </Grid>
  );
};

export default EmailVerified;
