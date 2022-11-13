import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ProfileForm from 'components/Profiles/Edit/ProfileForm';
import BreadcrumbLink from 'components/shared/BreadcrumbLink';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    '& .MuiTextField-root': {
      flexBasis: '30%',
      margin: theme.spacing(1),
    },
  },
  biography: {
    flexBasis: '100% !important',
  },
}));

export default function BookRequestProfileAddPage() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <BreadcrumbLink text="My Catalogue" to="/catalog" />
      <h1>Add a book to My Catalogue</h1>
      <h2>First, let’s get your started by creating your public profile</h2>
      <p>
        You will have the opportunity to add this public profile to your books
        on Fanship (this is a required step).
      </p>
      <ProfileForm destination="/catalog/book-request" />
    </Container>
  );
}
