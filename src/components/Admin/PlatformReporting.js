import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, MenuItem, Grid, Box } from '@material-ui/core';

import { formatCurrency, calculateReportsAmount } from 'util/helpers';
import FancyTable from 'components/shared/FancyTable';
import { ProfileTextField } from 'components/shared/StyledTextField';
import { RowBreak } from 'components/shared/StyledInputForm';
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
  box: {
    marginBottom: theme.spacing(3),
  },
}));

const ReportItem = ({ label, children }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={3}>
        <span className={classes.labelItem}>{_.startCase(label)}: </span>
      </Grid>
      <Grid item xs={3}>
        {children}
      </Grid>
      <RowBreak />
    </>
  );
};

ReportItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};

const PlatformSales = ({
  grossRevenue,
  taxesCollected,
  revenueNetOfTaxes,
  shopifyFees,
  tips,
  totalUnitSales,
  totalPointsRedeemed,
  totalPointsEarned,
  saleDetails,
  totalProviderFees,
}) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container>
          <ReportItem label="Gross">
            {formatCurrency(grossRevenue + taxesCollected)}
          </ReportItem>
          <ReportItem label="Taxes Collected">
            {formatCurrency(taxesCollected)}
          </ReportItem>
          <ReportItem label="Prescient Revenue Net of Taxes">
            {formatCurrency(grossRevenue - totalProviderFees)}
          </ReportItem>
          <ReportItem label="Prescient Net">
            {formatCurrency((grossRevenue - totalProviderFees) * 0.4)}
          </ReportItem>
          <ReportItem label="Applauds Collected">
            {formatCurrency(tips)}
          </ReportItem>
          <ReportItem label="Total Unit Sales">{totalUnitSales}</ReportItem>
          <ReportItem label="Total Value of Points Redeemed">
            {formatCurrency(totalPointsRedeemed / 1000)}
          </ReportItem>
          <ReportItem label="Total Points Earned">
            {totalPointsEarned}
          </ReportItem>
          <ReportItem label="Total Shopify Fees">
            {formatCurrency(totalProviderFees)}
          </ReportItem>
        </Grid>
      </Paper>

      <FancyTable
        title="Sale Details"
        columns={[
          { field: 'timestamp', title: 'Timestamp', type: 'numeric' },
          { field: 'type', title: 'Type' },
          {
            field: 'transactionId',
            title: 'Transaction ID',
            type: 'numeric',
          },
          { field: 'items', title: 'Items', type: 'numeric' },
          { field: 'gross', title: 'Gross', type: 'currency' },
          { field: 'taxes', title: 'Taxes', type: 'currency' },
          {
            field: 'paymentProviderFees',
            title: 'Payment Provider Fees',
            type: 'currency',
          },
          { field: 'fees', title: 'Prescient Net', type: 'currency' },
          { field: 'net', title: 'Net', type: 'currency' },
        ]}
        data={saleDetails}
        options={{ exportButton: true, exportAllData: true }}
      />
    </>
  );
};

PlatformSales.propTypes = {
  grossRevenue: PropTypes.number,
  taxesCollected: PropTypes.number,
  revenueNetOfTaxes: PropTypes.number,
  shopifyFees: PropTypes.number,
  tips: PropTypes.number,
  totalUnitSales: PropTypes.number,
  totalPointsRedeemed: PropTypes.number,
  totalPointsEarned: PropTypes.number,
  totalProviderFees: PropTypes.number,
  saleDetails: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.number,
      type: PropTypes.string,
      transactionId: PropTypes.number,
      items: PropTypes.number,
      gross: PropTypes.number,
      taxes: PropTypes.number,
      fees: PropTypes.number,
      net: PropTypes.number,
      paymentProviderFees: PropTypes.number,
    }),
  ),
};

PlatformSales.defaultProps = {
  grossRevenue: 0,
  taxesCollected: 0,
  revenueNetOfTaxes: 0,
  shopifyFees: 0,
  tips: 0,
  totalUnitSales: 0,
  totalPointsRedeemed: 0,
  totalPointsEarned: 0,
  saleDetails: [],
  totalProviderFees: 0,
};

