import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import history from 'lib/history';
import { Auth0Provider } from '@auth0/auth0-react';
import ApiProvider from './api';
import App from './components/App';
import config from './config';

import './stylesheet.css';

ReactGA.initialize(config.GOOGLE_ANALYTICS_UA_ID);
ReactGA.ga('require', 'linker');
ReactGA.ga('linker:autoLink', [
  window.location.host,
  'myshopify.com',
  'auth0.com',
]);
ReactGA.pageview(window.location.pathname + window.location.search);

// Initialize currentPage (we only care if it's a book page)
if (window.location.pathname.includes('/book/'))
  localStorage.setItem('currentPage', window.location.pathname);
// Update whenever history changes
history.listen(location => {
  // Ingore onboarding steps so we remember where they came from
  if (!location.pathname.includes('/onboarding'))
    localStorage.setItem('currentPage', location.pathname);
});

// On redirect from auth push to onboarding by default
// Onboarding will decide where to direct the user
const onRedirectCallback = () => {
  history.push(`/onboarding`);
};

ReactDOM.render(
  <Auth0Provider
    domain={`${config.AUTH0_DOMAIN}`}
    clientId={`${config.AUTH0_CLIENT_ID}`}
    redirectUri={`${window.location.origin}`}
    onRedirectCallback={onRedirectCallback}
    audience={`${config.AUTH0_AUDIENCE}`}
    scope="read:current_user"
    useRefreshTokens
    cacheLocation="localstorage"
  >
    <ApiProvider>
      <App />
    </ApiProvider>
  </Auth0Provider>,
  document.getElementById('root'),
);
