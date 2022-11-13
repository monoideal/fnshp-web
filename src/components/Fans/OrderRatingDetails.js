import React, { useState } from 'react';
import { Box, Grid, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types';
import { useApi } from 'api/';
import ButtonLink from 'components/shared/ButtonLink';
import MyRating from 'components/shared/MyRating';

const useStyles = makeStyles(theme => ({
  marginResetForLink: {
    marginTop: 5,
    color: '#c04800',
    textDecoration: 'underline',
  },
  wholeMarg: {
    marginTop: 20,
    padding: 20,
    border: 'solid 0.5px #837e98',
  },
  rating: {
    color: theme.palette.red.main,
  },
  margTopGrid: {
    marginTop: 15,
  },
  ratingTitle: {
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 'normal',
  },
  TextHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  fontPro: {
    fontSize: 14,
    marginLeft: 2,
    paddingBottom: '10px',
  },
}));

function OrderRatingDetails(props) {
  const classes = useStyles();
  const { order, orderItems, handleOrderDetails } = props;
  const api = useApi();
  const [ratingValue, setRatingValue] = useState(orderItems.rating || 0);

  return (
    <>
      {orderItems !== undefined ? (
        <>
          <Grid container>
            <Icon className={classes.marginResetForLink}>
              chevron_left_icon
            </Icon>
            <ButtonLink
              className={classes.marginResetForLink}
              onClick={() => handleOrderDetails(orderItems.orderId)}
            >
              Back
            </ButtonLink>
          </Grid>
          <Grid container className={classes.margTopGrid}>
            <Grid container item xs={4}>
              <Grid className={classes.TextHeader}>
                ORDER NUMBER : {order.shopifyId}
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.TextHeader}>
              ORDERED ON &nbsp; {order.createdAt}
            </Grid>
          </Grid>
          <Grid container className={classes.wholeMarg}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={6}>
                  <Grid container>
                    <Grid item sm={3}>
                      <img
                        width="77"
                        height="120"
                        src={orderItems.coverUrl}
                        alt={orderItems.title}
                      />
                    </Grid>
                    <Grid item sm={5}>
                      <Box className={classes.TextHeader}>
                        {orderItems.title}
                      </Box>
                      <Grid container>
                        <Box className={classes.fontPro}>
                          {`by ${orderItems.contributors
                            .filter(
                              author => author.contributorType === `AUTHOR`,
                            )
                            .map(authors => authors.displayName)
                            .join(' , ')}`}
                        </Box>
                      </Grid>
                      <MyRating bookId={orderItems.bookId} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        ''
      )}
    </>
  );
}
OrderRatingDetails.propTypes = {
  order: PropTypes.shape({
    shopifyId: PropTypes.string,
    createdAt: PropTypes.string,
    paymentMethod: PropTypes.string,
    orderItems: PropTypes.arrayOf(PropTypes.any),
    address: PropTypes.shape({
      address1: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
    }),
  }).isRequired,
  orderItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shape({})))
    .isRequired,
  handleOrderDetails: PropTypes.func.isRequired,
};

export default OrderRatingDetails;