const CashManagement = report => {
  const classes = useStyles();

  return (
    <>
      {!report && (
        <Paper className={classes.paper} style={{ fontStyle: 'italic' }}>
          No Shopify payouts were made in the requested period.
        </Paper>
      )}
      <Box className={classes.box}>
        <FancyTable
          title="Payments Received"
          columns={[
            { field: 'date', title: 'Date', type: 'date' },
            { field: 'startDate', title: 'Start Date', type: 'date' },
            { field: 'endDate', title: 'End Date', type: 'date' },
            {
              field: 'noOfTransactions',
              title: '# Transaction',
            },
            {
              field: 'summary.charges_gross_amount',
              title: 'Gross Include tips',
              type: 'currency',
            },
            {
              field: 'summary.refunds_gross_amount',
              title: 'Returned $',
              type: 'currency',
            },
            {
              field: 'noOfRefundTransactions',
              title: 'Return Transacts',
            },
            { field: 'amount', title: 'Cash Received', type: 'currency' },
          ]}
          data={report.payouts}
          options={{ exportButton: true }}
        />
      </Box>
      {report.transactions &&
        report.transactions.map((item, index) => (
          <Box className={classes.box} key={index}>
            <FancyTable
              title={`${
                item.payoutDate
                  ? moment(item.payoutDate).format('MMMM Do YYYY')
                  : ''
              }  Payment Transactions`}
              columns={[
                { field: 'processed_at', title: 'Timestamp', type: 'datetime' },
                {
                  field: 'source_order_transaction_id',
                  title: 'Transaction #',
                },
                { field: 'source_type', title: 'Type' },
                { field: 'items', title: 'Items' },
                { field: 'amount', title: 'Gross Incl tips', type: 'currency' },
                { field: 'tax', title: 'Taxes', type: 'currency' },
                { field: 'fee', title: 'Fees', type: 'currency' },
                { field: 'net', title: 'Net', type: 'currency' },
              ]}
              data={item.data}
              options={{ exportButton: true }}
            />
          </Box>
        ))}
    </>
  );
};

CashManagement.propTypes = {
  report: PropTypes.shape({
    transactions: PropTypes.arrayOf(PropTypes.shape({})),
    payouts: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

CashManagement.defaultProps = {
  report: {},
};

const OutstandingTransactions = ({ transactions }) => {
  const classes = useStyles();
  return (
    <>
      {!transactions ? (
        <Paper className={classes.paper} style={{ fontStyle: 'italic' }}>
          No Shopify payouts were made in the requested period.
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Grid container>
            <ReportItem label="Total Amount">
              {formatCurrency(calculateReportsAmount(transactions))}
            </ReportItem>
          </Grid>
        </Paper>
      )}
      <FancyTable
        title="Outstanding Transactions"
        columns={[
          { field: 'processed_at', title: 'Date', type: 'date' },
          { field: 'source_id', title: 'TransactionID', type: 'date' },
          { field: 'source_type', title: 'Type' },
          { field: 'items', title: 'Items' },
          { field: 'amount', title: 'Gross Include tips', type: 'currency' },
          { field: 'fee', title: 'Fees', type: 'currency' },
          { field: 'taxes', title: 'Taxes', type: 'currency' },
          { field: 'net', title: 'Net', type: 'currency' },
        ]}
        data={transactions}
        options={{ exportButton: true }}
      />
    </>
  );
};

OutstandingTransactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const LoyaltyPoints = ({
  openingBalanceTotal,
  newPointsTotal,
  pointsSpentTotal,
  pointsExpiredTotal,
  pointsForfeitedTotal,
  endingBalanceTotal,
  openingBalanceTotal_value,
  newPointsTotal_value,
  pointsSpentTotal_value,
  pointsExpiredTotal_value,
  pointsForfeitedTotal_value,
  endingBalanceTotal_value,
  userBalances,
}) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container>
          <ReportItem label="Opening Balance">{openingBalanceTotal}</ReportItem>
          <ReportItem label="Opening Balance (value)">
            {formatCurrency(openingBalanceTotal_value)}
          </ReportItem>
          <ReportItem label="New Points Added">{newPointsTotal}</ReportItem>
          <ReportItem label="New Points Added (value)">
            {formatCurrency(newPointsTotal_value)}
          </ReportItem>
          <ReportItem label="Points Expended">{pointsSpentTotal}</ReportItem>
          <ReportItem label="New Points Added (value)">
            {formatCurrency(pointsSpentTotal_value)}
          </ReportItem>
          <ReportItem label="Points Expired">{pointsExpiredTotal}</ReportItem>
          <ReportItem label="Points Expired (value)">
            {formatCurrency(pointsExpiredTotal_value)}
          </ReportItem>
          <ReportItem label="Points Forfeited">
            {pointsForfeitedTotal}
          </ReportItem>
          <ReportItem label="Points Forfeited (value)">
            {formatCurrency(pointsForfeitedTotal_value)}
          </ReportItem>
          <ReportItem label="Ending Balance">{endingBalanceTotal}</ReportItem>
          <ReportItem label="Ending Balance (value)">
            {formatCurrency(endingBalanceTotal_value)}
          </ReportItem>
        </Grid>
      </Paper>

      <FancyTable
        title="User Points Balances"
        columns={[
          { field: 'userId', title: 'User ID', type: 'numeric' },
          { field: 'openingBalance', title: 'Opening Points', type: 'numeric' },
          { field: 'newPoints', title: 'Points Earned', type: 'numeric' },
          { field: 'pointsSpent', title: 'Points Expended', type: 'numeric' },
          { field: 'pointsExpired', title: 'Points Expired', type: 'numeric' },
          {
            field: 'pointsForfeited',
            title: 'Points Forfeited',
            type: 'numeric',
          },
          { field: 'endingBalance', title: 'Points Balance', type: 'numeric' },
        ]}
        data={userBalances}
        options={{ exportButton: true, exportAllData: true }}
      />
    </>
  );
};

LoyaltyPoints.propTypes = {
  openingBalanceTotal: PropTypes.number,
  newPointsTotal: PropTypes.number,
  pointsSpentTotal: PropTypes.number,
  pointsExpiredTotal: PropTypes.number,
  pointsForfeitedTotal: PropTypes.number,
  endingBalanceTotal: PropTypes.number,
  openingBalanceTotal_value: PropTypes.number,
  newPointsTotal_value: PropTypes.number,
  pointsSpentTotal_value: PropTypes.number,
  pointsExpiredTotal_value: PropTypes.number,
  pointsForfeitedTotal_value: PropTypes.number,
  endingBalanceTotal_value: PropTypes.number,
  userBalances: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      openingBalance: PropTypes.number,
      newPoints: PropTypes.number,
      pointsSpent: PropTypes.number,
      pointsExpired: PropTypes.number,
      pointsForfeited: PropTypes.number,
      endingBalance: PropTypes.number,
    }),
  ),
};

