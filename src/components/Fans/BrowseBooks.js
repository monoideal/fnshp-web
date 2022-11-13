import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { categories } from 'util/featuredBooks';

import BrowseHeader from 'components/Fans/BrowseHeader';
import { Carousel } from 'react-responsive-carousel';
import BrowseFilterList from 'components/Fans/BrowseFilterList';
import RecommendBook from 'components/Fans/RecommendBook';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  content: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
    '& h2': {
      width: '100%',
      fontSize: 18,
      color: '#361550',
      [theme.breakpoints.up('md')]: {
        fontSize: 18,
      },
    },
  },
  filters: {
    [theme.breakpoints.up('md')]: {
      width: '20%',
      overflow: 'hidden',
    },
  },
  carouselCont: {
    height: 255,
    position: 'relative',
    margin: `${theme.spacing(2)}px 0`,
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing(2)}px 0`,
      padding: '0 40px',
      boxSizing: 'border-box',
    },
    '& .carousel .slide': {
      height: 255,
      backgroundColor: 'transparent',
      padding: '0 15px',
      textAlign: 'left',
    },
    '& p': {
      width: '100%',
      margin: `${theme.spacing(5)}px 0 ${theme.spacing(7)}px`,
      fontSize: 16,
      textAlign: 'center',
      [theme.breakpoints.up('md')]: {
        fontSize: 21,
        textAlign: 'center',
      },
      fontWeight: 'normal',
      [theme.breakpoints.down('md')]: {
        marginBottom: 0,
      },
    },
  },
  continueBtn: {
    margin: `${theme.spacing(3)}px 0`,
    textAlign: 'center',
    marginTop: '-100px',
    [theme.breakpoints.up('md')]: {
      marginTop: '0px',
    },
    '& > button': {
      transition: 'visibility 0s linear 0s, opacity 300ms',
    },
  },
  categoryTitle: {
    display: 'flex',
    alignItems: 'baseline',
    margin: `0 ${theme.spacing(2)}px`,
    '& > div': {
      width: 70,
      margin: 0,
      fontSize: 12,
      color: '#361550',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      [theme.breakpoints.up('md')]: {
        width: 60,
      },
    },
  },
  book: {
    '& > a > img': {
      width: 120,
      height: 190,
      [theme.breakpoints.up('md')]: {
        width: 75,
        height: 175,
      },
    },
    '& a': {
      display: 'block',
    },
  },
  bookTitle: {
    margin: '5px 0',
    fontWeight: 'bold',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: 14,
  },
  bookAuthor: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
    fontSize: 12,
  },
  slideBtn: {
    width: 16,
    '&:focus': {
      outline: 'none',
    },
  },
  recommendButton: {
    width: '100%',
    marginTop: 5,
    color: '#000',
    fontWeight: 'bold',
    background: '#FFF',
    fontSize: 11,
    [theme.breakpoints.up('md')]: {
      fontSize: 11,
    },
  },
  mobileBooksView: {
    display: 'flex',
    width: '100%',
    height: 280,
    overflow: 'auto',
    '& > div': {
      width: 120,
      padding: '0 15px',
      whiteSpace: 'nowrap',
    },
  },
  mobileButtons: {
    marginTop: 10,
    display: 'flex',
    '& > button': {
      width: '100%',
      margin: '0 14px',
      border: '1px solid #000',
    },
  },
  viewAll: {
    height: 250,
    width: 120,
    display: 'flex',
    padding: 15,
    background: '#eee',
    borderRadius: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    whiteSpace: 'normal',
    [theme.breakpoints.up('md')]: {
      height: 320,
      width: 150,
    },
    '&:hover': {
      background: '#bbb',
    },
    '& > img': {
      margin: '10px auto 0',
      width: '50px !important',
    },
  },
}));

const Book = ({ book }) => {
  const classes = useStyles();
  const [showRecommendBook, setShowRecommendBook] = useState(false);
  const { loginWithRedirect, isAuthenticated } = useAuth0();

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
      action: 'Clicked recommend button in onboarding',
    });
    setShowRecommendBook(true);
  }

  return (
    <div className={classes.book}>
      <Link to={`/book/${book.id}`}>
        <img src={book.coverUrl} alt={book.title} />
        <div className={classes.bookTitle}>{book.title}</div>
        <div className={classes.bookAuthor}>by {book.author}</div>
      </Link>
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
            style={{ width: 20, marginRight: 5 }}
          />
          RECOMMEND
        </Button>
      </Box>
      <RecommendBook
        book={book}
        show={showRecommendBook}
        onCloseModal={() => setShowRecommendBook(false)}
      />
    </div>
  );
};

const Slider = ({ categoryName, booksPerPage }) => {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const [currentSlide, setCurrentSlide] = useState(0);
  const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    width: desktopView ? 50 : 30,
    padding: 0,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
  };
  const allBookUrl = categories.find(category => category.name === categoryName)
    .search;
  return (
    <>
      <div className={classes.categoryTitle}>
        <h2>{categoryName}</h2>
        <div>
          <Link to={`/books/${allBookUrl}`}>View all</Link>
        </div>
      </div>
      {desktopView && (
        <>
          <div className={classes.carouselCont}>
            <button
              type="button"
              onClick={() => setCurrentSlide(currentSlide - booksPerPage)}
              style={{ ...arrowStyles, left: 0 }}
              className={classes.slideBtn}
            >
              <img
                src="/img/purple-chevron.png"
                width={84}
                alt="Previous Slide"
                className={classes.slideBtn}
                style={{ transform: 'rotate(180deg)' }}
              />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide(currentSlide + booksPerPage)}
              style={{ ...arrowStyles, right: 0 }}
              className={classes.slideBtn}
            >
              <img
                src="/img/purple-chevron.png"
                width={84}
                alt="Next Slide"
                className={classes.slideBtn}
              />
            </button>
            <Carousel
              centerMode
              centerSlidePercentage={100 / booksPerPage}
              swipeable={false}
              showStatus={false}
              showIndicators={false}
              showArrows={false}
              selectedItem={currentSlide}
              showThumbs={false}
              onChange={index => setCurrentSlide(index)}
            >
              {categories
                .find(category => category.name === categoryName)
                .books.map(book => (
                  <Book book={book} key={book.id} />
                ))}
            </Carousel>
          </div>
        </>
      )}
      {!desktopView && (
        <div className={classes.mobileBooksView}>
          {categories
            .find(book => book.name === categoryName)
            .books.map(book => (
              <Book book={book} key={book.id} />
            ))}
        </div>
      )}
    </>
  );
};

const BrowseBooks = () => {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const booksPerPage = desktopView ? 5 : 2;
  const [mobilFilterDrawer, setMobileFilterDrawer] = useState(false);
  const [mobileFilterDrawerVarient, setMobileFilterDrawerVarient] = useState(
    'temporary',
  );

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

  return (
    <>
      <BrowseHeader isPopularBooks />
      <div className={classes.root}>
        {!desktopView && (
          <div className={classes.mobileButtons}>
            <Button onClick={() => setMobileFilterDrawer(true)}>
              Browse by
            </Button>
          </div>
        )}
        <div className={classes.filters}>
          <BrowseFilterList
            varient={mobileFilterDrawerVarient}
            open={mobilFilterDrawer}
            setOpen={setMobileFilterDrawer}
            selectedPublisher=""
            onSelectPublisher={() => {}}
          />
        </div>
        <div className={classes.content}>
          <Slider categoryName="Literary Fiction" booksPerPage={booksPerPage} />
          <Slider
            categoryName="Mystery, Thriller & Suspense"
            booksPerPage={booksPerPage}
          />
          <Slider
            categoryName="Science Fiction & Fantasy"
            booksPerPage={booksPerPage}
          />
          <Slider
            categoryName="Biography & Memoirs"
            booksPerPage={booksPerPage}
          />
          <Slider
            categoryName="General Nonfiction"
            booksPerPage={booksPerPage}
          />
          <Slider
            categoryName="Comics & Graphic Novels"
            booksPerPage={booksPerPage}
          />
          <Slider categoryName="Young Adult" booksPerPage={booksPerPage} />
          <Slider
            categoryName="Literary Criticism & Poetry"
            booksPerPage={booksPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default BrowseBooks;
