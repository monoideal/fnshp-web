import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { Grid, Box, Avatar, Typography } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Rating } from '@material-ui/lab';
import Button from 'components/shared/Button';
import AlignedItems from 'components/shared/AlignedItems';
import BookDetailShare from 'components/Fans/BookDetailShare';
import { useAuth0 } from '@auth0/auth0-react';
import { useCart } from 'components/Fans/Cart';
import {
  formatCurrency,
  pluralizeIfNecessary,
  generateFallbackAvatar,
  getResizedImageWithCheck,
  CADtoRewardsPoints,
} from 'util/helpers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonLink from 'components/shared/ButtonLink';
import { get, find } from 'lodash';
import clsx from 'clsx';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexBasis: '0px',
  },
  container: {
    padding: '30px 100px',
    [theme.breakpoints.down('md')]: {
      padding: '30px 20px',
    },
  },
  image: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
    '& img': {
      width: '100%',
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        maxHeight: 200,
      },
    },
  },
  bigAvatar: {
    marginRight: 10,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: '0 40px',
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  buttonIcon: {
    marginRight: 10,
    color: theme.palette.darkGrey.main,
    maxWidth: 28,
  },
  cartButtonIcon: {
    marginLeft: 10,
    color: theme.palette.darkGrey.main,
    maxWidth: 28,
  },
  rating: {
    color: theme.palette.red.main,
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
  independent: {
    fontSize: 14,
    '& > p': {
      marginBottom: 0,
      fontWeight: 'bold',
    },
    '& > p > a': {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('md')]: {
      margin: '10px auto 0',
      '& > div': {
        justifyContent: 'center',
      },
    },
  },
  ratingSection: {
    [theme.breakpoints.down('md')]: {
      '& > div': {
        justifyContent: 'flex-start',
      },
    },
  },
  largeRow: {
    marginTop: 15,
    marginBottom: 15,
  },
  buttons: {
    margin: '5px 0 0 0',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      marginBottom: 20,
    },
  },
  button: {
    width: '100%',
    color: theme.palette.black.main,
    borderWidth: 2,
    '&:hover': {
      background: theme.palette.white.main,
      borderWidth: 2,
    },
  },
  buttonSelected: {
    width: '100%',
    color: theme.palette.black.main,
    borderWidth: 2,
    background: 'rgba(255, 197, 85, 0.1)',
    borderColor: 'rgba(255, 197, 85, 1)',
    '&:hover': {
      background: 'rgba(255, 197, 85, 0.1)',
      borderWidth: 2,
      borderColor: 'rgba(255, 197, 85, 1)',
    },
  },
  buttonCheckout: {
    width: '200px',
    margin: '3px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 15,
    },
  },
  buttonCheckoutSelected: {
    background: '#ffc555',
    color: theme.palette.black.main,
    borderWidth: 2,
    borderColor: '#ffc555',
    '&:hover': {
      background: '#ffc555',
      borderWidth: 2,
      borderColor: '#ffc555',
    },
  },
  formatButtons: {
    width: '100px',
    margin: '3px',
    padding: 10,
    [theme.breakpoints.down('md')]: {
      padding: '20px 10px',
    },
  },
  numReviews: {
    margin: '0 5px',
    fontSize: '12px',
  },
  rateThisBookLink: {
    margin: 0,
    fontSize: '12px',
    color: '#c04800',
  },
  recommendButtonCont: {
    margin: '10px 0 20px',
  },
  recommendButton: {
    width: '100%',
    color: theme.palette.black.main,
    borderWidth: 2,
    '&:hover': {
      background: theme.palette.white.main,
      borderWidth: 2,
    },
  },
  avatar: {
    margin: 10,
  },
  link: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '12px',
    color: theme.palette.darkOrange.main,
  },
  shareLink: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontFamily: 'Open Sans',
    fontSize: '12px',
    color: theme.palette.darkOrange.main,
    verticalAlign: 'super',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  shareLinkIcon: {
    width: 22,
  },
  autherLink: {
    border: 'none',
    background: 'none',
    color: theme.palette.black.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  shareGroupBox: {
    marginLeft: '100px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  subtitle: {
    color: '#383e41',
  },
  authors: {
    fontSize: '12px',
  },
  author: {
    display: 'inline-block',
    paddingRight: '5px',
    fontSize: '12px',
  },
  smallText: {
    fontSize: '12px',
  },
  points: {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#c04800',
    '& > span': {
      color: '#000000',
    },
    '& svg': {
      marginBottom: '-5px',
      color: 'rgb(100, 141, 174)',
    },
  },
}));

