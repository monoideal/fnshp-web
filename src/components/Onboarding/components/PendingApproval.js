import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
}));

const PendingApproval = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      className={classes.main}
    >
      <img
        src="/img/deco/fs_onboarding_email_verify.png"
        width={243}
        height={175}
        alt=""
      />

      <h2>Verification pending with admin</h2>

      <Grid item component="p" md={6} className={classes.textContent}>
        You account is pending admin approval and will be updated in 2-5 business days. You will be notified via email once your account is approved. 
      </Grid>

      <Grid item md={12} style={{ paddingBottom: '60px' }} />
    </Grid>
  );
};

PendingApproval.propTypes = {};

export default PendingApproval;
