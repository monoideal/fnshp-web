import React, { useState } from 'react';
import PropTypes from 'prop-types';
import history from 'lib/history';
import Recommendations from 'components/Fans/Recommendations';
import {
  Container,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box,
  Button,
} from '@material-ui/core';
import FavoroteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

import ReceivedRecommendations from 'components/Fans/ReceivedRecommendations';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  didYouKnowCont: {
    marginTop: theme.spacing(2),
    backgroundImage: 'linear-gradient(0deg, #F9F9F9 0%, #F1F1F1 100%)',
    borderRadius: 5,
  },
  tabsCont: {
    margin: `${theme.spacing(3)}px 0px`,
  },
  tabs: {
    backgroundColor: '#ddd',
    '& button': {
      fontWeight: 'bold',
    },
  },
  didYouKnowItem: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing(3)}px `,
    boxSizing: 'border-box',
    '& > div': { paddingRight: theme.spacing(2) },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
  },
  didYouKnowButton: {
    marginTop: theme.spacing(1),
    padding: 0,
    color: theme.palette.darkPurple.main,
    fontSize: 12,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  },
}));

const DidYouKnow = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.didYouKnowCont}>
      <Grid xs={12} md={4} className={classes.didYouKnowItem}>
        <div style={{ paddingLeft: 10 }}>
          <img src="/img/icon-recommend.svg" alt="Graph icon" />
        </div>
        <p>See how people are responding to your recommendations</p>
      </Grid>
      <Grid xs={12} md={4} className={classes.didYouKnowItem}>
        <div>
          <FavoroteBorderIcon fontSize="large" />
        </div>
        <p>
          Earn rewards when your friends act on your recommendations
          <br />
          <Button
            className={classes.didYouKnowButton}
            onClick={() => history.push('/fans/account/rewards')}
          >
            View My Rewards
          </Button>
        </p>
      </Grid>
      <Grid xs={12} md={4} className={classes.didYouKnowItem}>
        <div>
          <LocalAtmIcon fontSize="large" />
        </div>

        <p>
          Donate to literary charities
          <br />
          <Button
            className={classes.didYouKnowButton}
            onClick={() => history.push('/fans/account/rewards')}
          >
            View Charities
          </Button>
        </p>
      </Grid>
    </Grid>
  );
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const MyRecommendations = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box
        fontSize={22}
        fontWeight="bold"
        marginTop={3}
        marginBottom={1}
        fontFamily="'Rubik','sans-serif'"
        color="#241f63"
      >
        My Recommendations
      </Box>
      <DidYouKnow />
      <AppBar position="static" className={classes.tabsCont}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
          indicatorColor="primary"
          className={classes.tabs}
        >
          <Tab label="My Recommendations" />
          <Tab label="Recommended to me" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Recommendations />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReceivedRecommendations />
      </TabPanel>
    </Container>
  );
};

export default MyRecommendations;
