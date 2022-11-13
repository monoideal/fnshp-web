import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import qs from 'qs';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

import { useApi } from 'api/';
import { useAuth0 } from "@auth0/auth0-react";
import BookDetailSummary from 'components/Fans/BookDetailSummary';
import BookDetailDescription from 'components/Fans/BookDetailDescription';
import BookDetailsRatings from 'components/Fans/BookDetailsRatings';
import RecommendBook from 'components/Fans/RecommendBook';
import RecommendAdvert from 'components/Fans/RecommendAdvert';
import Report from 'components/Fans/Report';

const useStyles = makeStyles(theme => ({
  breadcrumbContainer: {
    background: theme.palette.grey.main,
    fontSize: 14,
    paddingLeft: 30,
  },
  breadcrumb: {
    padding: '10px 5px',
  },
  tabsContainer: {
    borderBottom: `solid 1px ${theme.palette.grey.main}`,
  },
  tab: {
    padding: '15px 25px',
    color: theme.palette.darkGrey.main,
    fontSize: '22px',
    fontWeight: 'light',
    cursor: 'pointer',
  },
  selected: {
    borderBottom: `solid 2px ${theme.palette.darkOrange.main}`,
    color: theme.palette.black.main,
    fontWeight: 'regular',
  },
  hidden: {
    display: 'none',
  },
}));

function Breadcrumbs({ title }) {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="flex-start"
      className={classes.breadcrumbContainer}
    >
      <Grid item className={classes.breadcrumb}>
        <Link to="/">Home</Link>
      </Grid>
      <Grid item className={classes.breadcrumb}>
        /
      </Grid>
      <Grid item className={classes.breadcrumb}>
        <Link to="/books">Books</Link>
      </Grid>
      <Grid item className={classes.breadcrumb}>
        /
      </Grid>
      <Grid item className={classes.breadcrumb}>
        {title}
      </Grid>
    </Grid>
  );
}

Breadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
};

function Tabs({ selectedTab, setSelectedTab }) {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.tabsContainer}>
      <Grid
        item
        onClick={() => setSelectedTab('Details')}
        className={clsx(
          classes.tab,
          selectedTab === 'Details' && classes.selected,
        )}
      >
        <Box>Details</Box>
      </Grid>
      <Grid item className={classes.spaceTab} />
      <Grid
        item
        onClick={() => setSelectedTab('ratings')}
        className={clsx(
          classes.tab,
          selectedTab === 'ratings' && classes.selected,
        )}
      >
        <Box>Ratings</Box>
      </Grid>
    </Grid>
  );
}

Tabs.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
};

function BookDetail({ match }) {
  const api = useApi();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();

  const { rid } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Details');
  const [showRecommendBook, setShowRecommendBook] = useState(false);

  const {
    params: { id },
  } = match;
  const classes = useStyles();

  async function initialize() {
    try {
      const tempbook = await api.fetchBook(id);
      if (tempbook.subject) {
        tempbook.subject = tempbook.subject.split(';');
      } else {
        tempbook.subject = null;
      }
      setBook(tempbook);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    initialize();
  }, [id, api]);

  function handleOpenModal() {
    if (isAuthenticated === false) {
      loginWithRedirect();
      return;
    }
    return setShowRecommendBook(true);
  }

  if (isLoading) return 'Loading...';

  function getSelectedTab(value) {
    setSelectedTab(value);
  }
  return (
    <>
      <RecommendBook
        book={book}
        show={showRecommendBook}
        onCloseModal={() => setShowRecommendBook(false)}
      />
      <Breadcrumbs title={book.title} />
      {rid && <RecommendAdvert book={book} />}
      <BookDetailSummary
        book={book}
        onOpenModal={handleOpenModal}
        onCloseModal={() => setShowRecommendBook(false)}
        callBackTab={getSelectedTab}
      />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className={clsx(selectedTab !== 'Details' && classes.hidden)}>
        <BookDetailDescription book={book} />
      </div>
      <div className={clsx(selectedTab !== 'ratings' && classes.hidden)}>
        <BookDetailsRatings book={book} callBackRating={initialize} />
      </div>
      <Grid container justify="center">
        <Grid item xs={4}>
          <Report />
        </Grid>
      </Grid>
    </>
  );
}

BookDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default withRouter(BookDetail);
