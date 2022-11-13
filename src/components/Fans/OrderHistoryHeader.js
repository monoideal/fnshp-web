import React from 'react';
import { Box, Grid, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonLink from 'components/shared/ButtonLink';
import PropTypes from 'prop-types';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  marginResetForLink: {
    margin: 0,
    color: '#c04800',
    textDecoration: 'underline',
  },
  marginTopBackGrid: {
    // marginTop: 5,
    marginBottom: 5,
  },
  margTopGrid: {
    marginTop: 10,
  },
  margTopInnerGrid: {
    marginTop: 10,
  },
  TextHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  TextHeaderVisa: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
  },
  TextHeaderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 1,
  },
  SpaceInBoxes: {
    marginRight: 6,
  },
  HeaderBox: {
    marginTop: 20,
    padding: 20,
    border: 'solid 0.5px #837e98',
  },
}));
export default function OrderHistoryHeader(props) {
  const classes = useStyles();
  const { order, hideOrderDetails } = props;
  // let paymentMethodImage = '';
  // // showing visa image for bogus payment method. need to add more images as per payment method
  // if (order.paymentMethod === 'bogus') {
  //   paymentMethodImage = '/img/Visa.png';
  // } else if (order.paymentMethod === 'visa') {
  //   paymentMethodImage = '/img/Visa.png';
  // }

  return (
    <Grid container className={classes.margTopGrid}>
      {order ? (
        <>
          <Grid container className={classes.marginTopBackGrid}>
            <Icon className={classes.marginResetForLink}>
              chevron_left_icon
            </Icon>
            <ButtonLink
              className={classes.marginResetForLink}
              onClick={hideOrderDetails}
            >
              Back
            </ButtonLink>
          </Grid>
          <Grid container item xs={4}>
            <Box className={classes.TextHeader}>
              ORDER NUMBER : {order.shopifyId}
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.TextHeader}>
            ORDERED ON &nbsp;
            {moment.unix(order.createdAt).format('MMM DD, YYYY')}
          </Grid>
          <Grid item xs={2}>
            <ButtonLink className={classes.marginResetForLink}>
              <a href={order.orderStatusUrl}>View Invoice</a>
            </ButtonLink>
          </Grid>
          <Grid container justify="space-between">
            <Grid container className={classes.HeaderBox}>
              <Grid item sm={4}>
                <Box className={classes.TextHeader}>BILLING ADDRESS</Box>
                <Box>{order.address.userName}</Box>
                <Box>{order.address.address1}</Box>
                <Box>{order.address.city}</Box>
                <Box>{order.address.country}</Box>
              </Grid>
              <Grid item sm={4}>
                <Box className={classes.TextHeader}>PAYMENT METHOD</Box>
                <Grid container item>
                  {/* <Box className={classes.SpaceInBoxes}>
                    <img src={paymentMethodImage} alt="order" />
                  </Box> */}
                  <Box className={classes.TextHeaderVisa}>
                    {`****${order.paymentMethod}`}
                  </Box>
                </Grid>
              </Grid>
              <Grid item sm={3}>
                <Box className={classes.TextHeader}>ORDER SUMMARY</Box>
                <Grid container item className={classes.margTopInnerGrid}>
                  <Box className={classes.SpaceInBoxes}>Subtotal:</Box>
                  <Box className={classes.TextHeaderTotal}>
                    {`$${order.gross}`}
                  </Box>
                </Grid>
                <Grid container item className={classes.margTopInnerGrid}>
                  <Box className={classes.SpaceInBoxes}>Tax:</Box>
                  <Box className={classes.TextHeaderTotal}>
                    {`$${order.tax}`}
                  </Box>
                </Grid>
                <Grid container item className={classes.margTopInnerGrid}>
                  <Box className={classes.SpaceInBoxes}>Total:</Box>
                  <Box className={classes.TextHeaderTotal}>
                    {`$${order.gross + order.tax}`}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <span>No order details</span>
      )}
    </Grid>
  );
}

OrderHistoryHeader.propTypes = {
  order: PropTypes.shape({
    shopifyId: PropTypes.string,
    createdAt: PropTypes.string,
    gross: PropTypes.number,
    tax: PropTypes.number,
    paymentMethod: PropTypes.string,
    orderStatusUrl: PropTypes.string,
    orderItems: PropTypes.arrayOf(PropTypes.any),
    address: PropTypes.shape({
      userName: PropTypes.string,
      address1: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
    }),
  }).isRequired,
  hideOrderDetails: PropTypes.func.isRequired,
};
