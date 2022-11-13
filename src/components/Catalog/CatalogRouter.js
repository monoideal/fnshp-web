import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import history from 'lib/history';
import ViewCatalog from 'components/Catalog/View/ViewCatalogContainer';
import RoyaltyContract from 'components/Catalog/RoyaltyContract/RoyaltyContractContainer';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MonetizationConfirmation from 'components/Catalog/New/MonetizationConfirmation';
import AccordionBookAndCoverUpload from 'components/Catalog/New/AccordionBookAndCoverUpload';
import MonetizeNoConfirmation from 'components/Catalog/New/MonetizeNoConfirmation';
import AccordionBookUpdate from 'components/Catalog/New/AccordionBookUpdate';
import BookRequestPage from 'components/Catalog/Request/BookRequestPage';
import BookRequestMatchPage from 'components/Catalog/Request/BookRequestMatchPage';
import BookRequestProfileAddPage from 'components/Catalog/Request/BookRequestProfileAddPage';
import BookDetails from 'components/Catalog/View/BookDetails';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function CatalogRouter({ match }) {
  const path = p => `${match.path}${p}`;
  const classes = useStyles();

  return (
    <Router history={history}>
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          <Route exact path={path('/')} component={() => <ViewCatalog />} />
          <Route
            exact
            path={path('/new/monetize')}
            component={() => <MonetizationConfirmation />}
          />
          <Route
            exact
            path={path('/new/monetize/no')}
            component={() => <MonetizeNoConfirmation />}
          />
          <Route
            exact
            path={path('/new/info')}
            component={() => (
              <AccordionBookAndCoverUpload
                editPage={false}
                text="1. Upload E-book and cover"
              />
            )}
          />
          <Route
            exact
            path={path('/new/edit/:bookId')}
            component={() => <AccordionBookUpdate />}
          />
          <Route
            exact
            path={path('/view/:bookId')}
            component={() => <BookDetails />}
          />
          <Route
            path={path('/:bookId/royalty-contract/:royaltyContractId')}
            component={() => <RoyaltyContract />}
          />
          <Route
            path={path('/:bookId/royalty-contract')}
            component={() => <RoyaltyContract />}
          />
          <Route
            exact
            path={path('/book-request')}
            component={() => <BookRequestPage />}
          />
          <Route
            exact
            path={path('/book-request/profile-add')}
            component={() => <BookRequestProfileAddPage />}
          />
          <Route
            path={path('/book-request/:bookId/:owned?')}
            component={() => <BookRequestMatchPage />}
          />
          <Route component={() => <h1>Not Found</h1>} />
        </Switch>
      </Container>
    </Router>
  );
}

CatalogRouter.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
