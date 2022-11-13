import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, ButtonGroup, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Chart } from 'react-google-charts';
import moment from 'moment';
import _ from 'lodash';

import { formatCurrency } from 'util/helpers';
import { AppContext } from 'components/AppContext';

const DAILY = 'daily';
const MONTHLY = 'monthly';
const YEARLY = 'yearly';

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none',
  },
  header: {
    marginTop: 10,
  },
  selectedButton: {
    background: theme.palette.grey.main,
  },
  summary: {
    marginTop: 20,
  },
}));

export default function TotalSales({ selected, book, data }) {
  const classes = useStyles();
  const theme = useTheme();

  const { fanshipUser } = React.useContext(AppContext);
  const isOwner = book ? fanshipUser.id === book.ownerId : true;
  // { daily, monthly, yearly }
  const [chartInterval, setChartInterval] = useState('daily');

  if (!data) return <></>;
  const { timeSeries, summary } = data;
  const { unitsSold, netRevenue, tipsReceived } = summary;

  const format = {
    [DAILY]: 'M/D',
    [MONTHLY]: 'M/YY',
    [YEARLY]: 'YYYY',
  }[chartInterval];

  const chartData = _(timeSeries)
    .map(d => ({
      date: moment(d.date).format(format),
      amount: d.amount,
    }))
    .groupBy('date')
    .map((v, k) => [k, _.sumBy(v, 'amount')]);

  return (
    <div className={!selected ? classes.hidden : undefined}>
      <Grid container justify="space-between">
        {/* Header */}
        <Grid item className={classes.header}>
          <Box fontSize={17}>
            {'Showing analytics for '}
            <Box component="span" fontWeight="bold">
              {book ? book.title : 'all books'}
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <ButtonGroup size="small">
            <Button
              className={
                chartInterval === DAILY ? classes.selectedButton : undefined
              }
              onClick={() => setChartInterval(DAILY)}
            >
              Daily
            </Button>
            <Button
              className={
                chartInterval === MONTHLY ? classes.selectedButton : undefined
              }
              onClick={() => setChartInterval(MONTHLY)}
            >
              Monthly
            </Button>
            <Button
              className={
                chartInterval === YEARLY ? classes.selectedButton : undefined
              }
              onClick={() => setChartInterval(YEARLY)}
            >
              Yearly
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {/* Summary */}
      <Grid container justify="space-evenly" className={classes.summary}>
        <Grid>
          <Box textAlign="center" fontSize={20} fontWeight="bold">
            {unitsSold}
          </Box>
          <Box textAlign="center" fontSize={14}>
            Units Sold
          </Box>
        </Grid>
        <Grid>
          <Box textAlign="center" fontSize={20} fontWeight="bold">
            {isOwner ? formatCurrency(netRevenue) : 'N/A'}
          </Box>
          <Box textAlign="center" fontSize={14}>
            Net Revenue
          </Box>
        </Grid>
        <Grid>
          <Box textAlign="center" fontSize={20} fontWeight="bold">
            {formatCurrency(tipsReceived)}
          </Box>
          <Box textAlign="center" fontSize={14}>
            Applause Received
          </Box>
        </Grid>
      </Grid>

      {/* chart data if time series */}
      {timeSeries.length ? (
        <Chart
          chartType="LineChart"
          data={[['x', 'y'], ...chartData]}
          options={{
            legend: {
              position: 'none',
            },
            lineWidth: 3,
            series: {
              0: { color: theme.palette.darkPurple.main },
            },
            hAxis: {
              format: 'short',
            },
            vAxis: {
              minValue: 0,
            },
          }}
        />
      ) : (
        <Box fontSize={20} textAlign="center">
          {'There is no sales data for this selection yet.'}
        </Box>
      )}
    </div>
  );
}

TotalSales.propTypes = {
  selected: PropTypes.bool.isRequired,
  book: PropTypes.shape({
    title: PropTypes.string,
    ownerId: PropTypes.number,
  }),
  data: PropTypes.shape({
    timeSeries: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        amount: PropTypes.number,
      }),
    ),
    summary: PropTypes.shape({
      unitsSold: PropTypes.number,
      netRevenue: PropTypes.number,
      tipsReceived: PropTypes.number,
    }),
  }),
};

TotalSales.defaultProps = {
  book: null,
  data: null,
};
