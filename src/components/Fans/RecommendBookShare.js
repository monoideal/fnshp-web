import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import url from 'url';
import ReactGA from 'react-ga';
import { Grid, Box, Divider, IconButton, Snackbar } from '@material-ui/core';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookMessengerShareButton,
  EmailShareButton,
  FacebookMessengerIcon,
  EmailIcon,
} from 'react-share';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useApi } from 'api/';
import ShareButton from 'components/shared/ShareButton';
import { AppContext } from 'components/AppContext';

const shareButtons = [
  ['facebook', FacebookMessengerShareButton, FacebookMessengerIcon],
  ['email', EmailShareButton, EmailIcon],
];

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '20px',
  },
  bookCover: {
    width: '100%',
    maxHeight: '200px',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      maxHeight: '100px',
    },
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  divider: {
    margin: '30px 5px',
  },
  shareContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  copyToClipboardContainer: {
    margin: '10px',
    [theme.breakpoints.down('md')]: {
      margin: '10px 0 0 0',
    },
  },
  copyIcon: {
    color: theme.palette.black.main,
  },
  shareLink: {
    color: theme.palette.darkOrange.main,
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  shareButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: '16px',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

function generateLink(bookId, recommendationId) {
  const parsedQs = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  const parsedUrl = url.parse(
    `${window.location.protocol}//${window.location.host}/book/${bookId}`,
  );

  parsedQs.rid = recommendationId;
  parsedUrl.search = qs.stringify(parsedQs);

  return url.format(parsedUrl);
}

export default function RecommendBookShare({ book }) {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendation, setRecommendation] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const deviceWidth = useTheme();
  const desktopView = useMediaQuery(deviceWidth.breakpoints.up('md'));
  const { fanshipUser } = React.useContext(AppContext);
  const classes = useStyles();
  const { createRecomendation } = useApi();
  const user = fanshipUser;

  const contributors = book.contributors ? book.contributors : book.authors;
  const authorsDisplayName = contributors
    ? contributors
        .filter(c => c.contributorType === 'AUTHOR')
        .map(a => a.displayName)
        .join(', ')
    : '';
  const link = generateLink(book.id, recommendation.id);
  const shareTitle = `Check out this book: “${book.title}"`;
  const shareBody = `Hi, I loved this book and think you will too.

“${book.title} by ${authorsDisplayName}”                                 

Check it out on Fanship:`;

  useEffect(() => {
    async function initialize() {
      try {
        setRecommendation(await createRecomendation(book.id));
      } catch (err) {
        console.log(err);
      } finally {
        ReactGA.event({
          category: 'Recommend',
          action: `Created recommend link for book ID ${book.id}`,
        });
        setIsLoading(false);
      }
    }
    initialize();
  }, [createRecomendation]);

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  }

  if (isLoading) return 'Loading...';
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <div style={{ height: '100%' }}>
            <img
              alt="book-cover"
              className={classes.bookCover}
              src={book.coverUrl}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={9} className={classes.descriptionContainer}>
          <Box
            fontSize={{ xs: 17, md: 31 }}
            marginBottom={{ xs: 2, md: 0 }}
            fontWeight="fontWeightBold"
          >
            {`${user.fan.username}'s Recommendation`}
          </Box>
          <Box fontSize={{ xs: 17, md: 20 }}>{book.title}</Box>
          <Box fontSize={{ xs: 14, md: 17 }}>{`by ${authorsDisplayName}`}</Box>
        </Grid>
      </Grid>
      <Divider variant="middle" className={classes.divider} />
      <div className={classes.shareContainer}>
        <Box fontSize={{ xs: 14, md: 17 }} fontWeight="fontWeightBold">
          This is your unique link. Share it with anyone you think will enjoy
          this book as much as you. Use the buttons below or copy and paste this
          link into your message app of choice.
        </Box>
        <div className={classes.copyToClipboardContainer}>
          <CopyToClipboard text={link} onCopy={() => setIsSnackbarOpen(true)}>
            <div>
              <span className={classes.shareLink}>{link}</span>
              <IconButton>
                <CopyIcon className={classes.copyIcon} />
              </IconButton>
            </div>
          </CopyToClipboard>
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Copied to clipboard"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          />
        </div>
        <Box fontSize="14px">or</Box>
        <div className={classes.shareButtons}>
          {desktopView ? (
            <>
              {shareButtons.map(([key, Button, Icon]) => (
                <Button
                  key={key}
                  url={link}
                  title={shareTitle}
                  subject={shareTitle}
                  body={shareBody}
                >
                  <Icon round size={32} />
                </Button>
              ))}
            </>
          ) : (
            <ShareButton
              config={{
                params: {
                  title: shareTitle,
                  text: shareBody,
                  url: link,
                },
              }}
              style={classes.button}
            >
              Share this link!
            </ShareButton>
          )}
        </div>
        <Box fontStyle="italic" fontSize={{ xs: 14, md: 17 }}>
          {`Thank you, ${user?.fan?.username},  for helping new readers discover "${book.title}".`}
        </Box>
      </div>
    </div>
  );
}

RecommendBookShare.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    coverUrl: PropTypes.string,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    contributors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    isbn: PropTypes.string,
  }).isRequired,
};
