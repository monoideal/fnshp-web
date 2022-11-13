import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import clsx from 'clsx';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { Grid, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import history from 'lib/history';
import { generateFallbackAvatar, containTextToLength } from 'util/helpers';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    background: theme.palette.paleYellow.main,
    minHeight: theme.fanSite.tombstoneMinHeight('featured'),
    padding: '80px 44px 70px',
    margin: '70px 0 60px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 40,
      textAlign: 'center',
    },
  },
  image: {
    maxWidth: '220px',
    maxHeight: '330px',
    width: '100%',
  },
  content: {
    flex: 1,
  },
  link: {
    color: theme.palette.darkOrange.main,
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  textElement: {
    marginTop: '20px',
  },
  authorPromoteButton: {
    display: 'block',
    position: 'absolute',
    bottom: 20,
    right: 20,
    margin: 0,
    padding: 0,
    border: 'none',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: '1.5',
    textTransform: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function TextContent({ author }) {
  const classes = useStyles();
  const { displayName, bio } = author || {};
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Box fontWeight="fontWeightBold" fontSize="29px">
          Meet Fanship authors
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box fontSize="26px" classes={{ root: classes.textElement }}>
          {displayName}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box classes={{ root: classes.textElement }}>
          {containTextToLength(bio, 600)}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          classes={{ root: clsx(classes.link, classes.textElement) }}
          // NOTE this will be a regular link once we have search
          onClick={() => history.push(`fans/browse/authors/${author.id}`)}
        >
          Learn more
        </Box>
      </Grid>
    </Grid>
  );
}

TextContent.propTypes = {
  author: PropTypes.shape({
    id: PropTypes.any,
    displayName: PropTypes.string,
  }).isRequired,
};

export default function FeaturedAuthor({ author, isLoading }) {
  const classes = useStyles();
  const { displayName, avatar } = author || {};
  const { loginWithRedirect } = useAuth0();

  return (
    <Grid container direction="row" classes={{ root: classes.container }}>
      {isLoading && 'Loading...'}
      {!isLoading && (
        <>
          <Grid item sm={4} xs={12}>
            <img
              alt="featured-author"
              src={avatar || generateFallbackAvatar(displayName)}
              className={classes.image}
            />
          </Grid>
          <Grid item sm={8} xs={12} classes={{ root: classes.content }}>
            <TextContent author={author} />
          </Grid>
          <Button
            className={classes.authorPromoteButton}
            onClick={() => {
              ReactGA.event({
                category: 'User',
                action: 'Clicked Join Fanship',
              });
              loginWithRedirect()
            }}
          >
            <strong>See your book on Fanship?</strong>
            <br />
            Create your author profile and get featured on Fanship.
          </Button>
        </>
      )}
    </Grid>
  );
}

FeaturedAuthor.propTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
