import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { find } from 'lodash';

import Applaud from 'components/Fans/Applaud';
import ButtonLink from 'components/shared/ButtonLink';
import {
  formatCurrency,
  priceToCents,
  pointsToCents,
  getResizedImage,
} from 'util/helpers';
import { useCart } from 'components/Fans/Cart';
import { AppContext } from 'components/AppContext';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '40px',
    [theme.breakpoints.down('md')]: {
      margin: '40px 10px',
    },
  },
}));

const useHeaderStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.grey.main,
    padding: '15px 45px',
  },
}));

const useRowStyles = makeStyles(theme => ({
  container: {
    padding: '45px',
    borderLeft: `solid 1px ${theme.palette.grey.main}`,
    borderRight: `solid 1px ${theme.palette.grey.main}`,
    borderBottom: `solid 1px ${theme.palette.grey.main}`,
    '&:nth-child(2n + 1)': {
      background: theme.palette.lightGrey.main,
    },
    [theme.breakpoints.down('md')]: {
      padding: '25px 5px',
      '&:first-child': {
        borderTop: `solid 1px ${theme.palette.grey.main}`,
      },
      '&:nth-child(2n)': {
        backgroundColor: theme.palette.lightGrey.main,
      },
      '&:nth-child(2n + 1)': {
        backgroundColor: '#fff',
      },
    },
  },
  image: {
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  descriptionContainer: {
    paddingLeft: '40px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 20,
    },
  },
  title: {
    marginBottom: '10px',
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
      position: 'relative',
    },
  },
  priceItem: {
    color: 'inherit',
    '&:hover': {
      textDecoration: 'none',
      cursor: 'default',
    },
  },
  subtotalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 20,
    },
  },
  appliedRewards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      marginBottom: 10,
    },
  },
  removeMobile: {
    paddingTop: 0,
    paddingBottom: 0,
    position: 'absolute',
    right: 0,
  },
  applaud: {
    marginTop: '10px',
  },
  applaudText: {
    margin: '10px 10px 10px 0px;',
    fontWeight: 'bold',
  },
}));

const bookShape = PropTypes.shape({});

function Header() {
  const classes = useHeaderStyles();

  return (
    <Box fontSize="12px" className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          CART ITEMS
        </Grid>
      </Grid>
    </Box>
  );
}

function Image({ previewImageUrl }) {
  const classes = useRowStyles();
  return (
    <img className={classes.image} alt="book-preview" src={previewImageUrl} />
  );
}

Image.propTypes = {
  previewImageUrl: PropTypes.string.isRequired,
};

function ApplyRewards({ points, price, onClick }) {
  if (pointsToCents(points) >= priceToCents(price)) {
    return <ButtonLink onClick={onClick}>Apply Rewards</ButtonLink>;
  }
  return <Box>Not enough points to redeem</Box>;
}

ApplyRewards.propTypes = {
  points: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

function AppliedRewards({ price }) {
  const classes = useRowStyles();
  return (
    <div className={classes.appliedRewards}>
      <Box component="span" fontWeight="fontWeightBold" fontSize="16px">
        {'Rewards applied'}
      </Box>
      <Box component="span" fontSize="16px">
        {formatCurrency(price)}
      </Box>
    </div>
  );
}

AppliedRewards.propTypes = {
  price: PropTypes.number.isRequired,
};

function Rewards({ book }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { discountCode, addDiscountCode } = useCart();
  const { fanshipUser } = React.useContext(AppContext);
  const points = fanshipUser?.fan?.points;

  async function handleClick() {
    setIsLoading(true);
    try {
      await addDiscountCode(book.id);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return 'Loading...';

  if (error) return error.message;

  if (discountCode && discountCode.bookId === book.id) {
    return <AppliedRewards price={book.price} />;
  }

  return (
    <ApplyRewards points={points} price={book.price} onClick={handleClick} />
  );
}

Rewards.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

function Description({ authors, book }) {
  const classes = useRowStyles();
  const { removeFromCart } = useCart();
  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={2}>
        <Image previewImageUrl={getResizedImage(book.coverUrl, 600)} />
      </Grid>
      <Grid item xs={8}>
        <Box
          className={classes.title}
          fontSize="18px"
          fontWeight="fontWeightBold"
        >
          {book.title}
        </Box>
        <Box fontSize="16px">
          {`by ${authors.map(a => a.displayName).join(', ')}`}
        </Box>
        <Box fontSize="16px">
          Format:
          <Box component="span" fontWeight="bold">{` ${book.assets
            .map(a => a.format)
            .join(', ')}`}</Box>
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <strong> {formatCurrency(book.price)} </strong>
          <IconButton onClick={() => removeFromCart(book.id)}>
            <CloseIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

Description.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    coverUrl: PropTypes.string,
    price: PropTypes.number,
    assets: PropTypes.number,
  }).isRequired,
  authors: PropTypes.arrayOf(bookShape).isRequired,
};

function Row({ book }) {
  const classes = useRowStyles();
  const fullContributors = book.contributors
    .filter(contributor => contributor.profileId)
    .map(contributor => {
      const profile = find(book.profiles, { id: contributor.profileId });
      return { ...contributor, ...profile };
    });

  return (
    <div className={classes.container}>
      <Description book={book} authors={fullContributors} />
      {fullContributors.some(a => a.userId) ? (
        <Grid container className={classes.applaud} spacing={3}>
          <Grid item xs={12} className={classes.applaudText}>
            Applaud the author
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={3}>
        {fullContributors
          .filter(
            author =>
              author.contributorType === 'AUTHOR' ||
              author.contributorType === 'ILLUSTRATOR',
          )
          .filter(author => author.profileId)
          .map(author => (
            <Applaud
              key={author.id}
              author={author}
              profileId={author.profileId}
              initialTip={book.tips ? book.tips[author.profileId] : 0}
              bookId={book.id}
              isPopup
            />
          ))}
      </Grid>
      <Box paddingTop={{ xs: 4 }}>
        <Rewards book={book} />
      </Box>
    </div>
  );
}

Row.propTypes = {
  book: bookShape.isRequired,
};

export default function ViewCartItems({ books }) {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  if (!books.length) {
    return 'Your shopping cart is empty';
  }

  return (
    <div className={classes.container}>
      {desktopView ? <Header /> : ''}
      {books.map(book => (
        <Row key={book.id} book={book} />
      ))}
    </div>
  );
}

ViewCartItems.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
};
