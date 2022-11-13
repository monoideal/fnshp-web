import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import { useApi } from 'api/';
import PaymentInfoDashboard from 'components/PaymentInfo/PaymentInfoDashboard';
import PaymentHistory from 'components/PaymentInfo/PaymentHistory';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexFlow: 'column nowrap',
  },
}));

export default function PaymentInfo({ match }) {
  const classes = useStyles();
  const api = useApi();

  const [summary, setSummary] = useState({});
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.fetchPaymentInfo();
        setSummary(res.summary);
        setWithdrawals(await api.fetchWithdrawals());
      } catch (err) {
        console.log('ERR!', err);
      }
    })();
  }, []);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Switch>
        <Route
          exact
          path={`${match.url}/`}
          render={props => (
            <PaymentInfoDashboard summary={summary} {...props} />
          )}
        />

        <Route
          exact
          path={`${match.url}/payment-history`}
          render={props => (
            <PaymentHistory
              summary={summary}
              withdrawals={withdrawals}
              {...props}
            />
          )}
        />
      </Switch>
    </Container>
  );
}

PaymentInfo.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
