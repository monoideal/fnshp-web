/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import history from 'lib/history';
import { withRouter, useParams } from 'react-router-dom';
import { Container, Grid, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useApi } from 'api/';
import { getResizedImage } from 'util/helpers';
import BookInformation from 'components/Fans/BookDetailDescription';
import moment from 'moment';
import QRCode from 'qrcode';
import clsx from 'clsx';
import { get, assign, isEmpty, find } from 'lodash';
import BlockchainPopover from 'components/shared/BlockchainPopover';
import CreatorProfileCard from 'components/shared/CreatorProfileCard';
import BreadcrumbLink from 'components/shared/BreadcrumbLink';
import { RowBreak } from '../New/AccordionBookAndCoverUpload';
import RoyaltyContractViewContainer from './RoyaltyContractViewContainer';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  parentContainer: {
    backgroundColor: '#f9f9f9',
  },
  card: {
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 2px 0 rgba(0, 0, 0, 0.08)',
    borderRadius: '2px',
    borderColor: '#dcdd5c',
  },
  bookSummaryContainer: {
    padding: '14px 14px 32px 14px',
    backgroundColor: '#ffffff',
  },
  royaltyContractContainer: {
    marginTop: '24px',
  },
  bookInformationContainer: {
    marginTop: '24px',
    padding: '20px 14px 32px 16px',
    backgroundColor: '#ffffff',
  },
  catalogueLink: {
    fontFamily: 'Rubik',
    fontSize: '16px',
    color: '#000000',
    marginBottom: '39px',
  },
  title: {
    paddingLeft: '10px',
    fontFamily: 'Rubik',
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#000000',
    marginBottom: '5px',
  },
  subtitle: {
    paddingLeft: '10px',
    fontFamily: 'Rubik',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#383e41',
    marginBottom: '12px',
  },
  status: {
    paddingLeft: '10px',
    fontFamily: 'Rubik',
    fontWeight: 'bold',
    fontSize: '11px',
    color: '#161230',
  },
  heading: {
    fontFamily: 'Rubik',
    fontWeight: 'bold',
    fontSize: '17px',
    color: '#000000',
    marginBottom: '24px',
  },
  subHeading: {
    paddingLeft: '10px',
    fontFamily: 'Rubik',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333333',
    lineHeight: 1.94,
  },
  data: {
    paddingLeft: '10px',
    fontFamily: 'Rubik',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#333333',
    lineHeight: 1.94,
  },
  sectionHeading: {
    fontFamily: 'Rubik',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#202f35',
    marginBottom: '16px',
  },
  qrCode: {
    width: '56px',
    height: '56px',
  },
  smallRow: {
    marginTop: 5,
    [theme.breakpoints.down('md')]: {
      margin: '10px auto 0',
      '& > div': {
        justifyContent: 'center',
      },
    },
  },
  authorLink: {
    border: 'none',
    background: 'none',
    color: theme.palette.black.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  image: {
    textAlign: 'center',
    '& img': {
      object: 'contain',
      width: '180px',
      height: '233px',
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        maxHeight: 200,
      },
    },
  },
}));

function BookSummary({ book }) {
  const classes = useStyles();
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const qrCodeUrl = `${baseUrl}/book/${book.id}`;
  let qrCode = '';
  QRCode.toDataURL(qrCodeUrl, (err, url) => {
    qrCode = url;
    if (err) {
      console.log(err);
    }
  });

  // For handling the blockchain tx hash popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handlePopoverOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handlePopoverClose() {
    setAnchorEl(null);
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={3} className={classes.image}>
          <img alt={book.title} src={getResizedImage(book.coverUrl, 600)} />
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={9} className={classes.title}>
              {book.title}
            </Grid>

            <Grid item xs={3}>
              <img alt="QR Code" src={qrCode} className={classes.qrCode} />
            </Grid>

            <Grid item xs={9} className={classes.subtitle}>
              {book.subtitle}
            </Grid>
            <Grid item xs={9} className={classes.status}>
              <img
                alt={book.status}
                src={`/${book.status.toLowerCase()}.svg`}
                onClick={handlePopoverOpen}
              />
            </Grid>
            <Grid item xs={5} className={classes.subHeading}>
              <Typography>Ebook submitted by</Typography>
            </Grid>
            <Grid item xs={7} className={classes.data}>
              {book.createdBy}
            </Grid>
            <Grid item xs={5} className={classes.subHeading}>
              <Typography>Date Ebook submitted</Typography>
            </Grid>
            <Grid item xs={7} className={classes.data}>
              {book.createdDate
                ? moment(book.createdDate).format('YYYY-MM-DD')
                : ''}
            </Grid>
          </Grid>
        </Grid>
        <BlockchainPopover
          anchorEl={anchorEl}
          handlePopoverClose={handlePopoverClose}
          transactionHash={book.transactionHash}
        />
      </Grid>
    </Box>
  );
}