function SummaryContentTitle({ book, callBackTab }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const deviceWidth = useTheme();
  const desktopView = useMediaQuery(deviceWidth.breakpoints.up('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShareButtonClick = () => {
    handleClickOpen();
  };

  const handleTab = () => {
    if (callBackTab) {
      callBackTab('ratings');
      setTimeout(
        window.scrollTo({
          behavior: 'smooth',
          top: document.body.scrollHeight,
        }),
        100,
      );
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Box fontSize="28px" fontWeight="fontWeightBold">
          {book.title}
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.subtitle}>
        <Box fontSize="24px" fontWeight="fontWeightBold">
          {book.subtitle}
        </Box>
      </Grid>
      <Grid item xs={12} className={clsx(classes.smallRow, classes.authors)}>
        By{' '}
        {get(book, 'contributors').map(author => (
          <Box className={classes.author}>
            <Link
              className={classes.link}
              to={`/books?q=${author.displayName}`}
            >
              {author.displayName}
            </Link>
          </Box>
        ))}
      </Grid>
      <Grid
        item
        sm={12}
        xs={12}
        className={clsx(classes.smallRow, classes.ratingSection)}
      >
        <AlignedItems
          items={[
            <Rating
              key="rating"
              name="readRating"
              value={book.rating}
              readOnly
              icon={<StarIcon className={classes.rating} />}
              emptyIcon={<StarBorderIcon className={classes.rating} />}
            />,
            <Box key="box" className={classes.numReviews}>
              {`${book.numRatings} ${pluralizeIfNecessary(
                'review',
                book.numRatings,
              )} |`}
            </Box>,
            <ButtonLink
              key="link"
              onClick={handleTab}
              className={classes.rateThisBookLink}
            >
              Rate this book
            </ButtonLink>,
            // <Box key="shareGroupBox" className={classes.shareGroupBox}>
            //   <img
            //     key="img"
            //     alt="share"
            //     src="/img/book-share-link.png"
            //     className={classes.shareLinkIcon}
            //   />
            //   <button
            //     key="share"
            //     type="submit"
            //     className={classes.shareLink}
            //     onClick={handleShareButtonClick}
            //   >
            //     Share
            //   </button>
            // </Box>,
          ]}
        />
      </Grid>
      {/* {desktopView ? (
        <Grid item sm={6} xs={12} className={classes.smallRow}>
          <AlignedItems
            items={[
              <img
                key="img"
                alt="recommend"
                src="/img/recommend.svg"
                className={classes.buttonIcon}
              />,
              <Box key="box">{`${book.recommendations} fans recommending`}</Box>,
            ]}
          />
        </Grid>
      ) : (
        ''
      )} */}
      <BookDetailShare open={open} handleClose={handleClose} book={book} />
    </>
  );
}

SummaryContentTitle.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
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
  callBack: PropTypes.func,
  callBackTab: PropTypes.func,
};

SummaryContentTitle.defaultProps = {
  callBack: undefined,
  callBackTab: undefined,
};

function BookAuthorAvatars({ authors, profiles }) {
  const classes = useStyles();
  const fullAuthors = authors.map(author => {
    const profile = find(profiles, { id: author.profileId });
    return { ...author, ...profile };
  });

  return (
    <>
      {fullAuthors.map((author, key) => (
        <Box
          key={key}
          display="flex"
          alignItems="center"
          justifyContent={authors.length > 1 ? 'flex-start' : 'center'}
        >
          <Avatar
            alt={author.displayName}
            src={
              getResizedImageWithCheck(author.avatar, 250) ||
              generateFallbackAvatar(author.displayName)
            }
            className={classes.bigAvatar}
          />
          {get(author, 'profileId') ? (
            <Link
              to={`/fans/browse/authors/${author.profileId}`}
              className={classes.link}
            >
              {author.displayName}
            </Link>
          ) : (
            <span className={classes.author}> {author.displayName}</span>
          )}
        </Box>
      ))}
    </>
  );
}

BookAuthorAvatars.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string,
      creator: PropTypes.shape({
        avatarUrlKey: PropTypes.string,
      }),
      id: PropTypes.number,
    }),
  ).isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
    }),
  ).isRequired,
};