LoyaltyPoints.defaultProps = {
  openingBalanceTotal: 0,
  newPointsTotal: 0,
  pointsSpentTotal: 0,
  pointsExpiredTotal: 0,
  pointsForfeitedTotal: 0,
  endingBalanceTotal: 0,
  openingBalanceTotal_value: 0,
  newPointsTotal_value: 0,
  pointsSpentTotal_value: 0,
  pointsExpiredTotal_value: 0,
  pointsForfeitedTotal_value: 0,
  endingBalanceTotal_value: 0,
  userBalances: [],
};

const Payables = ({ amountTotal, payables }) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container>
          <ReportItem label="Total Amount">
            {formatCurrency(amountTotal)}
          </ReportItem>
        </Grid>
      </Paper>

      <FancyTable
        title="Payees Summary"
        columns={[
          { field: 'name', title: 'Name' },
          { field: 'userId', title: 'User ID', type: 'numeric' },
          { field: 'amount', title: 'Amount', type: 'numeric' },
          { field: 'type', title: 'Type' },
          { field: 'createdAt', title: 'Created Date', type: 'date' },
          { field: 'dueDate', title: 'Due Date', type: 'date' },
        ]}
        data={payables}
        options={{ exportButton: true, exportAllData: true }}
      />
    </>
  );
};

Payables.propTypes = {
  amountTotal: PropTypes.number,
  payables: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      amount: PropTypes.number,
      type: PropTypes.string,
      createdAt: PropTypes.string,
      dueDate: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

Payables.defaultProps = {
  amountTotal: 0,
  payables: [],
};

const BookSales = ({
  unitsTotal,
  salesShareTotal,
  unitsRefundedTotal,
  refundTotal,
  bookSales,
}) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container>
          <ReportItem label="Total Units Sold">{unitsTotal}</ReportItem>
          <ReportItem label="Total Value">
            {formatCurrency(salesShareTotal)}
          </ReportItem>
          <ReportItem label="Total Units Refunded">
            {unitsRefundedTotal}
          </ReportItem>
          <ReportItem label="Total Refunded Amount">
            {formatCurrency(refundTotal)}
          </ReportItem>
        </Grid>
      </Paper>

      <FancyTable
        title="Sales"
        columns={[
          { field: 'ownerName', title: 'Creator' },
          { field: 'ownerId', title: 'Creator ID', type: 'numeric' },
          { field: 'bookId', title: 'Book ID', type: 'numeric' },
          { field: 'title', title: 'Title' },
          { field: 'units', title: 'Units Sold', type: 'numeric' },
          { field: 'salesShare', title: 'Sales Share', type: 'currency' },
          { field: 'unitsRefunded', title: 'Units Refunded', type: 'numeric' },
          { field: 'refundTotal', title: 'Refund Amount', type: 'currency' },
          { field: 'total', title: 'Total', type: 'currency' },
        ]}
        data={bookSales}
        options={{ exportButton: true, exportAllData: true }}
      />
    </>
  );
};

