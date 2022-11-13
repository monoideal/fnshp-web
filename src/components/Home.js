import React, { useState, useEffect } from 'react';
import { sample } from 'lodash';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { Grid, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import history from 'lib/history';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from 'api/';
import { shuffle } from 'util/helpers';
import GlobalContainer from 'components/Fans/GlobalContainer';
import FeaturedAuthor from 'components/Fans/FeaturedAuthor';
import PaginatedCollection from 'components/Fans/PaginatedCollection';
import Button from 'components/shared/Button';
import AlignedItems from 'components/shared/AlignedItems';
import Author from 'components/Fans/Author';
import Discovery from 'components/Discovery';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  community: {
    fontStyle: 'italic',
    color: '#c04800',
    fontFamily: 'Permanent Marker',
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'inline-block',
    lineHeight: '1',
  },
  hero: {
    width: '100%',
  },
  heroContent: {
    marginTop: 60,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  heroText1: {
    marginTop: '20px',
    fontWeight: 'bold',
  },
  heroText2: {
    fontSize: '15px',
    lineHeight: '1.5',
  },
  mobilePadding: {
    [theme.breakpoints.down('md')]: {
      padding: '0 20px',
    },
  },
  search: {
    marginTop: 30,
    width: '100%',
  },
  searchInput: {
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
      '& input': {
        borderRadius: 0,
      },
      '& fieldset': {
        borderColor: '#ffc555',
        '&:hover': {
          borderColor: '#ffc555!important',
        },
      },
    },
  },
  searchButton: {
    fontWeight: 500,
    backgroundColor: '#ffc555',
    padding: '15px 14px',
    borderRadius: 0,
    width: 95,
    '&:hover': {
      backgroundColor: '#ffc555',
    },
    '&:focus': {
      backgroundColor: '#ffc555',
    },
  },
  subhead: {
    marginTop: 50,
    [theme.breakpoints.down('md')]: {
      marginTop: 25,
      marginBottom: 25,
    },
  },
  aboutImage: {
    marginTop: 40,
    width: '100%',
  },
  aboutVideo: {
    maxWidth: '100%',
  },
  aboutContainer: {
    marginTop: 40,
    padding: 30,
    [theme.breakpoints.down('md')]: {
      padding: 20,
      marginTop: 0,
    },
  },
  aboutTitle: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  aboutDescription: {
    marginTop: 40,
    marginBottom: 60,
    [theme.breakpoints.down('md')]: {
      padding: 20,
      marginTop: 0,
      marginBottom: 0,
    },
  },
  aboutLink: {
    marginLeft: 15,
    color: theme.palette.darkOrange.main,
    textDecoration: 'underline',
    [theme.breakpoints.down('md')]: {
      textAlign: 'left',
    },
  },
  blurbWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  viewButtonContainer: {
    marginTop: 24,
  },
  discoveryWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  featuredAuthorsCont: {
    marginBottom: 40,
  },
}));

const blurbStyles = makeStyles(theme => ({
  container: {
    outline: `solid 1px ${theme.palette.grey.main}`,
    marginTop: 35,
    padding: 20,
    maxWidth: '50%',
    '&:first-child': {
      marginRight: 50,
    },
  },
  panelBody: {
    paddingTop: 0,
    outline: 'none',
  },
  image: {
    width: '100%',
  },
  title: {
    marginLeft: 20,
  },
  text: {
    marginLeft: 20,
  },
  link: {
    marginTop: 20,
    color: theme.palette.darkOrange.main,
    textDecoration: 'underline',
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      textAlign: 'left',
      marginLeft: 20,
    },
  },
  accordionItem: {
    marginBottom: 20,
  },
  cursorPointer: {
    cursor: 'pointer',
  },
}));

function Blurb({ title, text, image, link }) {
  const classes = blurbStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={3}>
        <img alt="blurb" src={image} className={classes.image} />
      </Grid>
      <Grid item xs={9}>
        <Box
          conmponent="div"
          className={classes.title}
          fontWeight="fontWeightBold"
        >
          {title}
        </Box>
        <Box conmponent="div" className={classes.text}>
          {text}
        </Box>
        <div className={classes.link}>
          <Link to={link} style={{ cursor: 'pointer' }}>
            Tell Me More
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}

