import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography, Divider } from '@material-ui/core';
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
  subtitle: {
    fontSize: '22px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
  },
  itemTwo: {
    marginTop: '4%',
  },
  divider: {
    margin: '30px 5px',
  },
}));

export default function Statistics() {
  const classes = useStyles();
  const api = useApi();
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    (async function initialize() {
      try {
        setAnalytics(await api.fetchAdminAnalytics());
      } catch (err) {
        console.log(err);
      }
    })();
  }, [api]);
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container>
        <Grid item xs={12} className={classes.title}>
          Statistics
        </Grid>
        <Grid item xs={12} className={classes.summaryWrapper}>
          <Typography className={classes.subtitle}>Fans</Typography>
          <Grid container spacing={3}>
            <SummaryCard
              label="Total"
              tooltip="Number of registered fans - Total"
              current={parseInt(_.get(analytics, 'fans.total', 0), 10)}
            />
            <SummaryCard
              label="Total Last Week"
              tooltip="New fans registered in the last 1 week"
              current={parseInt(_.get(analytics, 'fans.totalLastWeek', 0), 10)}
            />
            <SummaryCard
              label="Total Active Last Week"
              tooltip="Number of fans that have logged into the system at least once in the last 1 week"
              current={parseInt(_.get(analytics, 'fans.activeLastWeek', 0), 10)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.summaryWrapper}>
          <Typography className={classes.subtitle}>Orders</Typography>
          <Grid container spacing={3}>
            <SummaryCard
              label="Total"
              tooltip="Total Number of eBooks purchased"
              current={parseInt(_.get(analytics, 'orders.total', 0), 10)}
            />
            <SummaryCard
              label="Total Last Week"
              tooltip="eBooks purchased in the last 1 week"
              current={parseInt(
                _.get(analytics, 'orders.totalLastWeek', 0),
                10,
              )}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.summaryWrapper}>
          <Typography className={classes.subtitle}>Recommendations</Typography>
          <Grid container spacing={3}>
            <SummaryCard
              label="Distinct fans"
              tooltip="Number of fans recommending"
              current={parseInt(
                _.get(analytics, 'recommendations.distinctFans', 0),
                10,
              )}
            />
            <SummaryCard
              label="Distinct eBooks"
              tooltip="Number of eBooks being recommended"
              current={parseInt(
                _.get(analytics, 'recommendations.distinctBooks', 0),
                10,
              )}
            />
            <SummaryCard
              label="Total Sale"
              tooltip="Number of Recommendations that have resulted in a sale"
              current={parseInt(
                _.get(analytics, 'recommendations.totalSales', 0),
                10,
              )}
            />
            <SummaryCard
              label="Total Sale Last Week"
              tooltip="Number of Recommendations that have resulted in a sale last week"
              current={parseInt(
                _.get(analytics, 'recommendations.totalSalesLastWeek', 0),
                10,
              )}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.summaryWrapper}>
          <Typography className={classes.subtitle}>Authors</Typography>
          <Grid container spacing={3}>
            <SummaryCard
              label="Total"
              tooltip="Number of authors who have been provided the Access Code"
              current={parseInt(_.get(analytics, 'authors.total', 0), 10)}
            />
            <SummaryCard
              label="Receiving Tips"
              tooltip="Number of authors receiving tips - Total"
              current={parseInt(
                _.get(analytics, 'authors.receivingTips', 0),
                10,
              )}
            />
            <SummaryCard
              label="Total Tips"
              tooltip="Total tips amount"
              current={parseInt(_.get(analytics, 'authors.totalTips', 0), 10)}
              formatter={formatCurrency}
            />
            <SummaryCard
              label="Total Tips Last Week"
              tooltip="Tips amount - last 1 week"
              current={parseInt(
                _.get(analytics, 'authors.totalTipsLastWeek', 0),
                10,
              )}
              formatter={formatCurrency}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.summaryWrapper}>
          <Typography className={classes.subtitle}>Charity</Typography>
          <Grid container spacing={3}>
            <SummaryCard
              label="Total donated"
              tooltip="Points donated to charities - Total"
              current={parseInt(
                _.get(analytics, 'rewards.totalDonated', 0),
                10,
              )}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.summaryWrapper}>
          <Typography className={classes.subtitle}>Loyalty Points</Typography>
          <Grid container spacing={3}>
            <SummaryCard
              label="Total"
              tooltip="Total number of loyalty points in the system"
              current={parseInt(_.get(analytics, 'rewards.totalPoints', 0), 10)}
            />
            <SummaryCard
              label="Total Last Week"
              tooltip="New Loyalty points created in the last 1 week"
              current={parseInt(
                _.get(analytics, 'rewards.totalPointsLastWeek', 0),
                10,
              )}
            />
            <SummaryCard
              label="Total For Purchases"
              tooltip="Loyalty points earned as a result of purchase - Total"
              current={parseInt(
                _.get(analytics, 'rewards.totalPointsForPurchase', 0),
                10,
              )}
            />
            <SummaryCard
              label="Total For Purchases Last Week"
              tooltip="Loyalty points earned as a result of purchase - Last 1 week"
              current={parseInt(
                _.get(analytics, 'rewards.totalPointsForPurchaseLastWeek', 0),
                10,
              )}
            />
          </Grid>
          <Grid container spacing={3}>
            <SummaryCard
              label="Total For Recommendations"
              tooltip="Loyalty points earned as a result of purchase - Total"
              current={parseInt(
                _.get(analytics, 'rewards.totalPointsForRecommendation', 0),
                10,
              )}
            />
            <SummaryCard
              label="Total For Recommendations Last Week"
              tooltip="Loyalty points earned as a result of purchase - Last 1 week"
              current={parseInt(
                _.get(
                  analytics,
                  'rewards.totalPointsForRecommendationLastWeek',
                  0,
                ),
                10,
              )}
            />
            <SummaryCard
              label="Total Redeemed"
              tooltip="Loyalty points redeemed towards a sale - Total"
              current={parseInt(
                _.get(analytics, 'rewards.totalPointsRedeemed', 0),
                10,
              )}
            />
            <SummaryCard
              label="Total Redeemed Last Week"
              tooltip="Loyalty points redeemed towards a sale - Last 1 week"
              current={parseInt(
                _.get(analytics, 'rewards.totalPointsRedeemedLastWeek', 0),
                10,
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