BookSales.propTypes = {
  unitsTotal: PropTypes.number,
  salesShareTotal: PropTypes.number,
  unitsRefundedTotal: PropTypes.number,
  refundTotal: PropTypes.number,
  bookSales: PropTypes.arrayOf(
    PropTypes.shape({
      bookId: PropTypes.number,
      units: PropTypes.number,
      title: PropTypes.string,
      ownerId: PropTypes.number,
      ownerName: PropTypes.string,
      salesShare: PropTypes.number,
    }),
  ),
};

BookSales.defaultProps = {
  unitsTotal: 0,
  salesShareTotal: 0,
  bookSales: [],
  unitsRefundedTotal: 0,
  refundTotal: 0,
};

const TransactionLog = ({
  cashTotal,
  pointsTotal,
  pointsValuesTotal,
  cashTxs,
  pointsTxs,
}) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container>
          <ReportItem label="Total Cash">
            {formatCurrency(cashTotal)}
          </ReportItem>
          <ReportItem label="Total Points">{pointsTotal}</ReportItem>
          <ReportItem label="Total Points (value)">
            {formatCurrency(pointsValuesTotal)}
          </ReportItem>
        </Grid>
      </Paper>

      <FancyTable
        title="Cash Transactions"
        columns={[
          { field: 'type', title: 'Type' },
          { field: 'createdAt', title: 'Date', type: 'date' },
          { field: 'userId', title: 'User ID', type: 'numeric' },
          { field: 'orgId', title: 'Org ID', type: 'numeric' },
          { field: 'buyerId', title: 'Buyer ID', type: 'numeric' },
          { field: 'bookId', title: 'Book ID', type: 'numeric' },
          { field: 'isbn', title: 'ISBN', type: 'numeric' },
          { field: 'orderId', title: 'Order ID', type: 'numeric' },
          { field: 'amount', title: 'Value', type: 'currency' },
        ]}
        data={cashTxs}
        options={{ exportButton: true, exportAllData: true }}
        style={{ marginBottom: '10px' }}
      />
      <FancyTable
        title="Points Transactions"
        columns={[
          { field: 'type', title: 'Type' },
          { field: 'createdAt', title: 'Date', type: 'date' },
          { field: 'userId', title: 'User ID', type: 'numeric' },
          { field: 'buyerId', title: 'Buyer ID', type: 'numeric' },
          { field: 'bookId', title: 'Book ID', type: 'numeric' },
          { field: 'orderId', title: 'Order ID', type: 'numeric' },
          { field: 'amount', title: 'Points', type: 'numeric' },
          { field: 'value', title: 'Points Value', type: 'currency' },
        ]}
        data={pointsTxs}
        options={{ exportButton: true, exportAllData: true }}
      />
    </>
  );
};

TransactionLog.propTypes = {
  cashTotal: PropTypes.number,
  pointsTotal: PropTypes.number,
  pointsValuesTotal: PropTypes.number,
  cashTxs: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      amount: PropTypes.number,
      type: PropTypes.string,
      createdAt: PropTypes.number,
      orderId: PropTypes.number,
      bookId: PropTypes.number,
      buyerId: PropTypes.number,
    }),
  ),
  pointsTxs: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      type: PropTypes.string,
      createdAt: PropTypes.string,
      orderId: PropTypes.number,
      bookId: PropTypes.number,
      buyerId: PropTypes.number,
      amount: PropTypes.number,
      value: PropTypes.number,
    }),
  ),
};

TransactionLog.defaultProps = {
  cashTotal: 0,
  pointsTotal: 0,
  pointsValuesTotal: 0,
  cashTxs: [],
  pointsTxs: [],
};

