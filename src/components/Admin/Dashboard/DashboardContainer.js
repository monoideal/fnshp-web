import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import _ from 'lodash';

import SummaryCard from 'components/Admin/Dashboard/SummaryCard';
import { useApi } from 'api/';
import { formatCurrency } from 'util/helpers';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '2% 1% 3% 2%',
  },
  title: {
    fontSize: '22px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontWeight: 'bold',
    marginBottom: '4%',
  },
  itemTwo: {
    marginTop: '4%',
  },
}));

export default function DashboardContainer() {
  const classes = useStyles();
  const api = useApi();
  const [data, setData] = useState({});

  useEffect(() => {
    (async function initialize() {
      try {
        setData(await api.fetchAdminDashboard());
      } catch (err) {
        console.log(err);
      }
    })();
  }, [api]);
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container>
        <Grid item xs={12} className={classes.title}>
          Dashboard
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <SummaryCard
              label="Active Fans"
              current={parseInt(_.get(data, 'currentMonth.fans', 0), 10)}
              previous={parseInt(_.get(data, 'lastMonth.fans', 0), 10)}
              link="/admin/fans"
            />
            <SummaryCard
              label="Total Revenue"
              current={parseInt(_.get(data, 'currentMonth.revenue', 0), 10)}
              previous={parseInt(_.get(data, 'lastMonth.revenue', 0), 10)}
              link="/admin/analytics"
              formatter={formatCurrency}
            />
            <SummaryCard
              label="Total Orders"
              current={parseInt(_.get(data, 'currentMonth.orders', 0), 10)}
              previous={parseInt(_.get(data, 'lastMonth.orders', 0), 10)}
              link="/admin/analytics"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
