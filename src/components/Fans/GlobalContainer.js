import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import Promise from 'bluebird';

import NavBar from 'components/Fans/NavBar';
import Footer from 'components/Fans/Footer';
import CartProvider from 'components/Fans/Cart';
import { useApi } from 'api/';
import { createRecommendationHitsStore } from 'util/helpers';
import { ERROR_CODES } from 'util/constants';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
  },
  header: {
    width: '100%',
  },
  content: {
    maxWidth: theme.fanSite.maxWidth,
    width: '100%',
    margin: 'auto',
    flex: 1,
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
    },
  },
}));

function GlobalContainer({ guest, children, location }) {
  const api = useApi();
  const { fanshipUser } = React.useContext(AppContext);
  const classes = useStyles();

  const persistRecommendationHits = useCallback(
    createRecommendationHitsStore(),
    [],
  );

  const handleRecommendationHits = useCallback(async () => {
    const { rid } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (rid) {
      persistRecommendationHits.add(rid);
    }
    const recHits = persistRecommendationHits.get();

    await Promise.map(Object.keys(recHits), async recId => {
      let res = {};
      try {
        if (fanshipUser) {
          res = await api.createRecommendationHit(
            recId,
            recHits[recId].recHitId,
          );
        } else if (!recHits[recId].recHitId) {
          res = await api.createRecommendationHit(recId);
        }
        if (
          res.errorCode === ERROR_CODES.OWN_REC_HIT ||
          res.errorCode === ERROR_CODES.ALREADY_HAS_HIT ||
          res.fanId
        ) {
          persistRecommendationHits.remove(recId);
        } else if (res.id) {
          persistRecommendationHits.add(recId, res.id, res.bookId);
        }
      } catch (error) {
        console.error(error);
      }
    });
  });

  useEffect(() => {
    handleRecommendationHits();
  }, []);

  return (
    <CartProvider>
      <Grid
        container
        classes={{ root: classes.container }}
        direction="column"
        justify="flex-start"
      >
        <Grid item classes={{ root: classes.header }}>
          <NavBar guest={guest} />
        </Grid>
        <Grid item classes={{ root: classes.content }}>
          {children}
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </CartProvider>
  );
}

GlobalContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  guest: PropTypes.bool,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

GlobalContainer.defaultProps = {
  guest: false,
};

export default withRouter(GlobalContainer);
