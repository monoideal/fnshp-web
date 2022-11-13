import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

import { formatCurrency, getResizedImage } from 'util/helpers';
import Button from 'components/shared/Button';
import RecommendBook from 'components/Fans/RecommendBook';
import { useAuth0 } from "@auth0/auth0-react";
import history from 'lib/history';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  title: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  authors: {
    fontSize: '14px',
    marginTop: '5px',
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: '10px',
    color: '#696969',
    [theme.breakpoints.down('md')]: {
      width: 20,
      marginRight: 5,
    },
  },
  button: {
    color: theme.palette.black.main,
    width: '100%',
    marginTop: '10px',
    borderWidth: '2px',
    '&:hover': {
      borderWidth: '2px',
      background: theme.palette.white.main,
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  bookDescription: {
    margin: '10px auto 0',
    '& > div': {
      display: 'inline-flex',
      alignItems: 'center',
    },
  },
  recommendButton: {
    width: '100%',
    color: theme.palette.black.main,
    borderWidth: 2,
    borderColor: 'rgba(255,145,0,.5)',
    '&:hover': {
      background: 'rgba(255,145,0,.1)',
      borderWidth: 2,
      borderColor: 'rgba(255,145,0,1)',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  buyButton: {
    display: 'flex',
    width: '100%',
    color: theme.palette.black.main,
    padding: '5px 0',
    borderWidth: 2,
    '& > span': {
      display: 'flex',
      '& > div:first-child': {
        borderRight: '1px solid rgba(255, 197, 85, 0.5)',
      },
      '& > div': {
        width: '50%',
      },
      '& svg': {
        marginBottom: '-5px',
      },
    },
    '&:hover': {
      background: 'rgba(255, 197, 85, 0.1)',
      borderWidth: 2,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  shoppingCart: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '1.3rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.1rem',
    },
  },
  cursorPointer: {
    cursor: 'pointer',
  },
}));

export default function Book({ book, columnCount }) {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const [imageWidth, setImageWidth] = useState(0);
  const [showRecommendBook, setShowRecommendBook] = useState(false);

  // images are not guaranteed to have the same aspect ratio. so we set width to 100%,
  // and enforce desired aspect ratio by setting height explicitly and dynamically
  const imageRef = node => {
    if (node !== null) {
      setImageWidth(node.getBoundingClientRect().width);
    }
  };
  function handleOpenModal() {
    if (isAuthenticated === false) {
      ReactGA.event({
        category: 'Recommend',
        action: 'Clicked button, but logged out',
      });
      loginWithRedirect();
      return;
    }
    ReactGA.event({
      category: 'Recommend',
      action: 'Clicked recommend button',
    });
    setShowRecommendBook(true);
  }

  function handleBuy() {
    history.push(`/book/${book.id}`);
  }

  return (
    <Grid
      container
      direction="column"
      alignItems={columnCount > 1 ? 'stretch' : 'center'}
    >
      <Grid item xs={columnCount > 1 ? 12 : 6} md={12}>
        <Link to={`/book/${book.id}`}>
          <img
            ref={imageRef}
            alt={book.title}
            src={getResizedImage(book.coverUrl, 600)}
            className={classes.image}
            style={{
              height: columnCount > 1 ? imageWidth * 1.555 : 'auto',
            }}
          />
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Link to={`/book/${book.id}`}>
          <Box classes={{ root: clsx(classes.text, classes.title) }}>
            {book.title}
          </Box>
        </Link>
        <Box classes={{ root: clsx(classes.text, classes.authors) }}>
          {`by ${book.authors.map(a => a.displayName).join(', ')}`}
        </Box>
      </Grid>
      {columnCount > 1 ? null : (
        <>
          <Grid item xs={12}>
            {book.description && (
              <Box className={classes.bookDescription}>
                {`${book.description.substring(0, 100)}...`}
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.bookDescription}>
              {`${formatCurrency(book.price)}`}
            </Box>
          </Grid>
        </>
      )}

      <Grid
        item
        xs={12}
        style={{
          width: columnCount > 1 ? 'auto' : '50%',
        }}
      >
        <Box fontWeight="bold" className={classes.bookDescription}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.recommendButton}
            onClick={handleOpenModal}
          >
            <img
              alt="recommend"
              src="/img/recommend.svg"
              className={classes.buttonIcon}
            />
            RECOMMEND
          </Button>
        </Box>
      </Grid>
      <RecommendBook
        book={book}
        show={showRecommendBook}
        onCloseModal={() => setShowRecommendBook(false)}
      />
      <Grid
        item
        xs={12}
        style={{
          width: columnCount > 1 ? 'auto' : '50%',
        }}
      >
        <Box fontWeight="bold" className={classes.bookDescription}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buyButton}
            onClick={handleBuy}
          >
            <div>
              <ShoppingCartIcon className={classes.shoppingCart} /> BUY
            </div>
            <div>{formatCurrency(book.price)}</div>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    isbn: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.object),
    coverUrl: PropTypes.string,
    price: PropTypes.number,
    recommendations: PropTypes.number,
  }).isRequired,
  columnCount: PropTypes.number.isRequired,
};