BookSummary.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    coverUrl: PropTypes.string,
    status: PropTypes.string,
    createdBy: PropTypes.string,
    createdDate: PropTypes.string,
    transactionHash: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        displayName: PropTypes.string,
      }),
    ),
    rating: PropTypes.number,
    numRatings: PropTypes.number,
    recommendations: PropTypes.number,
    assets: PropTypes.arrayOf(
      PropTypes.shape({
        assetFormat: PropTypes.string,
      }),
    ),
    price: PropTypes.number,
  }).isRequired,
};

function BookDetails() {
  const { fanshipUser } = React.useContext(AppContext);
  const loggedInUser = fanshipUser?.id
  const { isSuperuser } = fanshipUser;
  const isCreator = fanshipUser.creator;
  const api = useApi();
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCatalog, setIsCatalog] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();
  async function initialize() {
    try {
      const response = isSuperuser
        ? await api.fetchAdminBook(bookId)
        : await api.fetchOneCreatorBook(bookId);
      const tempbook = response.book;
      let royaltyContract = {};
      if (loggedInUser === tempbook.ownerId) {
        royaltyContract = await api.fetchRoyaltyContractForBook(bookId);
      }

      if (tempbook.subject) {
        tempbook.subject = tempbook.subject.split(';');
      } else {
        tempbook.subject = null;
      }
      assign(tempbook, { royaltyContract });
      setBook(tempbook);
      setIsCatalog(true);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    initialize();
  }, [bookId, api]);

  if (isLoading) return 'Loading...';

  if (error) return 'Some Error Occured';

  return !isEmpty(book) ? (
    <Container maxWidth="md" className={classes.container}>
      <BreadcrumbLink text="My Catalogue" to="/catalog" />
      <Grid
        container
        spacing={3}
        className={clsx(classes.bookInformationContainer, classes.card)}
      >
        <Grid item xs={12}>
          <BookSummary book={book} />
        </Grid>
      </Grid>
      <RowBreak />
      <Grid
        container
        spacing={3}
        className={clsx(classes.bookInformationContainer, classes.card)}
      >
        <Grid item xs={6}>
          <Typography className={classes.heading}>Profiles</Typography>
        </Grid>
        {isCreator && (
          <Grid item xs={6} style={{ textAlign: 'right', fontWeight: 'bold' }}>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() =>
                history.push(`/catalog/book-request/${bookId}/owned`)
              }
            >
              Add my profile
            </Button>
          </Grid>
        )}
        {book.profiles &&
          book.profiles
            .filter(c => {
              if (loggedInUser === book.ownerId || isSuperuser) return true;
              return c.userId === loggedInUser;
            })
            .map((profile, key) => (
              <Grid item xs={12} md={6} key={key}>
                <CreatorProfileCard
                  profile={{
                    ...profile,
                    ...find(book.contributors, { alId: profile.alId }),
                  }}
                />
              </Grid>
            ))}
      </Grid>
      <RowBreak />
      {loggedInUser === book.ownerId ? (
        <Grid
          container
          spacing={3}
          className={clsx(classes.bookInformationContainer, classes.card)}
        >
          <Grid item xs={12}>
            <RoyaltyContractViewContainer
              data={get(book, 'royaltyContract') || {}}
              bookId={book.id}
              status={book.status}
            />
          </Grid>
        </Grid>
      ) : null}
      <RowBreak />
      <Grid
        container
        spacing={3}
        className={clsx(classes.bookInformationContainer, classes.card)}
      >
        {' '}
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.heading}>
                Book Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <BookInformation book={book} isCatalog={isCatalog} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  ) : (
    'No Data Found'
  );
}

BookDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default withRouter(BookDetails);
