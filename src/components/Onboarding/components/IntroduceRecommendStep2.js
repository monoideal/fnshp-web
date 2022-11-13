import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { categories } from 'util/featuredBooks';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Discovery from 'components/Discovery';
import RecommendBook from 'components/Fans/RecommendBook';
import PrimaryButton from 'components/shared/PrimaryButton';

const useStyles = makeStyles(theme => ({
  main: {
    padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    paddingTop: 0,
    maxWidth: 800,
    lineHeight: 1.6,
    color: '#333333',
    '& h2': {
      width: '100%',
      margin: `${theme.spacing(1)}px 0 0`,
      textAlign: 'center',
      fontSize: 24,
      [theme.breakpoints.up('md')]: {
        fontSize: 36,
      },
    },
    '& p': {
      width: '100%',
      fontSize: 16,
      textAlign: 'center',
      [theme.breakpoints.up('md')]: {
        fontSize: 21,
        textAlign: 'left',
      },
      fontWeight: 'normal',
      [theme.breakpoints.down('md')]: {
        marginBottom: 0,
      },
    },
    '& > div': {
      textAlign: 'center',
    },
  },
  carouselCont: {
    maxWidth: '100%',
    height: 320,
    position: 'relative',
    margin: `${theme.spacing(2)}px 0`,
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing(5)}px 0`,
    },
    '& .carousel .slide': {
      height: 320,
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
  chips: {
    textAlign: 'center',
  },
  chip: {
    display: 'inline-block',
    cursor: 'pointer',
    padding: '4px 7px',
    margin: 4,
    backgroundImage: 'linear-gradient(90deg, #EEEEEE 0%, #D8D8D8 100%)',
    borderRadius: 11,
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4E4E4E',
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
      padding: '6px 12px',
    },
  },
  chipActive: {
    display: 'inline-block',
    padding: '4px 7px',
    margin: 4,
    backgroundImage: 'linear-gradient(90deg, #D3EDFF 0%, #A3D7F0 100%)',
    borderRadius: 11,
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4E4E4E',
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
      padding: '6px 12px',
    },
  },
  book: {
    '& > img': {
      width: 120,
      height: 190,
      [theme.breakpoints.up('md')]: {
        width: 150,
        height: 230,
      },
    },
  },
  bookTitle: {
    margin: '5px 0',
    fontWeight: 'bold',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  bookAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  slideBtn: {
    width: '100%',
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
    fontSize: 12,
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },
  mobileBooksView: {
    display: 'flex',
    width: '100%',
    height: 280,
    overflow: 'auto',
    '& > div': {
      width: 120,
      margin: '0 15px',
      whiteSpace: 'nowrap',
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
  continueCont: {
    textAlign: 'center',
    margin: `${theme.spacing(6)}px 0 ${theme.spacing(3)}px`,
  },
}));

const CategoryChips = ({ category, activeChip, setActiveChip }) => {
  const classes = useStyles();

  return activeChip.name === category.name ? (
    <span className={classes.chipActive}>{category.name}</span>
  ) : (
    <span className={classes.chip} onClick={() => setActiveChip(category)}>
      {category.name}
    </span>
  );
};

CategoryChips.propTypes = {
  category: PropTypes.func.isRequired,
};

const ViewAllBookByCategory = ({ category, callBack }) => {
  const classes = useStyles();

  return (
    <div>
      <Link onClick={() => callBack()} to={`/books/${category.search}`}>
        <div className={classes.viewAll}>
          View all books in {category.name}
          <br />
          <img
            width="50"
            height="18"
            src="/img/arrow-away.png"
            alt={`To the ${category.name} books`}
          />
        </div>
      </Link>
    </div>
  );
};

const Book = ({ book }) => {
  const classes = useStyles();
  const [showRecommendBook, setShowRecommendBook] = useState(false);

  function handleOpenModal() {
    ReactGA.event({
      category: 'Recommend',
      action: 'Clicked recommend button in onboarding',
    });
    setShowRecommendBook(true);
  }

  return (
    <div className={classes.book}>
      <img src={book.coverUrl} alt={book.title} />
      <div className={classes.bookTitle}>{book.title}</div>
      <div className={classes.bookAuthor}>by {book.author}</div>
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
            style={{ width: 20, marginRight: 10 }}
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

const IntroduceRecommendStep2 = ({ callBack }) => {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const booksPerPage = desktopView ? 5 : 2;
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeChip, setActiveChip] = useState(categories[0]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeChip]);

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.main}>
        <h2>Make your first recommondation!</h2>
        <p>
          Choose your favourite genre(s) and we’ll help you find a book you’ve
          already read and loved from Fanship’s catalogue showcasing Canadian
          publishers.
        </p>
      </Grid>
      <div className={classes.chips}>
        {categories.map(category => (
          <CategoryChips
            category={category}
            activeChip={activeChip}
            setActiveChip={setActiveChip}
          />
        ))}
      </div>
      <div className={classes.carouselCont}>
        {desktopView && (
          <>
            <button
              type="button"
              onClick={() => setCurrentSlide(currentSlide - booksPerPage)}
              style={{ ...arrowStyles, left: '-60px' }}
              className={classes.slideBtn}
            >
              <img
                src="/img/left-arrow.png"
                width={84}
                alt="Previous Slide"
                className={classes.slideBtn}
              />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide(currentSlide + booksPerPage)}
              style={{ ...arrowStyles, right: '-60px' }}
              className={classes.slideBtn}
            >
              <img
                src="/img/right-arrow.png"
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
                .find(category => category.name === activeChip.name)
                .books.map(book => (
                  <Book book={book} />
                ))}
              <ViewAllBookByCategory
                category={activeChip}
                callBack={callBack}
              />
            </Carousel>
          </>
        )}
        {!desktopView && (
          <div className={classes.mobileBooksView}>
            {categories
              .find(book => book.name === activeChip.name)
              .books.map(book => (
                <Book book={book} />
              ))}
            <ViewAllBookByCategory category={activeChip} callBack={callBack} />
          </div>
        )}
        <p>Discover the must-read books you might have missed.</p>
        <Discovery callBack={callBack} />
        <div className={classes.continueCont}>
          <PrimaryButton variant="contained" color="primary" onClick={callBack}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default IntroduceRecommendStep2;

IntroduceRecommendStep2.propTypes = {
  callBack: PropTypes.func.isRequired,
};
