import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from 'components/shared/Button';
import Header from 'components/Catalog/HeaderWithBreadcrumbs';

const useStyles = makeStyles(theme => ({
  paper: {
    boxSizing: 'border-box',
  },
  title: {
    padding: '30px 20px 0',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    color: theme.palette.black.main,
    marginBottom: '30px',
    borderWidth: '2px',
    '&:hover': {
      borderWidth: '2px',
    },
  },
  link: {
    margin: '50px 50px 20px 50px',
    color: 'Red',
    textDecoration: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLink: {
    margin: '0px 10px 0px 0px',
    fontWeight: 505,
    textDecoration: 'underline',
  },
  headerPadding: {
    paddingBottom: '15px',
  },
}));

function MonetizeNoConfirmation() {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.headerPadding}>
            <Header
              title="Add New Book"
              breadcrumbLinks={[{ to: '/catalog', text: 'Catalogue' }]}
            />
          </div>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <>
          <Grid container>
            <Grid item xs={12}>
              <Box fontSize="20px" classes={{ root: classes.title }}>
                You cannot upload the book. The person/organization with the
                right to monetize the work should upload the book and add you as
                a contributor
              </Box>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.link }}>
              <div>
                <a href="mailto:info@fanship.fan">Contact us</a>
              </div>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.buttonContainer }}>
              <Button
                color="primary"
                variant="outlined"
                classes={{ root: classes.button }}
              >
                <Link to="/catalog/">Back to my work</Link>
              </Button>
            </Grid>
          </Grid>
        </>
      </Paper>
    </>
  );
}

export default MonetizeNoConfirmation;
