import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Button } from '@material-ui/core';
import history from 'lib/history';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CreatorProfileCard, {
  CardDecoration,
} from 'components/shared/CreatorProfileCard';
import { useApi } from 'api/';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    '& button': {
      fontWeight: 'bold',
    },
  },
  containerFormSubmit: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  deactivateAccount: {
    maxWidth: '1000px',
  },
  noProfiles: {
    width: '100%',
    padding: theme.spacing(3),
    backgroundColor: '#dedede',
    borderRadius: 10,
    '& h3': {
      marginTop: 0,
    },
  },
  activateCont: {
    marginTop: 30,
  },
}));

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function() {
      const toastId = toast.success('Successfully copied to clipboard');
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    },
    function(err) {
      console.error('Async: Could not copy text: ', err);
    },
  );
}

export default function ProfileContainer() {
  const classes = useStyles();
  const api = useApi();
  const [profiles, setProfiles] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.fetchCreatorProfiles();
      setProfiles(result);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" className={classes.container}>
      <h1>My Profiles</h1>
      <p>
        Manage your profile(s) here. If you write under different pseudonyms or
        for different audiences, you can create multiple public profiles.
      </p>
      <p>
        When your profile information is complete, link your books to create
        your catalogue.
      </p>
      <Grid container spacing={3} alignItems="baseline">
        <Grid item md={6} xs={12}>
          <h2>Public Profiles</h2>
        </Grid>
        <Grid item md={6} style={{ textAlign: 'right' }}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => history.push(`/profiles/add`)}
          >
            Add Profile
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => history.push(`/catalog`)}
            style={{ marginLeft: 20 }}
          >
            Add Books to My Catalogue
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {profiles.map(profile =>
          profile && profile.userId ? (
            <Grid item xs={6} key={profile.id}>
              <div>
                <CreatorProfileCard
                  key={profile.userId}
                  profile={profile}
                  action={
                    <Button
                      variant="contained"
                      onClick={() => history.push(`/profiles/${profile.id}`)}
                      endIcon={<EditIcon />}
                    >
                      {' '}
                      Edit
                    </Button>
                  }
                  decorativeAction={
                    <Button
                      onClick={() =>
                        history.push(`/profiles/recommondation/${profile.id}`)
                      }
                      endIcon={<ShareIcon />}
                    >
                      {' '}
                      Add Recommendation Page
                    </Button>
                  }
                />
                <CardDecoration
                  icon="✨"
                  text={
                    <Link to={`/profiles/recommondation/${profile.id}`}>
                      Activate Your Fan Base
                    </Link>
                  }
                  learn={
                    profile.isPublished ? (
                      <Button
                        size="small"
                        onClick={() =>
                          copyTextToClipboard(
                            `${window.location.origin}/recommendation/${profile.id}`,
                          )
                        }
                      >
                        Copy Link
                      </Button>
                    ) : (
                      <Link to={`/profiles/recommondation/${profile.id}`}>
                        <Button size="small">Create Link</Button>
                      </Link>
                    )
                  }
                />
              </div>
            </Grid>
          ) : null,
        )}
        {profiles.length === 0 ? (
          <Grid item xs={12}>
            <div className={classes.noProfiles}>
              <h3>You haven&apos;t created any profiles yet</h3>
              <p>
                To get started, add your first profile. After you&apos;ve
                created a profile you can assign it to books in your catalogue.
              </p>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => history.push(`/profiles/add`)}
              >
                Add Profile
              </Button>
            </div>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      {profiles.length > 0 && (
        <Grid item md={12} className={classes.activateCont}>
          <h2>Activate Your Fan Base</h2>
          <p>
            Tell your readers they can find you on Fanship, and recommend that
            they try it too. The more people are using Fanship to recommend and
            discover books, the more everybody in the writing community can
            benefit.
          </p>
          <ol>
            <li>Click “Activate Your Fan Base” above.</li>
            <li>
              Choose from two customizable message templates or write your own.
            </li>
            <li>Check the box to “Make my page live.”</li>
            <li>
              Invite your readers to join you on Fanship! Click “COPY LINK”
              above, then paste the link into your message app of choice. You
              can include a note to: Join me on Fanship. Earn Rewards. Support
              Writers. Discover your next favourite book.
            </li>
          </ol>
        </Grid>
      )}
    </Container>
  );
}
