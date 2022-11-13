import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

import history from 'lib/history';
import Button from 'components/shared/Button';
import StyledTextField from 'components/shared/StyledTextField';
import HomeLink from 'components/PaymentInfo/HomeLink';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '15px 25px 15px 25px',
    overflow: 'auto',
  },
  buttonSolid: {
    padding: '10px',
    width: '100%',
  },
  buttonOutline: {
    border: '2px solid #ffc555',
    textTransform: 'none',
    padding: '10px',
    width: '100%',
  },
}));

export default function BankInfo({ initialBankInfo, onSubmit }) {
  const classes = useStyles();

  const [transitNumber, setTransitNumber] = useState(
    initialBankInfo.transitNumber || '',
  );
  const [institutionNumber, setInstitutionNumber] = useState(
    initialBankInfo.institutionNumber || '',
  );
  const [accountNumber, setAccountNumber] = useState(
    initialBankInfo.accountNumber || '',
  );

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      transitNumber,
      institutionNumber,
      accountNumber,
    });
    history.push('/payment-info');
  }

  return (
    <>
      <HomeLink />

      <h1>Direct Deposit</h1>

      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            justify="flex-start"
            alignContent="space-between"
            className={classes.containerPaper}
            spacing={2}
          >
            <Grid item xs={12}>
              Please provide your bank information to receive payments from
              Fanship.
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                value={transitNumber}
                onChange={e => setTransitNumber(e.target.value)}
                fullWidth
                label="Transit Number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                value={institutionNumber}
                onChange={e => setInstitutionNumber(e.target.value)}
                fullWidth
                label="Instiution Number"
              />
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12} md={6}>
              <StyledTextField
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                fullWidth
                label="Account Number"
              />
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                className={classes.buttonSolid}
                variant="contained"
                color="primary"
              >
                SAVE
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                onClick={() => history.push('/payment-info')}
                className={classes.buttonOutline}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
          <input type="submit" hidden />
        </form>
      </Paper>
    </>
  );
}

BankInfo.propTypes = {
  initialBankInfo: PropTypes.shape({
    transitNumber: PropTypes.string,
    institutionNumber: PropTypes.string,
    accountNumber: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
