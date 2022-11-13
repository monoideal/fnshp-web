import React, { useEffect } from 'react';
import _ from 'lodash';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import smartlookClient from 'smartlook-client';

import config from 'config';
import history from 'lib/history';
import InlineLoader from 'components/shared/InlineLoader';
import { useAuth0 } from '@auth0/auth0-react';
import { AppContext, AppContextProvider } from 'components/AppContext';
import { isSupportedBrowser } from 'util/helpers.js';
import theme from 'theme/main';
import BrowserWarning from 'components/BrowserWarning';
import Home from 'components/Home';
import Health from 'components/Health';
import TermsAndConditions from 'components/TermsAndConditions';
import Dashboard from 'components/Dashboard/DashboardContainer';
import Catalog from 'components/Catalog/CatalogRouter';
import Fans from 'components/Fans/FansRouter';
import Books from 'components/Fans/BooksRouter';
import Admin from 'components/Admin/AdminRouter';
import Profiles from 'components/Profiles/ProfilesPage';
import ProfilesEdit from 'components/Profiles/Edit/ProfileEditPage';
import ProfilesAdd from 'components/Profiles/Edit/ProfileAddPage';
import ProfilesRecommondationEdit from 'components/Profiles/Edit/ProfilesRecommondationEditPage';
import ProfileRecommendPage from 'components/ProfileRecommendPage';
import Account from 'components/Account/AccountContainer';
import PaymentInfo from 'components/PaymentInfo/PaymentInfoContainer';
import Notifications from 'components/Notifications';
import PrivateRoute from 'components/PrivateRoute';
import PrivateContainer from 'components/PrivateContainer';
import OnboardingFlow from 'components/Onboarding/OnboardingFlow';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FAQ from 'components/FAQ';
import AuthorHelp from 'components/AuthorHelp';
import PrivacyPolicy from 'components/PrivacyPolicy';
import GlobalContainer from 'components/Fans/GlobalContainer';
import BookDetail from 'components/Fans/BookDetailContainer';

// Update GA page view every time the history changes
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

toast.configure({
  position: 'bottom-right',
  autoClose: 6000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
});

function App() {
  const { user, isLoading, logout, isAuthenticated } = useAuth0();
  const { fanshipUser } = React.useContext(AppContext);
  useEffect(() => {
    // Init Smartlook for video capture
    smartlookClient.init(config.SMARTLOOK_KEY);
  }, []);

  useEffect(() => {
    if (!user || !fanshipUser) {
      return;
    }
    const fanship = fanshipUser;
    // Add identity data for Smartlook for video capture
    smartlookClient.identify(fanship.id, {
      ...fanship,
      ...fanship.fan,
      ...fanship.creator,
      ...fanship.organization,
      ...fanship.admin,
    });
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <MuiThemeProvider theme={theme}>
        <InlineLoader />
      </MuiThemeProvider>
    );
  }
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <AppContextProvider>
          {!isSupportedBrowser() && <BrowserWarning />}
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/fans" component={Fans} />
              <Route path="/books" component={Books} />
              <Route
                exact
                path="/book/:id"
                render={props => (
                  <GlobalContainer {...props}>
                    <BookDetail />
                  </GlobalContainer>
                )}
              />
              <Route
                exact
                path="/recommendation/:id"
                render={props => <ProfileRecommendPage {...props} />}
              />
              <Route path="/health" component={Health} />
              <Route
                path="/onboarding"
                render={props => <OnboardingFlow {...props} muiTheme={theme} />}
              />
              <PrivateRoute
                path="/admin"
                permission="admin"
                render={props => (
                  <PrivateContainer
                    admin
                    component={() => <Admin {...props} />}
                  />
                )}
              />
              <Route
                exact
                path="/logout"
                render={() => {
                  sessionStorage.removeItem('cartState');
                  logout({ returnTo: window.location.origin });
                }}
              />
              <PrivateRoute
                path="/dashboard"
                permission="creator"
                render={props => (
                  <PrivateContainer component={Dashboard} {...props} />
                )}
              />
              <PrivateRoute
                path="/catalog"
                permission="creator"
                render={props => (
                  <PrivateContainer component={() => <Catalog {...props} />} />
                )}
              />
              {/* <PrivateRoute
              exact
              path="/analytics"
              permission="creator"
              render={props => (
                <PrivateContainer component={Analytics} {...props} />
              )}
            /> */}
              <PrivateRoute
                exact
                path="/profiles"
                permission="creator"
                render={props => (
                  <PrivateContainer component={Profiles} {...props} />
                )}
              />
              <PrivateRoute
                exact
                path="/profiles/add"
                permission="creator"
                render={props => (
                  <PrivateContainer component={ProfilesAdd} {...props} />
                )}
              />
              <PrivateRoute
                exact
                path="/profiles/:id"
                permission="creator"
                render={props => (
                  <PrivateContainer component={ProfilesEdit} {...props} />
                )}
              />
              <PrivateRoute
                exact
                path="/profiles/recommondation/:id"
                permission="creator"
                render={props => (
                  <PrivateContainer
                    component={ProfilesRecommondationEdit}
                    {...props}
                  />
                )}
              />
              <PrivateRoute
                exact
                path="/account"
                permission="creator"
                render={props => (
                  <PrivateContainer component={Account} {...props} />
                )}
              />
              <PrivateRoute
                path="/payment-info"
                permission="creator"
                render={props => (
                  <PrivateContainer component={PaymentInfo} {...props} />
                )}
              />
              <PrivateRoute
                exact
                path="/notifications"
                permission="creator"
                render={props => (
                  <PrivateContainer component={Notifications} {...props} />
                )}
              />
              <Route
                path="/help"
                render={props => (
                  <GlobalContainer {...props}>
                    <FAQ />
                  </GlobalContainer>
                )}
              />
              <Route
                exact
                path="/faq"
                render={() => <Redirect to="/faq-fans" />}
              />
              <Route
                exact
                path="/faq-fans"
                render={props => (
                  <GlobalContainer {...props}>
                    <FAQ section="fans" />
                  </GlobalContainer>
                )}
              />
              <Route
                exact
                path="/faq-authors"
                render={props => (
                  <GlobalContainer {...props}>
                    <FAQ section="authors" />
                  </GlobalContainer>
                )}
              />
              <Route
                exact
                path="/help-authors"
                render={props => (
                  <GlobalContainer {...props}>
                    <AuthorHelp />
                  </GlobalContainer>
                )}
              />
              <Route
                path="/policy"
                render={props => (
                  <GlobalContainer {...props}>
                    <PrivacyPolicy />
                  </GlobalContainer>
                )}
              />
              <Route
                path="/terms-and-conditions"
                render={props => (
                  <GlobalContainer {...props}>
                    <TermsAndConditions />
                  </GlobalContainer>
                )}
              />
              <PrivateRoute
                render={props => (
                  <PrivateContainer
                    component={() => <h1>Not Found</h1>}
                    {...props}
                  />
                )}
              />
            </Switch>
          </Router>
        </AppContextProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
