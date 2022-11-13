import React, { useState } from 'react';
import { Box, Grid, makeStyles, CircularProgress } from '@material-ui/core';
import ButtonLink from 'components/shared/ButtonLink';
import OrderHistoryHeader from 'components/Fans/OrderHistoryHeader';
import OrderHistoryDetails from 'components/Fans/OrderHistoryDetails';
import OrderRatingDetails from 'components/Fans/OrderRatingDetails';
import PropTypes from 'prop-types';
import { formatCurrency, getResizedImage } from 'util/helpers';
import { useApi } from 'api/';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  margTopGrid: {
    marginTop: 15,
  },
  TextHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  marginResetForLink: {
    margin: 0,
    color: '#c04800',
    textDecoration: 'underline',
  },
  wholeMarg: {
    marginTop: 20,
    padding: 20,
    border: 'solid 0.5px #837e98',
  },
  subHeader: {
    fontSize: 14,
    color: '#837e98',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
}));

const getTotalTips = (order, item) => {
  const relevantTips = order.tipItems.filter(tip => tip.bookId === item.bookId);
  const tips = [];
  relevantTips.forEach(tip => {
    const author = item.contributors.find(
      contributor => contributor.profileId === tip.profileId,
    );
    tips.push({
      displayName:
        author && author.displayName ? author.displayName : 'Unknown',
      amount: tip.amount,
    });
  });

  return tips;
};

export default function PurchaseViewHistory(props) {
  const { orderHistory, callbackHeader, isLoading } = props;

  const orders = orderHistory.map(order => {
    const orderItems = order.orderItems.map(orderItem => ({
      ...orderItem,
      tips: getTotalTips(order, orderItem),
    }));
    return { ...order, orderItems };
  });
  if (isLoading) return 'Loading...';
  return (
    <PurchaseDetailsHistory
      orderHistory={orders}
      callbackHeader={callbackHeader}
    />
  );
}
PurchaseViewHistory.propTypes = {
  orderHistory: PropTypes.arrayOf(PropTypes.shape(PropTypes.shape({})))
    .isRequired,
  callbackHeader: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function PurchaseDetailsHistory(props) {
  const classes = useStyles();
  const api = useApi();
  const [isOrderDetails, setIsOrderDetails] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [orders, setOrderDetails] = useState([]);
  const { orderHistory, callbackHeader } = props;
  const [orderIndex, setOrderIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function handleOrderDetails(orderId) {
    callbackHeader('Order Details');
    setIsOrderDetails(true);

    try {
      const order = await api.fetchOrdersById(orderId);

      setOrderDetails({
        ...order,
        orderItems: order.orderItems.map(item => ({
          ...item,
          tips: getTotalTips(order, item),
        })),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function hideOrderDetails() {
    callbackHeader('Purchase History');
    setIsOrderDetails(false);
  }

  async function showOrderDetails(orderId) {
    setIsRating(false);
    handleOrderDetails(orderId);
  }

  return (
    <>
      {isOrderDetails ? (
        <>
          {isRating ? (
            <OrderRatingDetails
              order={orders}
              orderItems={orders.orderItems[orderIndex]}
              handleOrderDetails={orderId => showOrderDetails(orderId)}
            />
          ) : (
            <>
              <CircularProgress
                style={{
                  display: isLoading ? 'block' : 'none',
                }}
              />
              {orders.length !== 0 ? (
                <>
                  <OrderHistoryHeader
                    order={orders}
                    hideOrderDetails={hideOrderDetails}
                  />
                  <OrderHistoryDetails
                    orderItems={orders.orderItems}
                    callback={value => setIsRating(value)}
                    callbackHeader={callbackHeader}
                    setIndex={indexValue => setOrderIndex(indexValue)}
                  />
                </>
              ) : (
                ''
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Grid container className={classes.marginTopBottom}>
            {orderHistory.map((orderHistoryDetails, indx) => (
              <Grid container className={classes.wholeMarg} key={indx}>
                <Grid item xs={6}>
                  <Box className={classes.TextHeader}>
                    ORDER NUMBER : {orderHistoryDetails.shopifyId}
                  </Box>
                  <Box className={classes.subHeader}>
                    ORDER PLACED :
                    <span className={classes.TextHeader}>
                      {moment
                        .unix(orderHistoryDetails.createdAt)
                        .format('MMM DD, YYYY')}
                    </span>
                  </Box>
                </Grid>
                <Grid item xs={3} className={classes.subHeader}>
                  TOTAL &nbsp;
                  <span className={classes.TextHeader}>
                    {` ${formatCurrency(
                      orderHistoryDetails.gross + orderHistoryDetails.tax,
                    )}`}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <ButtonLink className={classes.marginResetForLink}>
                      <a href={orderHistoryDetails.orderStatusUrl}>
                        View Invoice
                      </a>
                    </ButtonLink>
                  </Box>
                  <Box>
                    <ButtonLink
                      className={classes.marginResetForLink}
                      onClick={() =>
                        handleOrderDetails(
                          orderHistoryDetails.orderItems[0].orderId,
                        )
                      }
                    >
                      Order Details
                    </ButtonLink>
                  </Box>
                </Grid>
                <Grid item sm={12}>
                  <Grid container>
                    {orderHistoryDetails.orderItems.map((item, index) => (
                      <Grid item sm={6} key={index}>
                        <Grid container>
                          <Grid item sm={3}>
                            <img
                              width="77"
                              height="120"
                              src={getResizedImage(item.coverUrl, 600)}
                              alt={item.title}
                            />
                          </Grid>
                          <Grid item sm={5}>
                            <Box className={classes.margCntr}>
                              <Box className={classes.TextHeader}>
                                {item.title}
                              </Box>
                            </Box>
                            <Grid container className={classes.margCntr}>
                              <Box
                                className={classes.fontPro}
                              >{`by ${item.contributors
                                .filter(
                                  author => author.contributorType === `AUTHOR`,
                                )
                                .map(authors => authors.displayName)
                                .join(' , ')}`}</Box>
                            </Grid>
                            <Grid container className={classes.margCntr}>
                              <Box className={classes.fontPro}>Format:</Box>{' '}
                              <Box className={classes.TextHeader}>
                                {item.format}
                              </Box>
                            </Grid>
                            <Grid container>
                              <Box className={classes.fontPro}>
                                Applause: {item.tips.length === 0 && `$0`}
                              </Box>{' '}
                              {item.tips.map(tip => (
                                <Box className={classes.TextHeader}>
                                  {`${tip.displayName}: $${tip.amount}`}
                                </Box>
                              ))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

PurchaseDetailsHistory.propTypes = {
  orderHistory: PropTypes.arrayOf(PropTypes.shape(PropTypes.shape({})))
    .isRequired,
  callbackHeader: PropTypes.func.isRequired,
};