const UserActivity = ({
  openingFans,
  existingFansNotOnboarded,
  newFanRegistrations,
  newFansNotOnboarded,
  fansDeactivated,
  netFans,
}) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container>
          <ReportItem label="Opening Fans">{openingFans}</ReportItem>
          <ReportItem label="New Fan Registrations">
            {newFanRegistrations}
          </ReportItem>
          <ReportItem label="New Fans not Onboarded">
            {newFansNotOnboarded}
          </ReportItem>
          <ReportItem label="Existing Fans not Onboarded">
            {existingFansNotOnboarded}
          </ReportItem>
          <ReportItem label="Deactivated Fan Accounts">
            {fansDeactivated}
          </ReportItem>
          <ReportItem label="Total Fans at End of Period">{netFans}</ReportItem>
        </Grid>
      </Paper>
    </>
  );
};

UserActivity.propTypes = {
  openingFans: PropTypes.number,
  existingFansNotOnboarded: PropTypes.number,
  newFanRegistrations: PropTypes.number,
  newFansNotOnboarded: PropTypes.number,
  fansDeactivated: PropTypes.number,
  netFans: PropTypes.number,
};

UserActivity.defaultProps = {
  openingFans: 0,
  existingFansNotOnboarded: 0,
  newFanRegistrations: 0,
  newFansNotOnboarded: 0,
  fansDeactivated: 0,
  netFans: 0,
};

const PlatformReporting = () => {
  const classes = useStyles();
  const api = useApi();

  const [state, setState] = useState({
    type: 'platformSales',
    startDate: moment()
      .startOf('month')
      .format('YYYY-MM-DD'),
    endDate: moment()
      .endOf('month')
      .format('YYYY-MM-DD'),
  });
  const [report, setReport] = useState({});

  const handleChange = field => evt => {
    const event = evt.target.value;
    setState(prev => ({ ...prev, [field]: event }));
  }


  const reportComponentMap = {
    platformSales: <PlatformSales {...report} />,
    cashManagement: <CashManagement {...report} />,
    outstandingTransactions: <OutstandingTransactions {...report} />,
    loyaltyPoints: <LoyaltyPoints {...report} />,
    payables: <Payables {...report} />,
    bookSales: <BookSales {...report} />,
    transactionLog: <TransactionLog {...report} />,
    userActivity: <UserActivity {...report} />,
  };

  return (
    <Container className={classes.container}>
      <div className={classes.title}>Platform Reporting</div>
      <Paper className={classes.paper}>
        <h1>Report Options</h1>
        <Grid container spacing={2}>
          <ProfileTextField
            value={state.type}
            onChange={handleChange('type')}
            label="Report Type"
            select
            xs={6}
          >
            <MenuItem value="platformSales">Sales Report</MenuItem>
            <MenuItem value="cashManagement">Cash Management Report</MenuItem>
            <MenuItem value="outstandingTransactions">
              Outstanding Transactions
            </MenuItem>
            <MenuItem value="loyaltyPoints">Loyalty Points Ledger</MenuItem>
            <MenuItem value="payables">Payables Summary</MenuItem>
            <MenuItem value="bookSales">Book Sales Report</MenuItem>
            <MenuItem value="transactionLog">Transaction Log</MenuItem>
            <MenuItem value="userActivity">User Report</MenuItem>
          </ProfileTextField>
          <RowBreak />
          <ProfileTextField
            type="date"
            value={state.startDate}
            onChange={handleChange('startDate')}
            label="Start Date"
            shrink
            xs={6}
          />
          <ProfileTextField
            type="date"
            value={state.endDate}
            onChange={handleChange('endDate')}
            label="End Date"
            shrink
            xs={6}
          />
          <Grid
            item
            component={StyledButton}
            color="primary"
            variant="contained"
            onClick={async () => {
              try {
                const result = await api.createReport(state);
                setReport(result);
              } catch (err) {
                console.log(err);
                console.log(err.response);
              }
            }}
          >
            Create Report
          </Grid>
        </Grid>
      </Paper>

      {report.type && (
        <>
          <div className={classes.title}>
            {_.startCase(report.type)} Report from{' '}
            {moment.unix(report.startDate).format('MMMM Do YYYY')} to{' '}
            {moment.unix(report.endDate).format('MMMM Do YYYY')}
          </div>

          {reportComponentMap[report.type]}
        </>
      )}
    </Container>
  );
};

PlatformReporting.propTypes = {};

export default PlatformReporting;
