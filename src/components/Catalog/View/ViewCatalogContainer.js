import React from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import history from 'lib/history';
import ViewCatalogOwnedTable from './ViewCatalogOwnedTable';
import ViewCatalogMatchedTable from './ViewCatalogMatchedTable';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    '& h3 > strong': {
      fontWeight: 'bold',
      fontSize: '1.17em',
    },
    '& h3': {
      margin: '25px 0',
      fontWeight: 'normal',
      fontSize: '1em',
    },
    '& button': {
      fontWeight: 'bold',
    },
  },
}));

export default function Catalog() {
  const { fanshipUser } = React.useContext(AppContext);
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={3}>
        <Grid container justify="space-between" alignItems="baseline">
          <Grid item xs={12}>
            <h1>My Catalogue</h1>
          </Grid>
          {!fanshipUser.limitedAccess && (
            <React.Fragment>
              <Grid item>
                <h3>
                  <strong>Upload books you own and manage</strong>
                </h3>
              </Grid>
              <Grid item>
                <Link to="/catalog/new/monetize">
                  <Button variant="contained" color="primary">
                    Upload New Book
                  </Button>
                </Link>
              </Grid>
              <ViewCatalogOwnedTable />
            </React.Fragment>
          )}
        </Grid>
        {fanshipUser.creator && (
          <React.Fragment>
            <Grid container justify="space-between" alignItems="baseline">
              <Grid item>
                <h3>
                  <strong>Add books uploaded by your publisher</strong>
                </h3>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => history.push('/catalog/book-request')}
                >
                  Add book
                </Button>
              </Grid>
            </Grid>

            <ViewCatalogMatchedTable />
          </React.Fragment>
        )}
      </Grid>
    </Container>
  );
}
