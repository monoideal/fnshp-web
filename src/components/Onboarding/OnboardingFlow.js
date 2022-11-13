import React, { useEffect, useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InlineLoader from 'components/shared/InlineLoader';
import PropTypes from 'prop-types';
import _ from 'lodash';
import history from 'lib/history';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SelectAccountRole from 'components/Onboarding/SelectAccountRole';
import OnboardingFan from 'components/Onboarding/OnboardingFan';
import OnboardingCreator from 'components/Onboarding/OnboardingCreator';
import OnboardingOrganization from 'components/Onboarding/OnboardingOrganization';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  content: {
    background:
      'url(/img/deco/fs_onboarding_bubbles.svg) no-repeat center center fixed',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },
  decoFloat: {
    position: 'fixed',
    top: 'auto',
    left: 'auto',
    bottom: '25px',
    right: '25px',
    margin: 0,
    [theme.breakpoints.down('md')]: {
      zIndex: '-1',
    },
  },
  header: {
    padding: '40px 0 30px',
    [theme.breakpoints.up('md')]: {
      padding: '20px 0 50px',
    },
    '& img': {
      width: 175,
      height: 58,
      [theme.breakpoints.up('sm')]: {
        width: 280,
        height: 93,
      },
    },
  },
  returnButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    minWidth: 0,
    padding: '5px 10px',
    textTransform: 'none',
    color: '#c04800',
  },
}));

const OnboardingRouter = ({ match, muiTheme }) => {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [loading, setLoading] = useState(true);
  const path = p => `${match.path}${p}`;
  const { fanshipUser, initUsers } = React.useContext(AppContext);
  useEffect(() => {
    async function fetchUser() {
      if (!isAuthenticated) {
        loginWithRedirect();
      }
      if (!fanshipUser && isAuthenticated) {
        try {
          await initUsers();
        } catch (err) {
          console.log(err);
        }
      } else {
        if (
          !window.location.search.includes('email=') &&
          window.location.search.includes('code=')
        ) {
          if (fanshipUser && !fanshipUser.isOnboarded) {
            // do nothing
            setLoading(false);
          } else if (
            fanshipUser &&
            (fanshipUser.creator || fanshipUser.organization)
          ) {
            history.push('/dashboard');
          } else if (fanshipUser && fanshipUser.admin) {
            history.push('/admin');
          } else if (fanshipUser && fanshipUser.fan) {
            history.push('/');
          }
        } else {
          if (fanshipUser.isOnboarded) {
            // If they're already onboarded, they have no reason to be here - kick them to home
            if (fanshipUser.admin) {
              history.replace('/admin');
            }
            if (fanshipUser.creator) {
              history.replace('/dashboard');
            }
            if (
              fanshipUser.organization &&
              fanshipUser.isVerified === 'approved'
            ) {
              history.replace('/dashboard');
            }
            if (fanshipUser.fan) {
              const originPath = localStorage.getItem('currentPage');
              if (originPath && originPath.includes('/book/')) {
                history.replace(originPath);
              } else {
                history.replace('/fans/my-recommendations');
              }
            }
            // if none of the above is true (i.e. org onboarded but not verified, just keep them in onboarding flow)
            setLoading(false);
          } else if (match.isExact) {
            setLoading(false);
            if (fanshipUser.creator) {
              history.replace('/onboarding/creator');
            }
            if (fanshipUser.organization) {
              history.replace('/onboarding/organization');
            }
            if (fanshipUser.fan) {
              history.replace('/onboarding/fan');
            }
          } else {
            setLoading(false);
          }
        }
      }
    }
    fetchUser();
  }, [isAuthenticated, fanshipUser]);

  return (
    <>
      {loading ? (
        <MuiThemeProvider theme={muiTheme}>
          <InlineLoader />
        </MuiThemeProvider>
      ) : (
        <Router history={history}>
          <main className={classes.content}>
            <Button
              onClick={() => history.push('/')}
              startIcon={<ArrowBackIcon />}
              className={classes.returnButton}
            >
              Return to home
            </Button>
            <Grid container className={classes.header} justify="center">
              <img src="/img/logo.png" alt="Fanship logo" />
            </Grid>
            <Container maxWidth="md">
              <Grid container justify="center" spacing={3}>
                <Switch>
                  <Route
                    exact
                    path={path('/')}
                    component={() => <SelectAccountRole />}
                  />
                  <Route
                    exact
                    path={path('/fan')}
                    component={() => (
                      <OnboardingFan fanshipUser={fanshipUser} />
                    )}
                  />
                  <Route
                    exact
                    path={path('/creator')}
                    component={() => <OnboardingCreator />}
                  />
                  <Route
                    exact
                    path={path('/organization')}
                    component={() => <OnboardingOrganization />}
                  />
                </Switch>
              </Grid>
            </Container>
            <img
              className={classes.decoFloat}
              src="/img/deco/fs_cute_trees.png"
              alt="cute trees"
              width={100}
              height={100}
            />
          </main>
        </Router>
      )}
    </>
  );
};

OnboardingRouter.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    isExact: PropTypes.bool,
  }).isRequired,
};

export default OnboardingRouter;
