import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { sumBy } from 'lodash';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { formatCurrency } from 'util/helpers';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Moment from 'react-moment';

const useStyles = makeStyles(theme => ({
  paper: {
    border: `solid 1px ${theme.palette.grey.main}`,
    padding: '24px 34px',
    marginTop: '20px',
    boxShadow: 'none',
    '& a': {
      color: theme.palette.darkOrange.main,
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
      padding: '0 0 10px',
      border: 'none',
    },
  },
  gridItem: {
    marginTop: '10px',
  },
  lightText: {
    color: theme.palette.darkGrey.main,
  },
  lineItem: {
    marginTop: '20px',
    '& img': {
      height: '93px',
      width: '60px',
      marginRight: '20px',
      [theme.breakpoints.down('md')]: {
        marginRight: 10,
      },
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
    },
  },
  authors: {
    flex: 1,
    marginTop: '5px',
  },
}));

function calculateTotal(items) {
  return sumBy(items, 'subtotal');
}

function Description({ book, price, purchaseDate }) {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container style={{ height: '100%', padding: 5 }} direction="column">
      <Grid item>
        <Box fontWeight="fontWeightBold">{book.title}</Box>
      </Grid>
      <Grid item className={classes.authors}>
        <Box>{`by ${book.contributors
          .map(a => a.displayName)
          .join(', ')}`}</Box>
      </Grid>
      {desktopView ? (
        <Grid item>
          <Box fontWeight="fontWeightBold">{formatCurrency(price)}</Box>
        </Grid>
      ) : (
        <Grid item>
          <Box fontWeight="fontWeightBold">
            Ordered <Moment edate={purchaseDate} format="MMMM D, YYYY" />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

Description.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    contributors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
  price: PropTypes.number.isRequired,
  purchaseDate: PropTypes.string.isRequired,
};

function LineItem({ item, purchaseDate, invoiceUrl }) {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container className={classes.lineItem}>
      <Grid item>
        <a href={`/book/${item.book.id}`}>
          <img alt="book-preview" src={item.book.coverUrl} />
        </a>
      </Grid>
      <Grid item>
        <Description
          book={item.book}
          price={item.book.price}
          purchaseDate={purchaseDate}
        />
      </Grid>
      {desktopView ? (
        ''
      ) : (
        <>
          <Grid item style={{ margin: 'auto', marginRight: 0 }}>
            <Box>
              <a href={invoiceUrl}>
                <ArrowForwardIosIcon />
              </a>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
}

LineItem.propTypes = {
  item: PropTypes.shape({
    book: PropTypes.shape({
      id: PropTypes.number,
      coverUrl: PropTypes.string,
      price: PropTypes.number,
    }),
    subtotal: PropTypes.number,
  }).isRequired,
  purchaseDate: PropTypes.string.isRequired,
  invoiceUrl: PropTypes.string.isRequired,
};

/* eslint-disable jsx-a11y/anchor-is-valid */
function Order({ order }) {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Paper square classes={{ root: classes.paper }}>
      <Grid container>
        {desktopView ? (
          <>
            <Grid item sm={6} xs={12} className={classes.gridItem}>
              <Box fontWeight="fontWeightBold">{`ORDER NUMBER: ${order.shopifyId}`}</Box>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.gridItem}>
              <Box textAlign="right">
                <a href={order.orderStatusUrl}>View Invoice</a>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.gridItem}>
              <Box component="span" className={classes.lightText}>
                ORDER PLACED&nbsp;
              </Box>
              <Box component="span" fontWeight="fontWeightBold">
                {` ${order.createdAt}`}
              </Box>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.gridItem}>
              <Box component="span" className={classes.lightText}>
                TOTAL&nbsp;
              </Box>
              <Box component="span" fontWeight="fontWeightBold">
                {` ${formatCurrency(calculateTotal(order.orderItems))}`}
              </Box>
            </Grid>
          </>
        ) : (
          <></>
        )}
        {order.orderItems.map(item => (
          <Grid item sm={6} xs={12} className={classes.gridItem} key={item.id}>
            <LineItem
              item={item}
              desktopView={false}
              purchaseDate={order.createdAt}
              invoiceUrl={order.orderStatusUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    shopifyId: PropTypes.string,
    createdAt: PropTypes.string,
    total: PropTypes.number,
    orderStatusUrl: PropTypes.string,
    orderItems: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default function Orders({ orders, isLoading }) {
  if (isLoading) return 'Loading...';

  return (
    <>
      {orders.map(order => (
        <Order key={order.id} order={order} />
      ))}
    </>
  );
}

Orders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
