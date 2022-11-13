import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Grid, Paper, Link, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import Button from 'components/shared/Button';
import { useApi } from 'api/';
import { formatContractPercent } from 'util/helpers';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20,
  },
  paper: {
    padding: 0,
  },
  headerElement: {
    padding: theme.spacing(2, 3, 0),
  },
  bookCover: {
    width: '100%',
  },
  details: {
    margin: '10px 0',
    padding: 20,
    background: theme.palette.backgroundYellow.main,
  },
  detailBook: {
    margin: '5px 0',
    padding: 10,
  },
  detailBookItem: {
    margin: '5px 0',
  },
  detailPercentage: {
    margin: '30px 0',
    paddingLeft: '30px !important',
    borderLeft: `solid 1px ${theme.palette.grey.main}`,
  },
  bookDetailsLink: {
    color: theme.palette.orange.main,
    textDecoration: 'underline',
  },
  buttonOutlined: {
    borderWidth: 2,
    color: theme.palette.black.main,
    '&:hover': {
      borderWidth: 2,
    },
  },
  buttons: {
    paddingBottom: 10,
  },
}));

function ConfirmContract({ contract, triggerUpdate }) {
  const classes = useStyles();
  const api = useApi();
  // const url = `${config.AL_FRONTEND_URL}/landing/book/`;
  const url = `${window.location.origin}/catalog/view/`;

  const { book, detail } = contract;

  const [isLoading, setIsLoading] = useState(false);

  async function handleClick(status) {
    setIsLoading(true);
    try {
      await api.updateRoyaltyShare(detail.id, status);
      triggerUpdate();
    } catch (err) {
      console.log('ERR!', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Paper className={clsx(classes.paper, classes.container)}>
      {/* title/subtitle  */}
      <Box fontSize={17} fontWeight="bold" className={classes.headerElement}>
        Confirm Royalty Share
      </Box>
      <Box fontSize={16} className={classes.headerElement}>
        {'You have been added a contributor to the following work by '}
        <Box component="span" fontWeight="bold">
          {book.publisher}
        </Box>
        .
      </Box>

      {/* book / contract details */}
      <Grid container className={classes.details}>
        <Grid item sm={2} xs={12}>
          <img
            alt="book-cover"
            src={book.coverUrl}
            className={classes.bookCover}
          />
        </Grid>
        <Grid
          className={classes.detailBook}
          item
          sm={5}
          xs={12}
          container
          direction="column"
          justify="space-between"
        >
          <div>
            <Box className={classes.detailBookItem}>
              <Box component="span" fontWeight="bold">
                {'Title: '}
              </Box>
              {book.title}
            </Box>
            <Box className={classes.detailBookItem}>
              <Box component="span" fontWeight="bold">
                {'Author(s): '}
              </Box>
              {book.contributors.map(a => a.displayName).join(', ')}
            </Box>
            <Box className={classes.detailBookItem}>
              <Box component="span" fontWeight="bold">
                {'Publisher: '}
              </Box>
              {book.publisher}
            </Box>
            <Box className={classes.detailBookItem}>
              <Box component="span" fontWeight="bold">
                {'Publication Year: '}
              </Box>
              {moment(book.datePublished).format('YYYY')}
            </Box>
          </div>
          <Link
            className={classes.bookDetailsLink}
            href={url + book.id}
            target="_blank"
            rel="noreferrer"
          >
            View book details
          </Link>
        </Grid>
        <Grid
          item
          sm={5}
          xs={12}
          container
          direction="column"
          className={classes.detailPercentage}
          justify="center"
        >
          <Grid item>
            <Box fontSize={24} fontWeight="bold">
              {formatContractPercent(detail.royaltyPercentage)}
            </Box>
          </Grid>
          <Grid item>
            <Box fontSize={16}>Your royalty share</Box>
          </Grid>
        </Grid>
      </Grid>

      {/* actions */}
      <Grid
        container
        className={classes.buttons}
        direction="row"
        justify="center"
      >
        <Grid item>
          <Button
            onClick={() => handleClick('approved')}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            CONFIRM
          </Button>
        </Grid>
        <Grid item>
          <CircularProgress
            style={{ visibility: isLoading ? 'visible' : 'hidden' }}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleClick('denied')}
            color="primary"
            variant="outlined"
            className={classes.buttonOutlined}
            disabled={isLoading}
          >
            DENY
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

ConfirmContract.propTypes = {
  contract: PropTypes.shape({
    book: PropTypes.shape({
      attributionLedgerId: PropTypes.string.isRequired,
      id: PropTypes.number,
      publisher: PropTypes.string,
      coverUrl: PropTypes.string,
      title: PropTypes.string,
      contributors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        }),
      ),
      datePublished: PropTypes.string,
    }),
    detail: PropTypes.shape({
      id: PropTypes.number,
      royaltyPercentage: PropTypes.number,
    }),
  }).isRequired,
  triggerUpdate: PropTypes.func.isRequired,
};

export default function PendingContracts({ data, triggerUpdate }) {
  return (
    <div>
      {data.map(contract => (
        <ConfirmContract
          key={contract.id}
          contract={contract}
          triggerUpdate={triggerUpdate}
        />
      ))}
    </div>
  );
}

PendingContracts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  triggerUpdate: PropTypes.func.isRequired,
};
