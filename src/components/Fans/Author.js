import React from 'react';
import clsx from 'clsx';
import history from 'lib/history';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { generateFallbackAvatar } from 'util/helpers';

const useStyles = makeStyles(theme => ({
  image: {
    width: '142px',
    height: '142px',
  },
  text: {
    overflow: 'hidden',
    maxWidth: '162px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  title: {
    marginTop: '10px',
  },
  searchLink: {
    marginTop: '5px',
    color: theme.palette.darkOrange.main,
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function Author({ author }) {
  const classes = useStyles();
  const { id, displayName } = author;
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <img
          alt={displayName}
          src={
            author.avatar ? author.avatar : generateFallbackAvatar(displayName)
          }
          className={classes.image}
        />
      </Grid>
      <Grid item xs={12}>
        {author.id ? (
          <Box
            classes={{ root: clsx(classes.text, classes.searchLink) }}
            onClick={() => history.push(`fans/browse/authors/${author.id}`)}
          >
            {displayName}
          </Box>
        ) : (
          <Box classes={{ root: clsx(classes.text, classes.title) }}>
            {displayName}
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <Box
          fontSize={14}
          classes={{ root: classes.searchLink }}
          onClick={() => history.push(`/books?profileId=${id}`)}
        >
          Search Books
        </Box>
      </Grid>
    </Grid>
  );
}

Author.propTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
    avatar: PropTypes.string,
    id: PropTypes.any,
  }).isRequired,
};
