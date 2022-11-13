import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import PrimaryButton from 'components/shared/PrimaryButton';

const useStyles = makeStyles(theme => ({
  main: {
    padding: `0 ${theme.spacing(1)}px`,
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
      [theme.breakpoints.up('md')]: {
        fontSize: 20,
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
    maxWidth: 1050,
    '& .carousel .slide': {
      height: 520,
      backgroundColor: 'transparent',
      padding: '0 15px',
      textAlign: 'left',
      [theme.breakpoints.up('md')]: {
        height: 300,
        padding: '0 120px',
      },
    },
    '& .slide > div': {
      height: '100%',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    '& .carousel-slider button': {
      '&:focus': {
        outline: 'none',
      },
    },
    '& li.dot': {
      backgroundColor: '#000 !important',
    },
  },
  step1: {
    background: 'url(/img/welcome-step-1-bg.png) no-repeat bottom 30px center',
    backgroundSize: '187px 223px',
    [theme.breakpoints.up('md')]: {
      backgroundPosition: 'bottom 10px right 70px',
      backgroundSize: '229px 289px',
    },
    '& > img': {
      width: '100% !important',
      paddingTop: 20,
      maxWidth: 440,
      [theme.breakpoints.up('md')]: {
        paddingTop: 0,
        width: '477px !important',
      },
    },
  },
  step2: {
    background:
      'url(/img/welcome-step-2-bg-mobile.png) no-repeat center bottom 80px',
    backgroundSize: '290px 300px',
    [theme.breakpoints.up('md')]: {
      background: 'url(/img/welcome-step-2-bg.png) no-repeat bottom right 40px',
      backgroundSize: '290px 300px',
    },
    '& > img': {
      width: '100% !important',
      maxWidth: 440,
      paddingTop: 20,
      [theme.breakpoints.up('md')]: {
        paddingTop: 0,
        width: '461px !important',
      },
    },
  },
  step3: {
    background:
      'url(/img/welcome-step-3-bg-mobile.png) no-repeat center bottom 90px',
    backgroundSize: '288px 291px',
    [theme.breakpoints.up('md')]: {
      background:
        'url(/img/welcome-step-3-bg-desktop.png) no-repeat bottom right',
      backgroundSize: '425px 300px',
    },
    '& > img': {
      width: '100% !important',
      maxWidth: 290,
      paddingTop: 20,
      [theme.breakpoints.up('md')]: {
        paddingTop: 0,
        maxWidth: 380,
        width: '403px !important',
      },
    },
  },
  step4: {
    background: 'url(/img/welcome-step-4-bg.png) no-repeat center',
    backgroundSize: '320px 250px',
    [theme.breakpoints.up('md')]: {
      background: 'url(/img/welcome-step-4-bg.png) no-repeat center right',
      backgroundSize: '350px 265px',
    },
    '& > img': {
      width: '100% !important',
      maxWidth: 420,
      paddingTop: 20,
      [theme.breakpoints.up('md')]: {
        paddingTop: 0,
        width: '429px !important',
      },
    },
  },
  step5: {
    background: 'url(/img/welcome-step-5-bg.png) no-repeat center right',
    backgroundSize: '354px 232px',
    [theme.breakpoints.up('md')]: {
      background: 'url(/img/welcome-step-5-bg.png) no-repeat bottom 70px right',
      backgroundSize: '354px 232px',
    },
    '& > img': {
      width: '100% !important',
      maxWidth: 420,
      paddingTop: 20,
      [theme.breakpoints.up('md')]: {
        paddingTop: 0,
        width: '429px !important',
      },
    },
  },
  continueBtn: {
    margin: `${theme.spacing(3)}px 0`,
    textAlign: 'center',
    marginTop: '-100px',
    [theme.breakpoints.up('md')]: {
      marginTop: '20px',
    },
    '& > button': {
      transition: 'visibility 0s linear 0s, opacity 300ms',
      padding: '8px 15px',
    },
  },
}));

const WelcomeMessage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid container direction="row" spacing={2} className={classes.main}>
      <h2>Welcome to Fanship</h2>
      <p>
        Make personal recommendations to introduce people you know to the books
        that you love.{' '}
        {desktopView && (
          <span>
            Earn rewards for making recommendations that lead to a purchase, and
            watch how your endorsement makes a difference to your favourite
            authors’ readership.
          </span>
        )}
      </p>
      <p>
        <strong>Here’s how it works:</strong>
      </p>
    </Grid>
  );
};

const IntroduceRecommendStep1 = ({ handleSubmit }) => {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const arrowStyles = {
    position: desktopView ? 'absolute' : 'fixed',
    zIndex: 2,
    bottom: desktopView ? 'calc(50% - 15px)' : 20,
    width: desktopView ? 60 : 50,
    padding: 0,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <>
      {desktopView && <WelcomeMessage />}
      <div className={classes.carouselCont}>
        <Carousel
          showStatus={false}
          showThumbs={false}
          onChange={index => setCurrentSlide(index)}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, left: 15 }}
              >
                <img
                  src="/img/left-arrow.png"
                  width={84}
                  alt="Previous Slide"
                />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, right: 15 }}
              >
                <img src="/img/right-arrow.png" width={84} alt="Next Slide" />
              </button>
            )
          }
        >
          <div className={classes.step1}>
            {!desktopView && <WelcomeMessage />}
            <img
              src="/img/welcome-step-1-text.svg"
              alt="Find a book you’ve read and loved. Think of the family members, friends, or co-workers who might love it as much as you."
            />
          </div>
          <div className={classes.step2}>
            <img
              src="/img/welcome-step-2-text.svg"
              alt="Click the “Recommend” button. Fanship will generate a recommendation link unique to you."
            />
          </div>
          <div className={classes.step3}>
            <img
              src="/img/welcome-step-3-text.svg"
              alt="Send your recommendation link by email, Facebook Messenger, or copy and paste it into your message or post of choice."
            />
          </div>
          <div className={classes.step4}>
            <img
              src="/img/welcome-step-4-text.svg"
              alt="Check your account to keep track of your reward points and the activity on your Engagement Graphs. See your personal seal of approval on a book at work."
            />
          </div>
          <div className={classes.step5}>
            <img
              src="/img/welcome-step-5-text.svg"
              alt="Check your account to keep track of your recommendations and rewards."
            />
          </div>
        </Carousel>
        <Grid item xs={12} className={classes.continueBtn}>
          <PrimaryButton
            variant="contained"
            color="primary"
            style={
              currentSlide === 4
                ? { visibility: 'visible', opacity: 1 }
                : { visibility: 'hidden', opacity: 0 }
            }
            onClick={() => handleSubmit(true)}
          >
            Continue
          </PrimaryButton>
        </Grid>
      </div>
    </>
  );
};

export default IntroduceRecommendStep1;

IntroduceRecommendStep1.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
