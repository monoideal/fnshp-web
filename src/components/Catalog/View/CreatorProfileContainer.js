import React from 'react';
import PropTypes from 'prop-types';
import history from 'lib/history';
import { Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreatorProfileCard from 'components/shared/CreatorProfileCard';

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 2px 0 rgba(0, 0, 0, 0.08)',
    borderRadius: '2px',
    borderColor: '#dcdd5c',
  },
}));

export default function CreatorProfileContainer({ contributors, bookId }) {
  const classes = useStyles();

  return (
    <Grid container xs={12} className={classes.container}>
      <Grid item xs={12}>
        <Typography className={classes.heading}>Profiles</Typography>
      </Grid>
      <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={() => history.push(`/catalog/book-request/${bookId}`)}
      >
        Add my profile
      </Button>
      {contributors &&
        contributors.map(contributor => (
          <Grid item xs={12} md={6}>
            <CreatorProfileCard profile={contributor} />
          </Grid>
        ))}
    </Grid>
  );
}

CreatorProfileContainer.propTypes = {
  contributors: PropTypes.shape([{}]).isRequired,
  bookId: PropTypes.number.isRequired,
};
