import React from 'react';
import PropTypes from 'prop-types';
import history from 'lib/history';
import { Grid, Typography, Box } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from 'components/shared/Button';
import { isEmpty, get, map } from 'lodash';
import { generateFallbackAvatar, prefixHttpIfNotPresent } from 'util/helpers';
import { FACEBOOK_URL, TWITTER_URL, INSTAGRAM_URL } from 'util/constants';

const useStyles = makeStyles(theme => ({
  breadcrumbContainer: {
    background: theme.palette.grey.main,
    fontSize: 14,
    paddingLeft: 30,
  },
  breadcrumb: {
    padding: '10px 5px',
  },
  container: {
    padding: '30px 100px',
    [theme.breakpoints.down('xs')]: {
      padding: '30px 50px',
    },
  },
  image: {
    width: '100%',
    '& img': {
      width: '100%',
      padding: '45px 0px',
    },
  },
  content: {
    flex: 1,
  },
  authorHeader: {
    fontFamily: 'Rubik',
    fontSize: '26px',
    fontWeight: 'bold',
    padding: '20px 0px 30px 0px',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.2',
    letterSpacing: '1.3px',
    color: '#383e41',
  },
  buttonIcon: {
    marginLeft: 8,
    marginRight: 12,
  },
  imgPadding: {
    paddingBottom: '15px',
  },
  contentPadding: {
    paddingBottom: '40px',
  },
  buttons: {
    margin: '30px 0',
  },
  button: {
    width: '100%',
    color: theme.palette.black.main,
    borderWidth: 2,
    '&:hover': {
      background: theme.palette.white.main,
      borderWidth: 2,
    },
  },
  searchButton: {
    padding: '16px 0px',
  },
  imgSize: {
    width: '222px',
  },
  socialMediaLinks: {
    display: 'inline-block',
    border: 'none',
    background: 'none',
    color: theme.palette.darkOrange.main,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  socialMedia: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function Breadcrumbs({ authorName = '' }) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="flex-start"
      className={classes.breadcrumbContainer}
    >
      <Grid item className={classes.breadcrumb}>
        <Link to="/">Home</Link>
      </Grid>
      <Grid item className={classes.breadcrumb}>
        /
      </Grid>
      <Grid item className={classes.breadcrumb}>
        {authorName || ''}
      </Grid>
    </Grid>
  );
}
Breadcrumbs.propTypes = {
  authorName: PropTypes.string.isRequired,
};

const generateSocialUrl = (type, value) => {
  switch (type) {
    case 'facebook':
      return `${FACEBOOK_URL}${value}`;
    case 'twitter':
      return `${TWITTER_URL}${value}`;
    case 'instagram':
      return `${INSTAGRAM_URL}${value}`;
    default:
      return prefixHttpIfNotPresent(value);
  }
};

function BookAuthorDetails({ author }) {
  const classes = useStyles();
  const fullName = `${author.firstName} ${
    author.middleName ? author.middleName : ''
  } ${author.lastName}`;

  return isEmpty(author) ? (
    <h1>Not Found</h1>
  ) : (
    <>
      <Breadcrumbs authorName={fullName} />
      <Grid container justify="space-between" className={classes.container}>
        <Grid item md={3} sm={12} className={classes.image}>
          {get(author, 'avatar') ? (
            <img
              alt={fullName || ''}
              src={get(author, 'avatar')}
              className={classes.imgSize}
            />
          ) : (
            <img
              alt={fullName || ''}
              src={generateFallbackAvatar(fullName)}
              className={classes.imgSize}
            />
          )}
        </Grid>
        <Grid item md={8} sm={12} className={classes.content}>
          <Typography className={classes.authorHeader}>{fullName}</Typography>
          <Typography className={classes.contentPadding}>
            {isEmpty(get(author, 'bio')) ? 'No bio found' : get(author, 'bio')}
          </Typography>
          <Grid container>
            {isEmpty(get(author, 'socialMedia'))
              ? null
              : map(Object.entries(author.socialMedia), (data, index) => {
                  if (!isEmpty(data[1])) {
                    return (
                      <Grid
                        item
                        xs={12}
                        className={classes.imgPadding}
                        key={index}
                      >
                        <Grid container>
                          <Grid item xs={12} className={classes.socialMedia}>
                            <Box component="div" display="inline">
                              {/* Here key should match the image being imported */}
                              <img
                                alt={data[0]}
                                src={
                                  `/img/social_media/${data[0]}.png` ||
                                  generateFallbackAvatar(fullName)
                                }
                                className={classes.buttonIcon}
                                width="27"
                              />
                            </Box>
                            <Box component="div" display="inline">
                              <a
                                href={generateSocialUrl(data[0], data[1])}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.socialMediaLinks}
                              >
                                <Typography>{fullName}</Typography>
                              </a>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  }
                  return null;
                })}
            <Grid item xs={12} sm={6} className={classes.searchButton}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => history.push(`/books?profileId=${author.id}`)}
              >
                SEARCH MY BOOKS
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

BookAuthorDetails.propTypes = {
  author: PropTypes.object,
};

BookAuthorDetails.defaultProps = {
  author: {},
};

export default withRouter(BookAuthorDetails);