const readershipAdStyles = makeStyles(theme => ({
  adcontainer: {
    background: '#FFF9F2',
    padding: '30px',
    marginTop: '20px',
  },
  title: {
    marginTop: 0,
  },
  body: {
    margin: '15px 0',
    lineHeight: '1.3',
  },
  subtitle: {
    color: 'black',
  },
  buttonPrimary: {
    display: 'block',
    margin: '30px 0',
  },
  buttonSecondary: {
    display: 'block',
    padding: 0,
    margin: 0,
    background: 'transparent',
    fontSize: '14px',
    fontWeight: 'normal',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& span span': {
      color: '#c04800',
      textDecoration: 'underline',
    },
  },
  buttonIcon: {
    marginRight: 10,
    color: theme.palette.darkGrey.main,
    maxWidth: 28,
  },
  recommendButton: {
    color: theme.palette.black.main,
    borderWidth: 2,
    '&:hover': {
      background: 'transparent',
      borderWidth: 2,
    },
  },
}));

function ReadershipAd({ onOpenModal }) {
  const classes = readershipAdStyles();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div className={classes.adcontainer}>
      <h2 className={classes.title}>Already read and loved this book?</h2>
      <div className={classes.body}>
        At Fanship, we want to help readers discover the great books they might
        not otherwise get to hear about. Click on the “Recommend” button to send
        a personal recommendation to anybody you think will love this book as
        much as you. Your personal seal of approval makes a difference, and your
        recommendations can earn you rewards.
      </div>
      <h3 className={classes.subtitle}>
        For every recommendation that results in a sale you earn 100 points!
      </h3>
      {isAuthenticated ? (
        <Button
          variant="outlined"
          color="primary"
          className={classes.recommendButton}
          onClick={onOpenModal}
        >
          <img
            alt="recommend"
            src="/img/recommend.svg"
            className={classes.buttonIcon}
          />
          RECOMMEND
        </Button>
      ) : (
        <>
          <Button
            color="primary"
            variant="contained"
            className={classes.buttonPrimary}
            onClick={() => {
              ReactGA.event({
                category: 'User',
                action: 'Clicked Join Fanship',
              });
              loginWithRedirect();
            }}
          >
            Create an account to get started
          </Button>
          <Button
            className={classes.buttonSecondary}
            onClick={() => {
              ReactGA.event({
                category: 'User',
                action: 'Clicked Log in',
              });
              loginWithRedirect();
            }}
          >
            Already have an account? <span>Sign In</span>
          </Button>
        </>
      )}
    </div>
  );
}

function SummaryContent({ book, desktopView, onOpenModal }) {
  const { description } = book;
  const classes = useStyles();
  const { addToCart } = useCart();
  const [readMore, setReadMore] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  function handleReadMore() {
    setReadMore(isreadMore => !isreadMore);
  }
  const handleAssetSelection = asset => {
    setSelectedAsset(asset);
  };
  const BookFormatButtons = () => (
    <>
      {book.assets.map((asset, key) => (
        <Button
          variant="outlined"
          color="primary"
          className={
            selectedAsset === asset
              ? clsx(classes.buttonSelected, classes.formatButtons)
              : clsx(classes.button, classes.formatButtons)
          }
          onClick={() => handleAssetSelection(asset)}
          key={key}
        >
          {asset.format}
        </Button>
      ))}
      <Button
        variant="outlined"
        color="primary"
        className={
          selectedAsset
            ? clsx(classes.buttonCheckout, classes.buttonCheckoutSelected)
            : clsx(classes.buttonCheckout, classes.button)
        }
        onClick={() => addToCart(book, selectedAsset)}
        disabled={selectedAsset ? false : true}
      >
        Add to cart <ShoppingCartIcon className={classes.cartButtonIcon} />
      </Button>
    </>
  );

  return desktopView ? (
    <Grid container justify="space-between">
      <Grid item xs={12} className={classes.largeRow}>
        <Box component="div" className={classes.section}>
          {readMore ? (
            <div>
              <Typography variant="subtitle1">
                {`${description} `}
                <button
                  type="submit"
                  className={classes.link}
                  onClick={() => handleReadMore()}
                >
                  Read Less
                </button>
              </Typography>
            </div>
          ) : (
            <div>
              <Typography variant="subtitle1">
                {description.split('', 200)}
                {'... '}
                <button
                  type="submit"
                  className={classes.link}
                  onClick={() => handleReadMore()}
                >
                  Read More
                </button>
              </Typography>
            </div>
          )}
        </Box>
      </Grid>
      <Grid item sm={2} />
      <Grid item xs={12} className={classes.largeRow}>
        Price
        <Box fontSize="30px" fontWeight="fontWeightBold">
          {formatCurrency(book.price)}{' '}
          <span className={classes.points}>
            <span>or</span> {CADtoRewardsPoints(book.price)} points{' '}
            <Link to="/faq">
              <HelpIcon />
            </Link>
          </span>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box component="div" className={classes.largeRow} textAlign="left">
          <strong>Select format to purchase</strong>
        </Box>
      </Grid>
      <Grid xs={12} className={classes.buttons}>
        <BookFormatButtons />
      </Grid>
      <Grid item xs={12} className={classes.smallRow}>
        <p className={classes.smallText}>
          After check-out, your selected format will be available to download
          and you’ll earn 50 reward points.
        </p>
      </Grid>
      <Grid item xs={12} className={classes.independent}>
        <p>
          Prefer to read it in print? Find your local{' '}
          <a
            target="_blank"
            href="https://www.bookmanager.com/tbm/?q=h.findastore"
          >
            independent bookstore
          </a>{' '}
          here.
        </p>
        <p>
          You can still come back to Fanship to earn reward points by
          recommending this book.
        </p>
      </Grid>
      <ReadershipAd onOpenModal={onOpenModal} />
    </Grid>
  ) : (
    <Grid container justify="space-between">
      <Grid item xs={12} className={classes.largeRow}>
        Price
        <Box fontSize="30px" fontWeight="fontWeightBold">
          {formatCurrency(book.price)}{' '}
          <span className={classes.points}>
            <span>or</span> {CADtoRewardsPoints(book.price)} points{' '}
            <Link to="/faq">
              <HelpIcon />
            </Link>
          </span>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box component="div" className={classes.largeRow} textAlign="left">
          <strong>Select format to purchase</strong>
        </Box>
      </Grid>
      <Grid
        item
        md={book.assets.length > 1 ? 12 : 4}
        xs={12}
        className={classes.buttons}
      >
        <BookFormatButtons />
      </Grid>
      <Grid item sm={2} />
      {desktopView ? (
        ''
      ) : (
        <Grid item xs={12}>
          <BookAuthorAvatars
            authors={get(book, 'contributors') || []}
            profiles={get(book, 'profiles') || []}
          />
        </Grid>
      )}
      <Grid item xs={12} className={classes.largeRow}>
        <Box component="div" className={classes.section}>
          {description}
        </Box>
      </Grid>
    </Grid>
  );
}

