import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter, useParams } from 'react-router-dom';
// import ClearIcon from '@material-ui/icons/Clear';
import qs from 'qs';
import ReactGA from 'react-ga';
import { useApi } from 'api/';
import { useAuth0 } from '@auth0/auth0-react';
import { AppContext } from 'components/AppContext';
import { findCategory } from 'util/helpers';
import BrowseFilterList from 'components/Fans/BrowseFilterList';
import BrowseOrderBy from 'components/Fans/BrowseOrderBy';
import BrowseHeader from 'components/Fans/BrowseHeader';
import Book from 'components/Fans/Book';
import RecommendBook from 'components/Fans/RecommendBook';
import FullPageLoader from 'components/shared/FullPageLoader';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useQueryString from '../hooks/useQueryString';

const ITEMS_PER_PAGE = 12;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
  },
  bookContainer: {
    padding: '20px 30px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 20px 20px',
      fontSize: 17,
    },
  },
  resultText: {
    fontSize: 18,
    justifyContent: 'center',
    margin: '10px 0 20px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  mobileButtons: {
    marginTop: 10,
    display: 'flex',
    '& > button': {
      width: '50%',
      margin: '0 14px',
      border: '1px solid #000',
    },
    '& > button:first-child': {
      marginRight: 10,
    },
    '& > button:last-child': {
      marginLeft: 10,
    },
  },
  activeMobileState: {
    margin: '0 20px',
    fontSize: '13px',
    '& button': {
      display: 'inline',
      margin: '0 5px 5px 0',
      padding: '1px 20px 0 5px',
      backgroundColor: '#eee',
      minWidth: 0,
      fontSize: '14px',
      textTransform: 'none',
      maxWidth: 150,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    '& svg': {
      position: 'absolute',
      top: 5,
      right: 3,
      fontSize: 16,
    },
  },
  noResults: {
    backgroundColor: '#efefef',
    borderRadius: 10,
    padding: '30px 50px',
    maxWidth: 500,
    margin: '40px auto',
    fontSize: '18px',
    lineHeight: '1.5',
    [theme.breakpoints.down('sm')]: {
      margin: '20px',
      padding: '20px 30px',
      fontSize: '16px',
    },
  },
}));

function sortLookup(raw) {
  const orderBys = [
    { raw: 'datePublished desc', value: 'Latest Releases' },
    { raw: 'id desc', value: 'New on Fanship' },
    { raw: 'price asc', value: 'Price lowest to highest' },
    { raw: 'price desc', value: 'Price highest to lowest' },
    { raw: 'author_name asc', value: "Author's Last Name" },
  ];
  return orderBys.find(o => o.raw === raw).value;
}

