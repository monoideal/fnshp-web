import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PlaidLink from 'react-plaid-link';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import config from 'config';

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(3),
    '& a': {
      textDecoration: 'underline',
    },
    '& > p': {
      maxWidth: 700,
      margin: '50px 0',
      fontSize: 18,
      color: '#4E4E4E',
      lineHeight: 1.5,
      textAlign: 'center',
    },
    '& h1': {
      fontSize: 36,
      textAlign: 'center',
      margin: '50px 0',
    },
  },
  introImage: {
    maxWidth: 329,
    margin: '0 auto',
    '& > img': {
      display: 'block',
      width: '100%',
      height: 'auto',
    },
  },
  contentBox: {
    padding: theme.spacing(4),
  },
  plaidButton: {
    backgroundImage:
      'linear-gradient(90deg, #00998F 0%, #11CCB3 100%) !important',
    border: '1px solid #116459 !important',
    boxShadow: '0 0 9px 0 #25A595 !important',
    borderRadius: '4px !important',
    padding: '7px 30px !important',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '21px',
    textDecoration: 'none !important',
    color: 'white',
    '& > span': {
      verticalAlign: 'middle',
      textShadow: '0 2px 3px rgba(0,0,0,0.50)',
    },
    '& > img': {
      paddingLeft: 20,
      verticalAlign: 'middle',
    },
  },
  plaidBox: {
    maxWidth: 850,
    padding: 30,
    backgroundColor: '#F6F6F6',
    fontSize: 16,
    lineHeight: 1.5,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      '& > img': {
        paddingRight: 30,
      },
    },
  },
}));

const PlaidButton = ({ handleSuccess }) => {
  const classes = useStyles();

  return (
    <PlaidLink
      clientName="Fanship"
      env={config.NODE_ENV !== 'prod' ? 'sandbox' : 'production'}
      publicKey={config.PLAID_PUBLIC_KEY}
      product={['identity']}
      countryCodes={['US,CA']}
      onSuccess={handleSuccess}
      className={classes.plaidButton}
    >
      <span>Verify your identity</span>
      <img
        alt="Verify identity"
        src="/img/lock-green.png"
        width={46}
        height={45}
      />
    </PlaidLink>
  );
};

PlaidButton.propTypes = {
  handleSuccess: PropTypes.func.isRequired,
};

const PlaidVerification = ({ handleSuccess }) => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={3}
      className={classes.main}
    >
      <div className={classes.introImage}>
        <img
          src="/img/deco/fs_plaid_lady.png"
          width={329}
          height={270}
          alt="Plaid security"
        />
      </div>

      <h1>Identity Verification</h1>

      <PlaidButton handleSuccess={handleSuccess} />

      <p>
        We will use the following data: <strong>name</strong>,{' '}
        <strong>phone number</strong>, <strong>address</strong>,{' '}
        <strong>email</strong> to verify your identity by using your bank of
        choice. The process is safe and secure, and the data is used solely to
        verify your identity and will not be shared with anyone.
      </p>

      <div className={classes.plaidBox}>
        <img
          src="/img/plaid-logo.png"
          width={215}
          height={81}
          alt="Plaid logo"
        />
        <div>
          <p>
            We work with Plaid, a Visa company and leader in fraud reduction, to
            verify your identity as part of Fanship’s dedication to providing
            authoritative and trusted information about rightsholders and
            creative works.
          </p>
          <p>Plaid is a trusted partner to most major banking entities.</p>
          <img
            src="/img/bank-logos.png"
            width={278}
            height={55}
            alt="Bank logos"
          />
          <p>
            <a
              href="https://plaid.com/what-is-plaid/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>{' '}
            about Plaid
          </p>
        </div>
      </div>
    </Grid>
  );
};

PlaidVerification.propTypes = {
  handleSuccess: PropTypes.func.isRequired,
};

export default PlaidVerification;
