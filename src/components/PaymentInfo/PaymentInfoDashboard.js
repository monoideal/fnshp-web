import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";
import { formatCurrency } from 'util/helpers';
import Button from 'components/shared/Button';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '0px 25px 15px 25px',
    overflow: 'auto',
    height: '100%',
    minHeight: '225px',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  money: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  numberBank: {
    fontWeight: 'bold',
  },
  buttonOrange: {
    border: '2px solid #ffc555',
    width: '100%',
  },
  paperButton: {
    marginTop: 'auto',
    paddingTop: '15px',
  },
  paymentTerms: {
    marginTop: 'auto',
    marginBottom: '10px',
    paddingTop: '30px',
  },
  link: {
    textAlign: 'left',
    color: theme.palette.darkOrange.main,
    margin: '10px',
    '&:hover': {
      textDecoration: 'underline',
    },
    fontFamily: theme.fontFamily,
  },
}));

export default function PaymentInfoDashboard({ match, summary }) {
  const classes = useStyles();
  const { fanshipUser } = React.useContext(AppContext);
  const applauseReceivedText = fanshipUser.organization
    ? 'Applause received: '
    : 'Total applause received: ';

  return (
    <div>
      <Grid container wrap="wrap" alignItems="stretch" spacing={2}>
        <Grid item xs={12}>
          <h1>Payment Information</h1>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Grid
              container
              justify="flex-start"
              alignContent="space-between"
              spacing={1}
            >
              <Grid item xs={12}>
                <h3>Payments</h3>
              </Grid>
              <Grid item xs={12}>
                {'Your account balance is: '}
                <span className={classes.money}>
                  {formatCurrency(summary.accountBalance)}
                </span>
              </Grid>

              <Grid item xs={12}>
                {applauseReceivedText}
                <span className={classes.money}>
                  {formatCurrency(summary.tipsReceived)}
                </span>
              </Grid>
            </Grid>

            <div className={classes.paperButton}>
              <Link to={`${match.url}/payment-history`}>
                <Button className={classes.buttonOrange}>
                  VIEW PAYMENT HISTORY
                </Button>
              </Link>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <div className={classes.paymentTerms}>
        <h4>Payment Information</h4>
        For official records of your payment history, always refer to your
        Fanship Account statements.
      </div>
    </div>
  );
}

PaymentInfoDashboard.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  summary: PropTypes.shape({
    accountBalance: PropTypes.number,
    tipsReceived: PropTypes.number,
  }).isRequired,
};
