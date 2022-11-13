import React, { useEffect, useState } from 'react';
import history from 'lib/history';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InlineLoader from 'components/shared/InlineLoader';
import PrimaryButton from 'components/shared/PrimaryButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { useApi } from 'api/';
import { getResizedImageWithCheck, fullname } from 'util/helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  container: {
    minHeight: '100vh',
    margin: '50px 0',
    textAlign: 'center',
    color: '#4E4E4E',
  },
  logo: {
    margin: '0 0 20px',
    '& > img': { width: 180 },
  },
  profileImageCont: {
    background:
      'url(/img/bubbles-background@2x.png) no-repeat center 14px, url(/img/fadded-background.png) repeat-x 0 -35px',
    backgroundSize: '293px 139px, 8px 218px',
    paddingBottom: 20,
  },
  profileImage: {
    width: 125,
    height: 125,
    border: '10px solid #FFC33B',
    borderRadius: '100%',
  },
  name: {
    '& > h1': {
      maxWidth: 600,
      margin: '0 auto 20px',
      padding: `0 ${theme.spacing(2)}px`, // recommended iOS gutters are 16px
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: 1.4,
      textAlign: 'center',
    },
  },
  headline: {
    '& > h2': {
      maxWidth: 600,
      margin: '0 auto 20px',
      padding: `0 ${theme.spacing(2)}px`, // recommended iOS gutters are 16px
      fontWeight: 'normal',
      fontSize: 24,
      lineHeight: 1.4,
    },
  },
  bio: {
    paddingBottom: 120,
    background: 'url(/img/bullseye@2x.png) no-repeat',
    backgroundSize: '290px 290px',
    backgroundPosition: 'center bottom',
    textAlign: 'left',
    '& > div': {
      maxWidth: 600,
      margin: '0 auto',
      padding: `0 ${theme.spacing(2)}px`, // recommended iOS gutters are 16px
      fontSize: 18,
      lineHeight: 1.7,
    },
    '& > div > div > div': {
      margin: '1em 0',
    },
  },
  booksCont: {
    width: '100%',
    margin: '-70px 0 0',
    padding: `0 ${theme.spacing(2)}px 120px`, // recommended iOS gutters are 16px
    background: 'url(/img/fadded-background.png) repeat-x',
    backgroundPosition: 'left bottom',
    '& > div': {
      maxWidth: 600,
      margin: '0 auto',
    },
  },
  books: {
    '& img': {
      maxWidth: '90%',
    },
  },
  recommendButton: {
    marginTop: 5,
    padding: '5px 8px',
    backgroundColor: 'white',
    fontSize: 12,
    textTransform: 'none',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      padding: '5px 15px',
      fontSize: 14,
    },
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  join: {
    marginTop: '-70px',
    paddingBottom: 120,
    background: 'url(/img/fadded-background.png) repeat-x',
    backgroundPosition: 'left bottom',
    textAlign: 'center',
    '& div': {
      maxWidth: 375,
      margin: 'auto',
      '& > img': {
        width: 219,
        height: 183,
      },
      '& > h3': {
        fontSize: 24,
      },
      '& > p': {
        fontSize: 18,
        lineHeight: 1.7,
      },
    },
  },
  profileLink: {
    maxWidth: 375,
    margin: '-100px auto 40px',
    padding: `0 ${theme.spacing(2)}px`, // recommended iOS gutters are 16px
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImageSmall: {
    width: 82,
    height: 82,
    border: '6px solid #FFC33B',
    borderRadius: '100%',
  },
  bookCont: {
    margin: '0 0 20px',
  },
  socialLinks: {
    marginBottom: 10,
    textAlign: 'center',
    '& img': {
      width: 40,
      height: 40,
      margin: '0 10px',
    },
  },
}));

const createMarkup = html => ({ __html: html });

export default function ProfileRecommendPage({ match }) {
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [books, setBooks] = useState([]);
  const {
    params: { id },
  } = match;
  const classes = useStyles();
  const facebookURL =
    profile && profile.socialMedia && profile.socialMedia.facebook
      ? `https://www.facebook.com/${profile.socialMedia.facebook}`
      : null;
  const twitterURL =
    profile && profile.socialMedia && profile.socialMedia.twitter
      ? `https://twitter.com/${profile.socialMedia.twitter}`
      : null;
  const instagramURL =
    profile && profile.socialMedia && profile.socialMedia.instagram
      ? `https://www.instagram.com/${profile.socialMedia.instagram}`
      : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          setProfile(await api.fetchAuthorDetails(id));
          setBooks(await api.fetchBooksByProfileId(id));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <InlineLoader />;
  if (profile && !profile.isPublished) return null;
  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.logo}>
          <img src="/img/logo.png" alt="Fanship Logo" />
        </Grid>
        <Grid item xs={12} className={classes.profileImageCont}>
          <img
            className={classes.profileImage}
            src={getResizedImageWithCheck(profile.avatar, 250)}
            alt={profile.name}
          />
        </Grid>
        <Grid item xs={12} className={classes.socialLinks}>
          {facebookURL && (
            <a href={facebookURL} target="_blank">
              <img src="/img/facebook.png" alt="Facebook Link" />
            </a>
          )}
          {twitterURL && (
            <a href={twitterURL} target="_blank">
              <img src="/img/twitter.png" alt="Twitter Link" />
            </a>
          )}
          {instagramURL && (
            <a href={instagramURL} target="_blank">
              <img src="/img/instagram.png" alt="Instagram Link" />
            </a>
          )}
        </Grid>

        <Grid item xs={12} className={classes.name}>
          <h1>
            {fullname(profile.firstName, profile.middleName, profile.lastName)}
          </h1>
        </Grid>

        <Grid item xs={12} className={classes.headline}>
          <h2>{profile.exclusiveHeadline}</h2>
        </Grid>

        <Grid item xs={12} className={classes.bio}>
          <div dangerouslySetInnerHTML={createMarkup(profile.exclusiveBio)} />
        </Grid>
        <div className={classes.booksCont}>
          <Grid
            container
            className={classes.books}
            direction="row"
            justify=""
            alignItems="flex-end"
          >
            {books &&
              books.map(book => (
                <Grid key={book.id} item xs={6} className={classes.bookCont}>
                  <Link to={`/book/${book.id}?rid=${book.recommendationId}`}>
                    <img
                      src={getResizedImageWithCheck(book.coverUrl, 250)}
                      alt={book.title}
                    />
                    <Button
                      className={classes.recommendButton}
                      variant="outlined"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() =>
                        history.push(
                          `/book/${book.id}?rid=${book.recommendationId}`,
                        )
                      }
                    >
                      Start Recommending
                    </Button>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </div>
        <Grid item xs={12} className={classes.join}>
          <div>
            <img src="/img/woman-on-books-small@2x.png" alt="Woman on books" />
            <h3>Join Fanship</h3>
            <p>
              It’s easy! Start recommending my books to your friends, family,
              and colleagues.
            </p>
            <PrimaryButton onClick={() => history.push(`/onboarding`)}>
              Get Started
            </PrimaryButton>
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.profileLink} direction="row">
        <Grid item xs={4}>
          <Link to={`/fans/browse/authors/${id}`}>
            <img
              className={classes.profileImageSmall}
              src={getResizedImageWithCheck(profile.avatar, 250)}
              alt={profile.name}
            />
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Link to={`/fans/browse/authors/${id}`}>
            <h4>Checkout my author profile on Fanship!</h4>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
