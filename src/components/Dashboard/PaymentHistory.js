import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from 'components/shared/Button';
import { formatCurrency } from 'util/helpers';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(3, 2),
    textAlign: 'center',
  },
  viewPaymentHistory: {
    color: theme.palette.black.main,
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
    },
  },
}));

export default function PaymentHistory({ data }) {
  const classes = useStyles();
  const { fanshipUser } = React.useContext(AppContext);
  const applauseReceivedText = fanshipUser.organization
    ? 'Total applause paid to your authors: '
    : 'Total applause received: ';
  const { accountBalance, tipsReceived } = data;

  return (
    <div>
      <Paper className={clsx(classes.paper, classes.container)}>
        {/* Header */}
        <Box fontWeight="bold" fontSize={16} textAlign="left">
          Payment History
        </Box>

        {/* Details */}
        <Grid container>
          <Grid item sm={3} xs={12}>
            <img
              style={{ width: '100%' }}
              alt="payment-history"
              src="/img/payment_history.png"
            />
          </Grid>
          <Grid
            item
            sm={9}
            xs={12}
            container
            direction="column"
            justify="space-evenly"
          >
            <Box fontSize={16}>
              {'Your account balance is: '}
              <Box component="span" fontWeight="bold">
                {formatCurrency(accountBalance)}
              </Box>
            </Box>
            <Box fontSize={16}>
              {applauseReceivedText}
              <Box component="span" fontWeight="bold">
                {formatCurrency(tipsReceived)}
              </Box>
            </Box>
            <Grid item>
              <a href="/payment-info">
                <Button
                  className={classes.viewPaymentHistory}
                  color="primary"
                  variant="outlined"
                >
                  VIEW PAYMENT HISTORY
                </Button>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

PaymentHistory.propTypes = {
  data: PropTypes.shape({
    accountBalance: PropTypes.number,
    tipsReceived: PropTypes.number,
  }).isRequired,
};
