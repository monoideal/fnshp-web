import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import history from 'lib/history';

import BooksMeta from 'components/Dashboard/BooksMeta';
import Notifications from 'components/Dashboard/Notifications';
import PendingContracts from 'components/Dashboard/PendingContracts';
import Analytics from 'components/Dashboard/Analytics';
import PaymentHistory from 'components/Dashboard/PaymentHistory';
import AccessCode from 'components/shared/AccessCode';

import { useApi } from 'api/';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  subHeading: {
    fontWeight: 'normal',
  },
  disclaimer: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
  paperInfo: {
    width: '100%',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(3),
    '& h2': {
      marginTop: 0,
    },
    '& button': {
      fontWeight: 'bold',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between" alignItems="flex-end">
      <Grid item>
        <h1>Dashboard</h1>
      </Grid>
      <Grid item xs={12} className={classes.disclaimer}>
        The dashboard shows data for your books available on Fanship. Data and
        analytics may take up to 24 hours to update.
      </Grid>
    </Grid>
  );
};

export default function DashboardContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [booksMeta, setBooksMeta] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const [pendingContracts, setPendingContracts] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const { fanshipUser } = React.useContext(AppContext);

  const classes = useStyles();
  const api = useApi();
  const userLimitedAccess = fanshipUser.limitedAccess;
  const userIsCreator = fanshipUser.creator;

  function triggerUpdate() {
    setUpdateFlag(!updateFlag);
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await api.fetchCreatorDashboard();
        setBooksMeta({
          submitted: res.submitted,
          onsale: res.onsale,
          pending: res.pending,
          rejected: res.rejected,
          verified: res.verified,
        });
        setPaymentHistory({
          accountBalance: res.balance,
          tipsReceived: res.tips,
        });
        setNotifications(res.notifications);
        setPendingContracts(res.contracts);
      } catch (err) {
        console.log('err:', `${err}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [api, updateFlag]);

  if (isLoading) return 'Loading...';

  return (
    <Container maxWidth="md" className={classes.container}>
      <Header />
      {booksMeta.submitted === 0 && (
        <WelcomeMessage
          userLimitedAccess={userLimitedAccess}
          userIsCreator={userIsCreator}
        />
      )}
      {userLimitedAccess && <AccessCode />}
      <BooksMeta data={booksMeta} />
      {notifications && <Notifications data={notifications} />}
      {pendingContracts && (
        <PendingContracts
          data={pendingContracts}
          triggerUpdate={triggerUpdate}
        />
      )}
      <Analytics />
      <PaymentHistory data={paymentHistory} />
    </Container>
  );
}

const WelcomeMessage = ({ userLimitedAccess, userIsCreator }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paperInfo}>
      <h2>Welcome aboard!</h2>
      <p>Let’s get you started by adding books to your catalogue.</p>
      {!userLimitedAccess && (
        <div>
          <h3>I have a book to put on sale</h3>
          <p>
            If you have ownership rights and would like to sell your book on
            Fanship, upload a book and create a royalty contract to place your
            book on sale. Your book uploads will require a review by our
            administrators.
          </p>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push('/catalog/new/monetize')}
          >
            Upload a book
          </Button>
        </div>
      )}
      {userIsCreator && (
        <div>
          <h3>I am a contributor of a book already on sale</h3>
          <p>
            If you are an author, illustrator, or have otherwise made
            contributions to existings books on Fanship, you can add the book to
            your catalogue by identiying yourself as a contributor to books
            currently in our listing. This will give you limited access to the
            book, including adding your public profile, access to analytics, and
            collecting applauds. Any request to add books to your catalogue will
            require approval from our administrators.
          </p>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push('/catalog/book-request')}
          >
            Add existing book to my catalogue
          </Button>
        </div>
      )}
    </Paper>
  );
};

WelcomeMessage.propTypes = {
  userLimitedAccess: PropTypes.bool.isRequired,
  userIsCreator: PropTypes.bool.isRequired,
};
