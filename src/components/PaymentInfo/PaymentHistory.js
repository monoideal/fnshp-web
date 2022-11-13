import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@material-ui/core';
import moment from 'moment';
import _ from 'lodash';

import { formatCurrency } from 'util/helpers';
import { useAuth0 } from "@auth0/auth0-react";
import StyledTable from 'components/shared/StyledTable';
import Pagination from 'components/Catalog/View/Pagination';
import HomeLink from 'components/PaymentInfo/HomeLink';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '20px 25px 15px 25px',
  },
  buttonOutline: {
    border: '2px solid #ffc555',
    textTransform: 'none',
  },
  buttonPaypal: {
    border: '2px solid #ffc555',
    borderRadius: '4px',
    padding: '10px 25px',
    display: 'flex',
    alignItems: 'center',
  },
  containerButton: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '400px',
    marginTop: '10px',
  },
  headerPage: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonGrey: {
    backgroundColor: '#dcdcdc',
    textTransform: 'none',
    padding: '10px 30px',
    borderRadius: 0,
  },
  table: {
    '& th,td': {
      textAlign: 'left',
      margin: 'auto 0px',
      padding: '5px',
      borderTop: '1px solid rgba(131, 126, 152, 0.2)',
    },
    '& td': {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  },
  status: {
    fontSize: '13px',
    fontWeight: 'bold',
  },
  statusPending: {
    color: '#ff7900',
  },
  statusPaid: {
    color: '#7ed321',
  },
  statusRejected: {
    color: '#d0021b',
  },
}));

export default function PaymentHistory({ summary, withdrawals }) {
  const { fanshipUser } = React.useContext(AppContext);

  const displayName = fanshipUser?.organization?.name || 
    `${fanshipUser?.creator?.firstName} ${fanshipUser?.creator?.lastName}`;

  const classes = useStyles();

  return (
    <>
      <HomeLink />

      <div className={classes.headerPage}>
        <h1>Payments</h1>
        <h4>
          <Box fontWeight="normal" fontStyle="italic">
            It will take up to 24 hours to update the analytics
          </Box>
        </h4>
      </div>

      <Paper className={classes.paper}>
        <Grid
          container
          justify="flex-start"
          alignContent="space-between"
          className={classes.containerPaper}
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            Name: <span style={{ fontWeight: 'bold' }}>{displayName}</span>
          </Grid>
          <Grid item xs={12} md={6}>
            Current Balance:{' '}
            <span style={{ fontWeight: 'bold' }}>{summary.accountBalance}</span>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: '40px' }}>
            <StyledTable className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>MONTH</TableCell>
                  <TableCell>YEAR</TableCell>
                  <TableCell>PAYMENT AMOUNT</TableCell>
                  <TableCell>PAYMENT METHOD</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {withdrawals.map(({ id, datePaid, amount, paymentMethod }) => (
                  <TableRow key={id}>
                    <TableCell>
                      {moment.unix(datePaid).format('MMMM')}
                    </TableCell>
                    <TableCell>
                      {moment.unix(datePaid).format('YYYY')}
                    </TableCell>
                    <TableCell>{formatCurrency(amount)}</TableCell>
                    <TableCell>{paymentMethod}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
            <Pagination />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

PaymentHistory.propTypes = {
  summary: PropTypes.shape({
    accountBalance: PropTypes.number,
  }).isRequired,
  withdrawals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      amount: PropTypes.number,
      createdAt: PropTypes.number,
    }),
  ).isRequired,
};
