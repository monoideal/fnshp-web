import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';

import history from 'lib/history';
import GlobalContainer from 'components/Fans/GlobalContainer';
import AccountContainer from 'components/Fans/AccountContainer';
import AccountHowToUse from 'components/Fans/AccountHowToUse';
import MyRecommendations from 'components/Fans/MyRecommendations/';
import AuthorDetailContainer from 'components/Fans/AuthorDetailContainer';
import ViewCart from 'components/Fans/ViewCart';
import PrivateRoute from 'components/PrivateRoute';

export default function FansRouter({ match }) {
  const path = p => `${match.path}${p}`;

  return (
    <GlobalContainer>
      <Router history={history}>
        <Switch>
          <PrivateRoute
            exact
            path={path('/account')}
            permission="fan"
            render={props => (
              <AccountContainer {...props} activeTab="accountDetails" />
            )}
          />
          <PrivateRoute
            exact
            path={path('/account/rewards')}
            permission="fan"
            render={props => (
              <AccountContainer {...props} activeTab="rewards" />
            )}
          />
          <PrivateRoute
            exact
            path={path('/account/purchase-history')}
            permission="fan"
            render={props => (
              <AccountContainer {...props} activeTab="purchaseHistory" />
            )}
          />
          <PrivateRoute
            exact
            path={path('/account/how-to-use-fanship')}
            permission="fan"
            render={props => (
              <AccountContainer {...props} activeTab="howToUseFanship" />
            )}
          />
          <PrivateRoute
            exact
            path={path('/my-recommendations/')}
            permission="fan"
            render={props => <MyRecommendations {...props} />}
          />
          <Route
            exact
            path={path('/browse/authors/:id')}
            component={() => <AuthorDetailContainer />}
          />
          <Route exact path={path('/cart')} component={() => <ViewCart />} />
          <Route component={() => <h1>Not Found</h1>} />
        </Switch>
      </Router>
    </GlobalContainer>
  );
}

FansRouter.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
