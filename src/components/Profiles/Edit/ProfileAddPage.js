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

export default function ProfileEditPage() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <BreadcrumbLink text="My Profiles" to="/profiles" />
      <h1>Create Profile</h1>
      <ProfileForm destination="/profiles" />
    </Container>
  );
}
