import React, { useState, useEffect } from 'react';
import history from 'lib/history';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Grid, Button, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { useApi } from 'api/';
import { useAuth0 } from "@auth0/auth0-react";
import BookCard from 'components/shared/BookCard';
import CreatorProfileCard from 'components/shared/CreatorProfileCard';
import BreadcrumbLink from 'components/shared/BreadcrumbLink';
import SearchIcon from '@material-ui/icons/Search';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    '& button': {
      fontWeight: 'bold',
    },
  },
  submit: {
    marginTop: 10,
  },
  errorContainer: {
    '& > div > h3': {
      marginTop: 0,
    },
    '& > div': {
      padding: 20,
      border: '1px solid red',
      borderRadius: '5px',
      backgroundColor: '#fff3f3',
    },
  },
}));

export default function BookRequestMatchPage() {
  const classes = useStyles();
  const api = useApi();
  const { user } = useAuth0();
  const { fanshipUser } = React.useContext(AppContext);
  const { isSuperuser } = fanshipUser;
  const { bookId, owned } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contributorId, setContributorId] = useState(null);
  const [profiles, setProfiles] = useState([{}]);
  const [profileId, setProfileId] = useState(null);

  const backUrl = isSuperuser ? '/admin/book-request' : '/catalog/book-request';
  const returnUrl = isSuperuser ? '/admin/profile-requests' : '/catalog';

  // Admin state
  const [profilesSearchText, setProfilesSearchText] = useState([{}]);

  useEffect(() => {
    async function initialize() {
      try {
        // If it's a booked owned by the user, use the creator fetch
        // since the public fetch will only return books on sale
        const tempbook =
          owned === 'owned'
            ? await api.fetchOneCreatorBook(bookId)
            : await api.fetchBook(bookId);

        setBook(tempbook.book ? tempbook.book : tempbook);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, [bookId, api]);

  useEffect(() => {
    const fetchData = async () => {
      if (!fanshipUser.isSuperuser) {
        setProfiles(await api.fetchCreatorProfiles());
      }
    };
    fetchData();
  }, []);

  const handleContributorSelect = event => {
    setContributorId(event.target.value);
  };

  const handleProfileSelect = id => {
    setProfileId(id);
  };

  const handleText = event => {
    setProfilesSearchText(event.target.value);
  };

  const handleAdminProfileSearch = async () => {
    try {
      setProfiles(await api.fetchProfilesForAdmin(profilesSearchText));
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookRequest = async () => {
    try {
      await api.createBookProfileRequest({
        profileId: parseInt(profileId, 10),
        bookId: parseInt(bookId, 10),
        alId: contributorId,
      });
      toast.success('Successfully created book request');
      history.push(returnUrl);
    } catch (err) {
      console.log(err);
      toast.error('Failed to created profile');
    }
  };

  const handleAdminAddBook = async () => {
    try {
      await api.adminAddProfileToBook({
        profileId: parseInt(profileId, 10),
        bookId: parseInt(bookId, 10),
        alId: contributorId,
      });
      toast.success('Successfully added profile to book');
      history.push(returnUrl);
    } catch (err) {
      console.log(err);
      toast.error('Failed to add profile to book');
    }
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <BreadcrumbLink text="Select a different book" to={backUrl} />
      <h1>Add a book to My Catalogue</h1>

      <Grid container spacing={3}>
        {isLoading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          book && (
            <React.Fragment>
              <Grid item md={4} xs={12}>
                <BookCard book={book} />
              </Grid>
              {book.contributors && book.contributors.length > 0 ? (
                <Grid item xs={12}>
                  <h3>Select your name from the list of contributors:</h3>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={contributorId}
                    onChange={handleContributorSelect}
                  >
                    {book.contributors.map(contrib => (
                      <FormControlLabel
                        value={contrib.alId}
                        key={contrib.alId}
                        control={<Radio color="primary" />}
                        label={`${contrib.displayName} ${
                          contrib.contributorType
                            ? `(${contrib.contributorType.toLowerCase()})`
                            : ''
                        }`}
                      />
                    ))}
                  </RadioGroup>
                </Grid>
              ) : (
                <Grid item xs={12} className={classes.errorContainer}>
                  <div>
                    <h3>There are no contributors for this book</h3>
                    <p>
                      It doesn&apos;t look like there were any contributors
                      added to this book. To add a profile, the book must have
                      you listed as a contributor.
                    </p>
                  </div>
                </Grid>
              )}
            </React.Fragment>
          )
        )}
        <Grid item xs={12}>
          <h3>Select which public profile we should display for this book:</h3>
        </Grid>
        {isSuperuser && (
          <Grid item xs={12}>
            <Grid container className={classes.searchContainer}>
              <TextField
                required
                className={classes.searchText}
                id="password"
                variant="outlined"
                onChange={handleText}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.searchButton}
                endIcon={<SearchIcon>send</SearchIcon>}
                onClick={handleAdminProfileSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        )}

        {profiles.map(profile =>
          profile && profile.userId ? (
            <Grid
              item
              xs={6}
              key={profile.id}
              onClick={() => handleProfileSelect(profile.id)}
            >
              <CreatorProfileCard
                forAdmins
                raised={profile.id === profileId}
                key={profile.userId}
                profile={profile}
              />
            </Grid>
          ) : null,
        )}
        {profiles.length === 0 && !isSuperuser && (
          <Grid item xs={12} className={classes.errorContainer}>
            <div>
              <h3>You have not created a profile</h3>
              <p>
                It doesn&apos;t look like you have any profiles created. To
                complete this request, please create a profile.
              </p>
            </div>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() =>
                history.push(
                  `/profiles/add?redirect=/catalog/book-request/${bookId}`,
                )
              }
            >
              Create a profile
            </Button>
          </Grid>
        )}
        {profiles.length === 0 && isSuperuser && (
          <Grid item xs={12} className={classes.errorContainer}>
            <div>
              <h3>No profiles found matching your search keywords.</h3>
            </div>
          </Grid>
        )}

        <Grid item xs={12}>
          {isSuperuser ? (
            <Button
              disabled={!contributorId || !profileId}
              size="large"
              color="primary"
              variant="contained"
              onClick={handleAdminAddBook}
              className={classes.submit}
            >
              Add profile to book
            </Button>
          ) : (
            <Button
              disabled={!contributorId || !profileId}
              size="large"
              color="primary"
              variant="contained"
              onClick={handleBookRequest}
              className={classes.submit}
            >
              Link Profile to Book
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
