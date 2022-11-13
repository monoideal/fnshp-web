import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Paper,
  Grid,
  MenuItem,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Switch, Route } from 'react-router-dom';

import qs from 'qs';

import history from 'lib/history';
import FancyTable from 'components/shared/FancyTable';
import { ProfileTextField } from 'components/shared/StyledTextField';
import StyledInputForm, { RowBreak } from 'components/shared/StyledInputForm';
import StyledButton from 'components/shared/Button';

import { useApi } from 'api/';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  container: {
    paddingTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  labelItem: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
  },
  indicator: {
    background: theme.palette.black.main,
  },
  tab: {
    background: theme.palette.grey.main,
    fontWeight: 'bold',
  },
  hidden: {
    visibility: 'hidden',
  },
  error: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'red',
    minWidth: '200px',
  },
  result: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'green',
    minWidth: '200px',
  },
}));

const Balances = ({ balances }) => {
  return (
    <FancyTable
      title="Balances"
      columns={[
        { field: 'userId', title: 'User ID', type: 'numeric' },
        { field: 'name', title: 'Name' },
        { field: 'amount', title: 'Amount Owing', type: 'currency' },
        { field: 'lastPaymentDate', title: 'Last Payment Date', type: 'date' },
        {
          field: 'lastPaymentAmount',
          title: 'Last Payment Amount',
          type: 'currency',
        },
      ]}
      data={balances}
      options={{ exportButton: true }}
      actions={[
        {
          icon: 'assignment',
          tooltip: 'Record A Payment',
          onClick: (evt, rowData) => {
            const query = qs.stringify({
              name: rowData.name,
              creatorId: rowData.userId,
            });
            history.push(`/admin/payments/create?${query}`);
          },
        },
      ]}
    />
  );
};

Balances.propTypes = {
  balances: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const PaymentHistory = ({ paymentHistory }) => {
  return (
    <FancyTable
      title="Payment History"
      columns={[
        { field: 'paymentId', title: 'Payment ID', type: 'numeric' },
        { field: 'recipientName', title: 'Recipient' },
        { field: 'amount', title: 'Amount Paid', type: 'currency' },
        { field: 'date', title: 'Date', type: 'date' },
        { field: 'paymentMethod', title: 'Payment Method' },
      ]}
      detailPanel={row => (
        <div style={{ padding: '5px 20px' }}>
          <span style={{ fontWeight: 'bold' }}>Note:</span> {row.note}
        </div>
      )}
      data={paymentHistory}
      options={{ exportButton: true }}
    />
  );
};

PaymentHistory.propTypes = {
  paymentHistory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const PaymentManagement = () => {
  const classes = useStyles();
  const api = useApi();

  const [currentTab, setCurrentTab] = useState(0);
  const [balances, setBalances] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      try {
        setBalances(await api.fetchBalancesAdmin());
        setPaymentHistory(await api.fetchPaymentHistoryAdmin());
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
    };
    initialize();
  }, []);

  const tabComponents = [
    <Balances balances={balances} />,
    <PaymentHistory paymentHistory={paymentHistory} />,
  ];

  return (
    <Container className={classes.container}>
      <div className={classes.title}>Payment Management</div>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={currentTab}
          onChange={(evt, newTab) => setCurrentTab(newTab)}
          classes={{ indicator: classes.indicator }}
        >
          <Tab label="Balances" className={classes.tab} />
          <Tab label="Payment History" className={classes.tab} />
        </Tabs>
      </AppBar>

      {tabComponents[currentTab]}
    </Container>
  );
};

PaymentManagement.propTypes = {};

const CreatePaymentRecord = ({ location }) => {
  const classes = useStyles();
  const api = useApi();

  const [name, setName] = useState(null);
  const [creatorId, setId] = useState(null);

  const [datePaid, setDatePaid] = useState(moment().format('YYYY-MM-DD'));
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cheque');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ resp: '', isError: false });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setName(query.get('name'));
    setId(query.get('creatorId'));
  }, [location.search]);

  if (_.isNil(name) || _.isNil(creatorId)) {
    return <div>Error: Payment Recipient data is missing</div>;
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <div className={classes.title}>Record a Payment</div>

      <Paper className={classes.paper}>
        <div className={classes.title} style={{ fontSize: '18px' }}>
          To: {name} (ID {creatorId})
        </div>

        <StyledInputForm
          formId="recordPayment"
          handleSubmit={async () => {
            try {
              setLoading(true);
              const result = await api.createPaymentRecord({
                creatorId,
                datePaid: moment(datePaid).unix(),
                amount,
                paymentMethod,
                note,
              });
              setResponse({ resp: result, isError: false });
            } catch (err) {
              console.log(err);
              console.log(err.response);
              setResponse({ resp: err, isError: true });
            } finally {
              setLoading(false);
            }
          }}
        >
          <ProfileTextField
            label="Amount"
            isRequired
            type="number"
            value={amount}
            onChange={evt => setAmount(evt.target.value)}
          />
          <ProfileTextField
            label="Date Paid"
            value={datePaid}
            onChange={evt => setDatePaid(evt.target.value)}
            type="date"
            isRequired
            shrink
          />
          <ProfileTextField
            label="Payment Method"
            isRequired
            value={paymentMethod}
            onChange={evt => setPaymentMethod(evt.target.value)}
            select
          >
            <MenuItem value="cheque">Cheque</MenuItem>
            <MenuItem value="paypal">Paypal</MenuItem>
            <MenuItem value="e-transfer">E-Transfer</MenuItem>
          </ProfileTextField>

          <RowBreak />
          <ProfileTextField
            label="Additional Notes"
            value={note}
            onChange={evt => setNote(evt.target.value)}
            multiline
            md={12}
            rows={4}
          />
        </StyledInputForm>

        <Grid container justify="flex-end" spacing={3}>
          <Grid item>
            <StyledButton
              variant="outlined"
              onClick={() => history.push('/admin/payments')}
            >
              Cancel
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton
              variant="contained"
              color="primary"
              type="submit"
              form="recordPayment"
            >
              Record
            </StyledButton>
          </Grid>
          <Grid item>
            <CircularProgress
              className={clsx({ [classes.hidden]: !loading })}
            />
          </Grid>
        </Grid>
        <div
          style={{ minWidth: 'fit-content', minHeight: '25px' }}
          className={clsx({
            [classes.result]: !response.isError,
            [classes.error]: response.isError,
            [classes.hidden]: !response.resp,
          })}
        >
          {response.isError
            ? `Error ${response.resp.response.status}: ${response.resp.response.statusText}`
            : 'Payment Record created successfully!'}
        </div>
      </Paper>
    </Container>
  );
};

CreatePaymentRecord.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
};

const PaymentManagementContainer = ({ match }) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}/`}
        render={props => <PaymentManagement {...props} />}
      />
      <Route
        exact
        path={`${match.url}/create`}
        render={props => <CreatePaymentRecord {...props} />}
      />
    </Switch>
  );
};

PaymentManagementContainer.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
};

export default PaymentManagementContainer;