SummaryContent.propTypes = {
  book: PropTypes.shape({
    assets: PropTypes.arrayOf(
      PropTypes.shape({
        format: PropTypes.string,
      }),
    ),
  }).isRequired,
  desktopView: PropTypes.bool.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default function BookDetailSummary({
  book,
  onOpenModal,
  callBack,
  callBackTab,
}) {
  const classes = useStyles();
  const deviceWidth = useTheme();
  const desktopView = useMediaQuery(deviceWidth.breakpoints.up('md'));

  return (
    <Grid container className={classes.container}>
      <Grid item md={3} xs={12}>
        {desktopView ? (
          ''
        ) : (
          <SummaryContentTitle book={book} callBackTab={callBackTab} />
        )}
        <Grid item className={classes.image} xs={12}>
          <img
            alt={book.title}
            src={getResizedImageWithCheck(book.coverUrl, 600)}
          />
          <Grid container>
            {/* <Grid item sm={12} xs={12} className={classes.smallRow}>
              <AlignedItems
                items={[
                  <img
                    key="img"
                    alt="recommend"
                    src="/img/recommend.svg"
                    className={classes.buttonIcon}
                  />,
                  <Box key="box">{`${book.recommendations} fans recommending`}</Box>,
                ]}
              />
            </Grid> */}
            <Grid item sm={12} xs={12} className={classes.recommendButtonCont}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.recommendButton}
                onClick={onOpenModal}
              >
                <img
                  alt="recommend"
                  src="/img/recommend.svg"
                  className={classes.buttonIcon}
                />
                RECOMMEND
              </Button>
            </Grid>
            {desktopView ? (
              <Grid item xs={12}>
                <BookAuthorAvatars
                  authors={get(book, 'contributors') || []}
                  profiles={get(book, 'profiles') || []}
                  callBack={callBack}
                />
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.content} md={9} sm={12}>
        {desktopView ? (
          <SummaryContentTitle
            book={book}
            callBack={callBack}
            callBackTab={callBackTab}
            onOpenModal={onOpenModal}
          />
        ) : (
          ''
        )}
        <SummaryContent
          book={book}
          onOpenModal={onOpenModal}
          desktopView={desktopView}
        />
      </Grid>
    </Grid>
  );
}

BookDetailSummary.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    coverUrl: PropTypes.string,
    recommendations: PropTypes.number,
    contributors: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
  callBackTab: PropTypes.func,
};

BookDetailSummary.defaultProps = {
  callBackTab: undefined,
};
