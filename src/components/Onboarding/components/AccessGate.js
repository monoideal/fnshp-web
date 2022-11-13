import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { digestMessage } from 'util/helpers';
import { Container, Grid } from '@material-ui/core';
import config from 'config';
import Button from 'components/shared/Button';
import { ProfileTextField } from 'components/shared/StyledTextField';
import { RowBreak } from 'components/shared/StyledInputForm';

const useStyles = makeStyles(theme => ({
  bg: {
    background:
      'url(/img/deco/fs_onboarding_bubbles.svg) no-repeat center center fixed',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    padding: theme.spacing(2),
  },
  containerForm: {
    padding: theme.spacing(0, 5, 0, 5),
  },
  hidden: {
    display: 'none',
  },
  errorText: {
    color: theme.palette.red.main,
    fontWeight: 'bold',
  },
  buttonContinue: {
    width: '100%',
  },
  textLink: {
    textDecoration: 'underline',
    color: '#c04800',
  },
}));

export default function AccessGate({ handleAccessGate, profile }) {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [isFailure, setIsFailure] = useState(false);
  const isAdmin = profile.role === 'admin';
  return (
    <div className={classes.bg}>
      <Container maxWidth="md" className={classes.container}>
        <h2 style={{ textAlign: 'center' }}>Enter your Access Code</h2>

        <Container maxWidth="md" className={classes.containerForm}>
          <Grid container justify="center" spacing={3}>
            <ProfileTextField
              label="Access Code"
              value={password}
              onChange={evt => {
                setPassword(evt.target.value);
                setIsFailure(false);
              }}
            />
            <RowBreak />
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonContinue}
                disabled={!password}
                onClick={async () => {
                  const hash = await digestMessage(password);

                  if (
                    (isAdmin && hash !== config.ADMIN_ACCESS_CODE_HASH) ||
                    (!isAdmin && hash !== config.CREATOR_ACCESS_CODE_HASH)
                  ) {
                    setIsFailure(true);
                    return;
                  }

                  await handleAccessGate(true);
                }}
              >
                Continue
              </Button>
              {isFailure && (
                <div className={classes.errorText}>Sorry, try again.</div>
              )}
            </Grid>
            <Grid item style={{ fontStyle: 'italic' }}>
              To get started on Fanship Beta, please email{' '}
              <a href="mailto:info@fanship.fan">
                <span className={classes.textLink}>info@fanship.fan</span>
              </a>{' '}
              to obtain an access code.
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}

AccessGate.propTypes = {
  handleAccessGate: PropTypes.func.isRequired,
  profile: PropTypes.shape({ role: PropTypes.string.isRequired }).isRequired,
};