Blurb.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

function BlurbAccordion({ title, text, image, link }) {
  const classes = blurbStyles();
  return (
    <ExpansionPanel className={classes.accordionItem}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container className={classes.panelBody} alignItems="center">
          <Grid item xs={3}>
            <img alt="blurb" src={image} className={classes.image} />
          </Grid>
          <Grid item xs={9}>
            <Box conmponent="div" className={classes.text}>
              {text}
            </Box>
            <div className={classes.link}>
              <Link to={link} style={{ cursor: 'pointer' }}>
                Tell Me More
              </Link>
            </div>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

BlurbAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const Home = () => {
  const classes = useStyles();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const api = useApi();

  // const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [featuredAuthor, setFeaturedAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    async function initialize() {
      try {
        const [fetchedAuthors] = await Promise.all([
          // Disabling book fetch temporarily
          // const [bookResult, fetchedAuthors] = await Promise.all([
          // api.fetchBooks(),
          api.fetchAuthors(),
        ]);
        // setBooks(bookResult.books);
        setAuthors(fetchedAuthors);
        setFeaturedAuthor(sample(fetchedAuthors));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, [api]);

  // retrieve current width
  function useWidth() {
    const keys = [...theme.breakpoints.keys].reverse();
    return (
      keys.reduce((output, key) => {
        return !output && desktopView ? key : output;
      }, null) || 'xs'
    );
  }

  const authorCollection = shuffle(
    authors.map(a => <Author key={a.displayName} author={a} />),
  );
  // const bookCollection = books.map(b => (
  //   <Book key={b.id} book={b} columnCount={4} />
  // ));
  let collectionPage;

  const width = useWidth();

  switch (width) {
    case 'xs':
      collectionPage = 2;
      break;
    case 'sm':
      collectionPage = 4;
      break;
    default:
      collectionPage = 6;
      break;
  }

  return (
    <GlobalContainer guest>
      <Grid container className={classes.mobilePadding}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container direction="column" className={classes.heroContent}>
            <Grid item xs={12}>
              <Box fontSize="30px" fontWeight="fontWeightBold">
                Harnessing&nbsp;
                <span className={classes.community}>word-of-mouth</span>
                &nbsp;
                <span className={classes.community}>recommendations</span>
                &nbsp;&nbsp;to&nbsp;
                <span className={classes.community}>discover</span>
                <br />
                &nbsp;your next favourite read
              </Box>
            </Grid>
            <Grid item xs={12} className={classes.viewButtonContainer}>
              <AlignedItems
                mobileJustify={desktopView ? 'flex-start' : 'space-evenly'}
                spacing={2}
                items={[
                  !isAuthenticated ? (
                    <Button
                      key="a"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        ReactGA.event({
                          category: 'User',
                          action: 'Clicked Join Fanship',
                        });
                        loginWithRedirect();
                      }}
                    >
                      JOIN FANSHIP
                    </Button>
                  ) : (
                    ''
                  ),
                  <Button
                    variant="contained"
                    color="primary"
                    key="recommend-books"
                    onClick={() => history.push('/books/all')}
                  >
                    BUY AND RECOMMEND BOOKS
                  </Button>,
                ]}
              />
              <div className={classes.heroText1}>
                Recommend books and earn rewards!
              </div>
              <p className={classes.heroText2}>
                When your book recommendations result in a sale, you earn points
                which can be redeemed for free books or can be donated to worthy
                causes.
              </p>
              <p>
                Fanship is in Beta. Try it out and tell us how we&apos;re doing.
                We&apos;re inviting you to be among the first to try
                something new.
              </p>
            </Grid>
          </Grid>
        </Grid>
        {desktopView ? (
          <Grid item xs={6}>
            <img
              className={classes.hero}
              alt="lander-illustrations"
              src="/img/lander_illustrations.png"
            />
          </Grid>
        ) : (
          ''
        )}

        <Discovery />
        <Grid item xs={12} className={classes.subhead}>
          <Box textAlign="center" fontSize="29px" fontWeight="fontWeightBold">
            Discover great books. Build your library. Recommend what you love.
          </Box>
        </Grid>
        {desktopView ? (
          <Box className={classes.blurbWrapper}>
            <Blurb
              title="Fans"
              text={
                <div>
                  Recommend your favourite books on Fanship to your friends.
                  <br />
                  <br />
                  Watch how your passion for a book makes a difference.
                </div>
              }
              image="/img/fans_illustrations.png"
              link="/faq-fans"
            />

            <Blurb
              title="Authors"
              text={
                <div>
                  Activate your fan base.
                  <br />
                  <br />
                  See how your fans’ word-of-mouth recommendations drive sales.
                </div>
              }
              image="/img/authors_illustrations.png"
              link="/faq-authors"
            />
          </Box>
        ) : (
          <>
            <Grid item xs={12}>
              <BlurbAccordion
                title="Fans"
                text={
                  <div>
                    Recommend your favourite books on Fanship to your friends.
                    <br />
                    <br />
                    Watch how your passion for a book makes a difference. ]
                  </div>
                }
                image="/img/fans_illustrations.png"
                link="/faq-fans"
              />
              <BlurbAccordion
                title="Authors"
                text={
                  <div>
                    Activate your fan base.
                    <br />
                    <br />
                    See how your fan’s word-of-mouth recommendations drive
                    sales.
                  </div>
                }
                image="/img/authors_illustrations.png"
                link="/faq-authors"
              />
            </Grid>
          </>
        )}

        {featuredAuthor ? (
          <FeaturedAuthor author={featuredAuthor} isLoading={isLoading} />
        ) : null}

        <Grid item xs={12} className={classes.featuredAuthorsCont}>
          <PaginatedCollection
            title="Featured Authors"
            collection={authorCollection}
            tombstoneType="author"
            pageSize={collectionPage}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6} className={classes.aboutImage}>
          <iframe
            title="fanship"
            className={classes.aboutVideo}
            width="456"
            height="347"
            src="https://www.youtube.com/embed/oAyGnaTWG5I?rel=0"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <div id="about" className={classes.aboutContainer}>
            <Box
              fontSize="29px"
              fontWeight="fontWeightBold"
              className={classes.aboutTitle}
            >
              Fanship - A place to discover your next great read and be rewarded
              for your great taste.
            </Box>
            <Box className={classes.aboutDescription}>
              Fanship is a new destination for book lovers. In the Fanship
              community, readers can share their great taste, earn rewards, and
              discover the great books they might not otherwise get to hear
              about.
              <br />
              <br />
              On Fanship, you can reach out to an individual and say, “I read
              this book and just know you’ll love it too.” That personal touch
              makes a big difference to whether a book finds a new reader, and
              it also makes a difference to you as you see how your
              recommendations are received. You can earn points to get free
              books or donate to a worthy cause.
              <br />
              <br />
              <strong>
                Share your great taste.
                <br />
                Recommend books. Earn rewards.
              </strong>
            </Box>
            <AlignedItems
              mobileJustify={desktopView ? 'flex-start' : 'space-between'}
              items={[
                !isAuthenticated ? (
                  <Button
                    key="a"
                    variant="contained"
                    color="primary"
                    onClick={() => loginWithRedirect()}
                  >
                    Join Fanship
                  </Button>
                ) : (
                  ''
                ),
                <Box key="box" className={classes.aboutLink}>
                  <Link to="/faq-fans" className={classes.cursorPointer}>
                    FAQs
                  </Link>
                </Box>,
              ]}
            />
          </div>
        </Grid>
      </Grid>

      {/* <CollectionWithBanner
        collection={bookCollection}
        tombstoneType="book"
        isLoading={isLoading}
        mobileJustify={desktopView ? 'space-between' : 'center'}
      /> */}
    </GlobalContainer>
  );
};

export default Home;
