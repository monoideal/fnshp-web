import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ReactGA from 'react-ga';

import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from 'api/';
import ButtonLink from 'components/shared/ButtonLink';
import PrimaryButton from 'components/shared/PrimaryButton';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(3),
    textAlign: 'center',
    '& img': {
      display: 'block',
      margin: 'auto',
    },
  },
  contentBox: {
    padding: theme.spacing(4),
  },
  title: {
    fontSize: 36,
    margin: '70px auto 50px',
  },
  text: {
    fontSize: 18,
    lineHeight: 1.8,
  },
}));

const VerifyEmail = () => {
  const classes = useStyles();
  const { user } = useAuth0();
  const { initUsers } = React.useContext(AppContext);
  const api = useApi();

  const recheckEmail = useCallback(() => {
    ReactGA.event({
      category: 'User',
      action: 'Onboarding - Checking if email is valid',
    });
    initUsers();
  }, []);

  const resendEmailVerification = async () => {
    ReactGA.event({
      category: 'User',
      action: 'Onboarding - Resending a email validation email',
    });
    await api.resendVerificationEmail();
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      spacing={2}
      className={classes.main}
    >
      <Grid item md={12}>
        <img
          src="/img/deco/fs_onboarding_email_verify.png"
          width={333}
          height={240}
          alt="Verify Email"
        />
      </Grid>

      <h2 className={classes.title}>Verify Your Email</h2>

      <Grid item component="p" md={12} className={classes.text}>
        An email was sent to{' '}
        <strong>
          {!user.email ? window.location.reload() : user.email}.
        </strong>{' '}
        <br />
        Please check your inbox and click on the &quot;
        <strong>Verify My Email</strong>
        &quot; button to continue.
      </Grid>

      <Grid item md={12} style={{ paddingBottom: '30px' }} />

      <Grid container item justify="center">
        <PrimaryButton
          variant="contained"
          color="primary"
          onClick={recheckEmail}
        >
          I verified my email
        </PrimaryButton>
      </Grid>

      <Grid item component="p" md={12} style={{ fontSize: '14px' }}>
        Didn&apos;t get the email?
        <ButtonLink onClick={resendEmailVerification}>
          Click here to re-send it.
        </ButtonLink>
      </Grid>
    </Grid>
  );
};

export default VerifyEmail;
