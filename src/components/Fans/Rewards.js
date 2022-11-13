/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { get, filter } from 'lodash';
import PropTypes from 'prop-types';
import DonateAlert from 'components/Fans/Donation/DonateAlert';
import { AppContext } from 'components/AppContext';
import { useApi } from 'api/';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const rewardsStyles = makeStyles(theme => ({
  img: {
    backgroundImage: "url('/img/recommendations/rewardsTopImg.png')",
    overflow: 'hidden',
    backgroundPosition: 'center',
    textAlign: 'center',
    backgroundSize: '100% 100%',
    padding: '35px',
    [theme.breakpoints.down('md')]: {
      backgroundSize: 'cover',
    },
  },
  title: {
    fontSize: '22px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.darkPurple.main,
    fontWeight: '700',
    marginBottom: '3%',
  },
  name: {
    fontSize: '22px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
    fontWeight: '700',
  },
  points: {
    fontSize: '28px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#c04800',
    fontWeight: '700',
    marginBottom: '1%',
  },
  save: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
    display: 'inline',
  },
  saveValue: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#c04800',
    display: 'inline',
    fontWeight: '700',
  },
  donate: {
    fontSize: '22px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: '8%',
    marginBottom: '2.7%',
  },
  total: {
    fontSize: '17px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '3%',
  },
}));

export default function Rewards() {
  const classes = rewardsStyles();
  const [charities, setCharities] = React.useState([]);
  const api = useApi();
  const { fanshipUser, initUsers } = React.useContext(AppContext);

  const { fan } = fanshipUser;

  React.useEffect(() => {
    async function initialize() {
      try {
        const allCharities = await api.fetchForUserCharities();
        setCharities(
          filter(
            allCharities,
            charity => get(charity, 'isSuspended') === false,
          ),
        );
      } catch (err) {
        console.log(err);
      }
    }
    initialize();
  }, [api]);

  function updateUser() {
    initUsers();
  }

  if (!fanshipUser) return 'Loading...';

  return (
    <div>
      <Grid item xs={12} className={classes.title}>
        Rewards Balance
      </Grid>
      <Grid container className={classes.img}>
        <Grid item xs={12} className={classes.name}>
          Hi {fan.username} !
        </Grid>
        <Grid item xs={12} className={classes.points}>
          {fan.points} Points
        </Grid>
        <Grid item xs={12}>
          <div className={classes.save}>
            Your current points balance is worth
            <div className={classes.saveValue}>
              {' '}
              ${(fan.points / 1000).toFixed(2)}{' '}
            </div>
            <p>
              Save towards future ebook purchases or support the literary
              community with a donation to one of these charities.
            </p>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.donate}>
        Donate to Charity
      </Grid>
      <Carousel charityOptions={charities} fan={fan} updateUser={updateUser} />
      <Grid item xs={12} className={classes.total}>
        Total Points Donated to Charity:
        <b> {fanshipUser.fan.totalDonated}</b>
      </Grid>
    </div>
  );
}

const carouselStyles = makeStyles(theme => ({
  mouseHoverImage: {
    cursor: 'pointer',
    textAlign: 'center',
    borderStyle: 'groove',
    color: 'transparent',
    borderWidth: '3px',
    '&:hover': {
      borderStyle: 'solid',
      color: '#ffc555',
      borderRadius: '5px',
    },
    width: '8em',
    height: '4em',
  },
  imageBoxes: {
    width: '128px',
    height: '72px',
    textAlign: 'center',
  },
  rightArrow: {
    textAlign: 'right',
    marginTop: '15px',
  },
  leftArrow: {
    marginTop: '15px',
  },
  hoverArrow: {
    cursor: 'pointer',
  },
  slider: {
    alignItems: 'right',
  },
  bottomNavigation: {
    margin: '8px',
    cursor: 'pointer',
  },
  navIcon: {
    textAlign: 'center',
    marginTop: '3%',
    [theme.breakpoints.down('md')]: {
      marginTop: '5%',
    },
  },
}));

const Carousel = ({ charityOptions, fan, updateUser }) => {
  const classes = carouselStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const carouselIndex = desktopView ? 4 : 2;
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(carouselIndex);

  React.useEffect(() => {
    if (desktopView) setEndIndex(carouselIndex);
  }, [carouselIndex]);

  const bottomNavigationValue = charityOptions.length / carouselIndex;
  const [openAlert, setOpenAlert] = React.useState(false);
  const [selectedCharity, setSelectedCharity] = React.useState({});
  const navItems = [];

  for (let i = 0; i < bottomNavigationValue; i += 1) {
    if (startIndex / i === carouselIndex || (i === 0 && startIndex === 0)) {
      navItems.push(
        <img
          key={i}
          className={classes.bottomNavigation}
          src="/img/recommendations/oval.png"
          alt="navigation one"
        />,
      );
    } else {
      navItems.push(
        <img
          key={i}
          className={classes.bottomNavigation}
          src="/img/recommendations/oval-copy.png"
          alt="navigation icon"
        />,
      );
    }
  }

  const handleSliderNext = () => {
    const lastElement = charityOptions.length;
    if (endIndex < lastElement) {
      setStartIndex(startIndex + carouselIndex);
      setEndIndex(endIndex + carouselIndex);
    }
  };

  const handleSliderBack = () => {
    if (startIndex >= carouselIndex) {
      setStartIndex(startIndex - carouselIndex);
      setEndIndex(endIndex - carouselIndex);
    }
  };

  const handleDonate = charity => {
    setSelectedCharity(charity);
    setOpenAlert(true);
  };

  const charityToDisplay = charityOptions.slice(startIndex, endIndex);

  return (
    <Grid container justify="center" className={classes.slider}>
      <Grid item xs={1} className={classes.leftArrow}>
        <div onClick={handleSliderBack} role="presentation">
          <img
            className={classes.hoverArrow}
            src="/img/recommendations/backArrow.png"
            alt="Left Arrow"
          />
        </div>
      </Grid>
      <Grid item xs={10} className={classes.container}>
        <Grid container spacing={2}>
          {charityToDisplay.map((charity, index) => (
            <Grid
              item
              xs
              key={index}
              className={classes.imageBoxes}
              onClick={() => handleDonate(charity)}
            >
              <img
                className={classes.mouseHoverImage}
                src={charity.logoUrl}
                alt="Book"
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={1} className={classes.rightArrow}>
        <div onClick={handleSliderNext} role="presentation">
          <img
            className={classes.hoverArrow}
            src="/img/recommendations/nextArrow.png"
            alt="Right Arrow"
          />
        </div>
      </Grid>
      <Grid item xs={12} className={classes.navIcon}>
        {navItems.map(icons => icons)}
      </Grid>
      <DonateAlert
        updateUser={updateUser}
        open={openAlert}
        close={() => setOpenAlert(false)}
        selectedCharity={selectedCharity}
        fan={fan}
      />
    </Grid>
  );
};

Carousel.propTypes = {
  charityOptions: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
  fan: PropTypes.shape({
    points: PropTypes.number,
    totalDonated: PropTypes.number,
  }).isRequired,
};