function BrowseContainer({ location }) {
  const { categories } = React.useContext(AppContext);
  const { parent, child } = useParams();
  const category = findCategory(categories, parent, child);
  const categoryId = category ? category.id : null;
  const { q: searchString } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { profileId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const themeMedia = useTheme();
  const desktopView = useMediaQuery(themeMedia.breakpoints.up('md'));
  const tabletView = useMediaQuery(themeMedia.breakpoints.up('sm'));
  const [books, setBooks] = useState([]);
  // const [publisher, setPublisher] = useQueryString('publisher', '');
  const [orderBy, setOrderBy] = useQueryString('orderBy', 'datePublished desc');
  const [isLoading, setIsLoading] = useState(true);
  const [numColumns, setNumColumns] = useState(desktopView ? 3 : 2);
  const [showRecommendBook, setShowRecommendBook] = useState(false);
  const [bookToRecommend, setBookToRecommend] = useState({});
  const [page, setPage] = useQueryString('page', 1);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const [totalBooks, setTotalBooks] = useState(0);
  const [mobileOrderDrawer, setMobileOrderDrawer] = useState(false);
  const [mobilFilterDrawer, setMobileFilterDrawer] = useState(false);
  const [mobileFilterDrawerVarient, setMobileFilterDrawerVarient] = useState(
    'temporary',
  );
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const api = useApi();
  const classes = useStyles();

  useEffect(() => {
    setNumColumns(tabletView ? 3 : 2);
  }, [tabletView]);

  useEffect(() => {
    setIsLoading(true);
    async function initialize() {
      try {
        const result = await api.fetchBooks({
          profileId,
          searchString,
          page,
          itemsPerPage,
          category: categoryId,
          // publisher,
          orderBy,
        });
        setBooks(result.books);
        setTotalBooks(result.totalBooks);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, [location, api, searchString, page, categoryId, orderBy]); // publisher

  useEffect(() => {
    const setupDrawer = () => {
      if (!desktopView) {
        setMobileFilterDrawerVarient('temporary');
      } else {
        setMobileFilterDrawerVarient('permanent');
      }
    };
    setupDrawer();
  }, [desktopView]);

  useEffect(() => {
    const closeDrawers = () => {
      setMobileFilterDrawer(false);
      setMobileOrderDrawer(false);
    };
    closeDrawers();
  }, [categoryId, orderBy]); // publisher

  // function handleSelectPublisher(selected) {
  //   if (selected === publisher) {
  //     setPublisher('');
  //   } else {
  //     setPublisher(selected);
  //   }
  //   setPage(1);
  // }

  function handleOrderBy(event) {
    const value = event.target ? event.target.value : event;
    setOrderBy(value);
    setPage(1);
  }

  function handleClickRecommendBook(book) {
    if (isAuthenticated === false) {
      ReactGA.event({
        category: 'Recommend',
        action: 'Clicked button, but logged out',
      });
      loginWithRedirect();
      return;
    }
    setShowRecommendBook(true);
    setBookToRecommend(book);
  }

  function handlePageChange(event, value) {
    setPage(value);
  }

  return (
    <>
      <BrowseHeader category={category} />
      {isLoading ? <FullPageLoader /> : null}
      <RecommendBook
        book={bookToRecommend}
        show={showRecommendBook}
        onCloseModal={() => setShowRecommendBook(false)}
      />
      <div className={classes.root}>
        {isLoading && 'Loading...'}
        {!isLoading && (
          <>
            {!desktopView ? (
              <div className={classes.mobileButtons}>
                <Button onClick={() => setMobileFilterDrawer(true)}>
                  Browse by
                </Button>
                <Button onClick={() => setMobileOrderDrawer(true)}>
                  Order by
                </Button>
              </div>
            ) : (
              ''
            )}

            <BrowseFilterList
              varient={mobileFilterDrawerVarient}
              open={mobilFilterDrawer}
              setOpen={setMobileFilterDrawer}
              searchString={searchString}
              // selectedPublisher={publisher}
              // onSelectPublisher={handleSelectPublisher}
            />
            <BrowseOrderBy
              open={mobileOrderDrawer}
              setOpen={setMobileOrderDrawer}
              onOrderby={handleOrderBy}
              selectedOrderBy={orderBy}
            />
            <main className={classes.content}>
              {!desktopView ? (
                <div className={classes.activeMobileState}>
                  <div className={classes.sortedByText}>
                    Sorted by: {sortLookup(orderBy)}
                  </div>
                  {/* {publisher && (
                    <div className={classes.browseByText}>
                      Browse by:{' '}
                      {publisher ? (
                        <Button onClick={() => setPublisher('')}>
                          {publisher} <ClearIcon />
                        </Button>
                      ) : (
                        ''
                      )}
                    </div>
                  )} */}
                </div>
              ) : (
                ''
              )}
              <Grid container className={classes.resultText}>
                {searchString
                  ? `${totalBooks} results for '${searchString}'`
                  : `${totalBooks} results`}
              </Grid>
              {books.length === 0 ? (
                <div className={classes.noResults}>
                  <p>There is no product that matches the search criteria.</p>
                  <ul>
                    <li>Try reducing the number of filters selected.</li>
                    <li>Search for a different keyword</li>
                  </ul>
                </div>
              ) : (
                <>
                  <Grid
                    container
                    justify={numColumns > 1 ? 'space-between' : 'center'}
                  >
                    {books.map(book => (
                      <Grid
                        item
                        key={book.id}
                        xs={Math.floor(12 / numColumns)}
                        className={classes.bookContainer}
                        style={{
                          textAlign: numColumns > 1 ? 'left' : 'center',
                        }}
                      >
                        <Book
                          book={book}
                          onClickRecommend={() =>
                            handleClickRecommendBook(book)
                          }
                          columnCount={numColumns}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Pagination
                    className={classes.pagination}
                    count={Math.ceil(totalBooks / itemsPerPage)}
                    shape="rounded"
                    size="large"
                    page={parseInt(page, 10)}
                    onChange={handlePageChange}
                  />
                </>
              )}
            </main>
          </>
        )}
      </div>
    </>
  );
}

BrowseContainer.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default withRouter(BrowseContainer);
