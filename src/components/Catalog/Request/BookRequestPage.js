import React, { useState, useEffect } from 'react';
import history from 'lib/history';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useApi } from 'api/';
import BookCard from 'components/shared/BookCard';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  searchContainer: {
    display: 'flex',
    margin: theme.spacing(3, 0),
    '& button': {
      borderRadius: '0 4px 4px 0',
      fontWeight: 'bold',
      boxShadow: 'none',
    },
  },
  searchText: {
    '& input': {
      padding: 14,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px 0 0 4px',
    },
  },
  tooManyResults: {
    width: '100%',
    textAlign: 'center',
  },
}));

export default function BookRequestPage() {
  const { fanshipUser } = React.useContext(AppContext);
  const classes = useStyles();
  const api = useApi();
  const [searchString, setSearchString] = useState([]);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 12;

  const findPathByUserType = () =>
    fanshipUser.isSuperuser ? 'admin' : 'catalog';

  useEffect(() => {
    const fetchData = async () => {
      if (!fanshipUser.isSuperuser) {
        const profiles = await api.fetchCreatorProfiles();
        if (profiles.length === 0)
          history.push(`/catalog/book-request/profile-add`);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const result = await api.fetchBooks({
        searchString,
        page: 1,
        itemsPerPage,
      });
      setBooks(result.books);
      setTotalBooks(result.totalBooks);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleText = event => {
    setSearchString(event.target.value);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <h1>Request to Add a Book to My Catalogue</h1>
      <p>Search for a book by title, ISBN, or author name.</p>

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
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>

      <Grid container>
        {isLoading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <React.Fragment>
            {books.length > 0 && (
              <h3>Select the book you’d like add to your catalogue</h3>
            )}
            <Grid container spacing={3}>
              {books.map(book => (
                <Grid key={book.id} item md={4} xs={12}>
                  <BookCard
                    book={book}
                    action={
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          history.push(
                            `/${findPathByUserType()}/book-request/${book.id}`,
                          )
                        }
                      >
                        Select Book
                      </Button>
                    }
                  />
                </Grid>
              ))}
              {totalBooks > 12 && (
                <p className={classes.tooManyResults}>
                  Search return more than 12 results. You may need to be more
                  detailed in your keyword search.
                </p>
              )}
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Container>
  );
}
