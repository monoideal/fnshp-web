import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import createAuth0Client from '@auth0/auth0-spa-js';
import history from 'lib/history';
import initializeAxios from 'lib/axios';
import initializeFanshipApi from 'api/fanship';
import ReactGA from 'react-ga';

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

// Provider component that exposes some useful auth state to all components in the project
const Auth0Provider = ({ children, onRedirectCallback, ...initOptions }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const forceUpdate = useCallback(() => setRefreshFlag(prev => !prev));

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client({
        ...initOptions,
        useRefreshTokens: true,
        cacheLocation: 'localstorage',
      });
      // Ignore redirect from email verification
      if (
        !window.location.search.includes('email=') &&
        window.location.search.includes('code=')
      ) {
        const axios = initializeAxios();
        const fanship1 = initializeFanshipApi({
          axios,
          getTokenSilently: (...p) => auth0FromHook.getTokenSilently(...p),
        });
        let fanshipUser;
        try {
          fanshipUser = await fanship1.fetchProfile();
        } catch (err) {
          if (err.error !== 'login_required') {
            console.log(err);
          }
        }
        if (fanshipUser && fanshipUser.isSuperuser) {
          history.push('/');
        } else if (fanshipUser && !fanshipUser.isOnboarded) {
          history.push('/onboarding');
        } else if (
          fanshipUser &&
          (fanshipUser.creator || fanshipUser.organization)
        ) {
          history.push('/dashboard');
        } else if (fanshipUser && fanshipUser.admin) {
          history.push('/admin');
        } else if (fanshipUser && fanshipUser.fan) {
          history.push('/');
        } else {
          await auth0FromHook.handleRedirectCallback();
          onRedirectCallback();
        }
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }
      setAuth0(auth0FromHook);
    };
    initAuth0();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function initialize() {
      setLoading(true);

      if (auth0Client && auth0Client.getTokenSilently) {
        const axios = initializeAxios();
        const fanship = initializeFanshipApi({
          axios,
          getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        });

        let auth0User;
        try {
          auth0User = await auth0Client.getUser();
        } catch (err) {
          console.log(err);
        }

        let fanshipUser;
        try {
          fanshipUser = await fanship.fetchProfile();
        } catch (err) {
          if (err.error !== 'login_required') {
            console.log(err);
          }
        }

        if (fanshipUser) setIsAuthenticated(true);

        setUser({ ...auth0User, fanship: fanshipUser });
        setLoading(false);
      }
    }
    initialize();
  }, [auth0Client, refreshFlag]);

  const loginWithPopup = async () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Log in',
    });
    auth0Client.loginWithRedirect({
      appState: window.location.origin,
    });
  };

  const registerWithPopup = async () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Join Fanship',
    });
    auth0Client.loginWithRedirect({
      appState: `${window.location.origin}`,
    });
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        loginWithPopup,
        registerWithPopup,
        handleRedirectCallback,
        forceUpdate,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

Auth0Provider.propTypes = {
  children: PropTypes.object,
  onRedirectCallback: PropTypes.func,
  // This definition could be stricter, but left it for now.
  initOptions: PropTypes.object,
};

Auth0Provider.defaultProps = {
  onRedirectCallback: () => history.replace(window.location.pathname),
};

export default Auth0Provider;
