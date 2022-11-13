import React from 'react';
import { Box, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonLink from 'components/shared/ButtonLink';
import PropTypes from 'prop-types';
import { formatCurrency, getResizedImage } from 'util/helpers';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  marginResetForLink: {
    margin: 0,
    color: '#c04800',
    textDecoration: 'underline',
    fontSize: '0.875rem',
    fontFamily: theme.fontFamily,
    fontWeight: 400,
    lineHeight: 1.43,
  },
  margTopGrid: {
    marginTop: 15,
  },
  margTopInnerGrid: {
    marginTop: 10,
  },
  TextHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  TextHeaderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 1,
  },
  SpaceInBoxes: {
    marginRight: 6,
  },
  fontPro: {
    fontSize: 14,
    marginLeft: 2,
  },
  HeaderBox: {
    marginTop: 20,
    padding: 20,
    border: 'solid 0.5px #837e98',
  },
  margCntr: {
    marginTop: 5,
  },
  ButtonColor: {
    width: '103px',
    height: '35px',
    borderRadius: 4,
    boxShadow:
      '0 1px 1px 0 rgba(0, 0, 0, 0.03), inset 0 1px 1px 0 rgba(0, 0, 0, 0.03)',
    border: 'solid 1px #dddddd',
    backgroundColor: '#ffc555',
    fontWeight: 'bold',
    letterSpacing: 0.4,
    marginTop: 10,
    '&:hover': {
      backgroundColor: '#ffc555',
    },
  },
  marginTopBottom: {
    marginTop: 30,
  },
  wholeMarg: {
    marginTop: 20,
    padding: 20,
    border: 'solid 0.5px #837e98',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
}));

function PurchaseHistorySingle(props) {
  const classes = useStyles();
  const { orderItems, callback, callbackHeader, index, setIndex } = props;
  const handleRateClick = i => {
    callback(true);
    callbackHeader('Rate Your Purchase');
    setIndex(i);
  };

  return (
    <Grid container className={classes.marginTopBottom}>
      <Grid item sm={2}>
        <img
          width="77"
          height="120"
          src={getResizedImage(orderItems.coverUrl, 600)}
          alt={orderItems.title}
        />
      </Grid>
      <Grid item sm={7}>
        <Box className={classes.margCntr}>
          <Box className={classes.fontPro}>
            <Box className={classes.TextHeader}>{orderItems.title}</Box>
          </Box>
        </Box>
        <Grid container className={classes.margCntr}>
          <Box className={classes.fontPro}>by </Box>
          <Box className={classes.fontPro}>
            {orderItems.contributors
              .filter(item => item.contributorType === `AUTHOR`)
              .map(authors => authors.displayName)
              .join(' , ')}
          </Box>
        </Grid>
        <Grid container className={classes.margCntr}>
          <Box className={classes.fontPro}>Format:</Box>
          <Box className={classes.TextHeader}>{orderItems.format}</Box>
        </Grid>
        <Grid container className={classes.margCntr}>
          <Box className={classes.fontPro}>Price:</Box>
          <Box className={classes.TextHeader}>
            {` ${formatCurrency(orderItems.subtotal)}`}
          </Box>
        </Grid>
        <Grid
          container
          className={classes.margCntr}
          style={{ display: 'block' }}
        >
          <Box className={classes.fontPro}>Applause:</Box>
          {orderItems.tips.map(tip => (
            <Box className={classes.TextHeader}>
              {`${tip.displayName}: $${tip.amount}`}
            </Box>
          ))}
        </Grid>
        <Button className={classes.ButtonColor}>
          <Link
            to={`/book/${orderItems.bookId}`}
            className={classes.cursorPointer}
          >
            Buy Again
          </Link>
        </Button>
      </Grid>
      <Grid item sm={3}>
        <Grid>
          <ButtonLink
            className={classes.marginResetForLink}
            onClick={() => handleRateClick(index)}
          >
            Rate Your Purchase
          </ButtonLink>
        </Grid>
        <Grid className={classes.margTopInnerGrid}>
          <a
            href={orderItems.downloadUrl}
            variant="body2"
            alt="download"
            className={classes.marginResetForLink}
          >
            Download Ebook
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
}
PurchaseHistorySingle.propTypes = {
  orderItems: PropTypes.objectOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
  callbackHeader: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default function OrderHistoryDetails(props) {
  const classes = useStyles();
  const { orderItems, callback, callbackHeader, setIndex } = props;
  let add = null;
  if (orderItems) {
    add = orderItems.map((orderItem, index) => {
      return (
        <PurchaseHistorySingle
          key={orderItem.id}
          orderItems={orderItem}
          index={index}
          setIndex={setIndex}
          callback={callback}
          callbackHeader={callbackHeader}
        />
      );
    });
  }
  return <Grid className={classes.wholeMarg}>{add}</Grid>;
}

OrderHistoryDetails.propTypes = {
  orderItems: PropTypes.arrayOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
  callbackHeader: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
};
