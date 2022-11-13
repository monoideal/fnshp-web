import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';

import history from 'lib/history';
import GlobalContainer from 'components/Fans/GlobalContainer';
import BrowseBooks from 'components/Fans/BrowseBooks';
import BrowseContainer from 'components/Fans/BrowseContainer';

const FansRouter = () => (
  <GlobalContainer>
    <Router history={history}>
      <Switch>
        <Route path="/books/all" component={BrowseBooks} exact />
        <Route
          path="/books/:parent?/:child?"
          component={() => <BrowseContainer />}
        />
        <Route component={() => <h1>Not Found</h1>} />
      </Switch>
    </Router>
  </GlobalContainer>
);

FansRouter.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default FansRouter;
