import React from 'react';
import PropTypes from 'prop-types';
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

export default function ProfileEditPage({ match }) {
  const classes = useStyles();
  const {
    params: { id },
  } = match;

  return (
    <Container maxWidth="md" className={classes.container}>
      <BreadcrumbLink text="My Profiles" to="/profiles" />
      <h1>Edit Profile</h1>
      <ProfileForm id={id} destination="/profiles" />
    </Container>
  );
}

ProfileEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};
