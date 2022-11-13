import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import history from 'lib/history';
import theme from 'theme/admin';
import Dashboard from 'components/Admin/Dashboard/DashboardContainer';
import AdminManagement from 'components/Admin/AdminManagement/AdminManagementContainer';
import RightHolders from 'components/Admin/UserManagement/RightHolders';
import CreatorProfileRequests from 'components/Admin/UserManagement/CreatorProfileRequests';
import RightHolderDetails from 'components/Admin/UserManagement/RightHolderDetails';
import Fans from 'components/Admin/UserManagement/Fans';
import Charity from 'components/Admin/Charity/CharityContainer';
import AddCharity from 'components/Admin/Charity/AddCharity';
import PlatformReporting from 'components/Admin/PlatformReporting';
import Statistics from 'components/Admin/Statistics';
import PaymentManagement from 'components/Admin/PaymentManagement';
import PromoCodes from 'components/Admin/PromoCodes';
import PromoCodesAdd from 'components/Admin/PromoCodes/PromoCodeAddPage';
import PromoCodesEdit from 'components/Admin/PromoCodes/PromoCodeEditPage';
import BookRequestPage from 'components/Catalog/Request/BookRequestPage';
import BookRequestMatchPage from 'components/Catalog/Request/BookRequestMatchPage';
import BookDetails from 'components/Catalog/View/BookDetails';
import EditCharity from './Charity/EditCharity';

export default function CatalogRouter({ match }) {
  const path = p => `${match.path}${p}`;

  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route exact path={path('/')} component={() => <Dashboard />} />
          <Route
            exact
            path={path('/dashboard')}
            component={() => <Dashboard />}
          />
          <Route
            exact
            path={path('/AdminManagement')}
            component={() => <AdminManagement />}
          />
          <Route exact path={path('/fans')} component={() => <Fans />} />
          <Route
            exact
            path={path('/rightHolders')}
            component={() => <RightHolders />}
          />
          <Route
            exact
            path={path('/profile-requests')}
            component={() => <CreatorProfileRequests />}
          />
          <Route
            exact
            path={path('/book-request')}
            component={() => <BookRequestPage />}
          />
          <Route
            exact
            path={path('/book-request/:bookId')}
            component={() => <BookRequestMatchPage />}
          />

          <Route
            exact
            path={path('/rightholder/:id')}
            component={() => <RightHolderDetails />}
          />
          <Route exact path={path('/charity')} component={() => <Charity />} />
          <Route
            exact
            path={path('/addCharity')}
            component={() => <AddCharity />}
          />
          <Route
            exact
            path={path('/editCharity/:userId')}
            component={() => <EditCharity />}
          />
          <Route
            exact
            path={path('/analytics')}
            component={() => <PlatformReporting />}
          />
          <Route
            path={path('/payments')}
            render={props => <PaymentManagement {...props} />}
          />
          <Route
            exact
            path={path('/promocodes')}
            render={props => <PromoCodes {...props} />}
          />
          <Route
            exact
            path={path('/promocodes/add')}
            render={props => <PromoCodesAdd {...props} />}
          />
          <Route
            exact
            path={path('/promocodes/edit/:promoCodeId')}
            render={props => <PromoCodesEdit {...props} />}
          />
          <Route
            exact
            path={path('/statistics')}
            component={() => <Statistics />}
          />
          <Route
            path={path('/catalog/view/:bookId')}
            render={props => <BookDetails {...props} />}
          />
          <Route component={() => <h1>Not Found</h1>} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

CatalogRouter.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
