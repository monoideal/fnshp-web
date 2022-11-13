import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50,
    fontSize: 18,
    lineHeight: 1.7,
    '& a': {
      textDecoration: 'underline',
    },
    '& img': {
      maxWidth: 900,
    },
  },
  header: {
    color: theme.palette.black.main,
    fontWeight: 'bold',
    fontSize: '40px',
    fontVariant: 'all-petite-caps',
  },
  footer: {
    color: theme.palette.black.main,
    margin: '10px 15px',
    fontStyle: 'italic',
    '& a': {
      textDecoration: 'underline',
      color: 'blue',
    },
  },
  small: {
    fontSize: 16,
    fontStyle: 'italic',
  },
}));

export default function AuthorHelp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <h1 className={classes.header}>How to get the most out of Fanship</h1>
        <h2>Welcome to Fanship!</h2>
        <p>Here are a few tips to help you make the most of your experience.</p>
        <h2>Spread the word to your readers, followers, and fans</h2>
        <p>
          The more readers interact with your work on Fanship, the more you’ll
          benefit from features like Applause, which enables authors and
          illustrators to earn more from ebook sales, and personal or
          organization-specific engagement graphs (pictured), which show how
          word-of-mouth recommendations are driving interest in your books.
        </p>
        <img src="/img/help-conversions.png" alt="Conversion Graph" />
        <p>
          Through your preferred channels (Twitter, Facebook, Instagram, blog,
          eNews), let your readers know they can find your books on Fanship, and
          that when they join Fanship as a Fan they can:
        </p>
        <ul>
          <li>
            Recommend books they love using a link that is unique to them;
          </li>
          <li>Earn reward points for every book they purchase on Fanship;</li>
          <li>
            Earn reward points for every personal recommendation they make that
            results in a sale;
          </li>
          <li>
            Watch their own engagement graphs to see how their recommendations
            are helping new readers to discover the books they love;
          </li>
          <li>
            Use their reward points to get free ebooks or donate to a literary
            charity.
          </li>
        </ul>
        <p>
          The more you encourage readers to interact with your work on Fanship,
          the more benefits you’ll see on your Dashboard.
        </p>
        <h2>
          Do I need to manually update my catalogue every time I publish a new
          book?
        </h2>
        <p>
          <strong>Traditionally published authors:</strong> No, when new titles
          by you are uploaded by your publisher(s), we'll update your catalogue
          for you. You can also update it manually at any time.
        </p>
        <p>
          <strong>Independent authors:</strong> Yes, you'll need to upload your
          new book and add it to your catalogue.
        </p>
        <p>
          Have other questions we didn’t answer here? Try our <FanFAQLink />.
        </p>
      </Grid>
    </Grid>
  );
}

const FanFAQLink = () => <Link to="/faq-authors">FAQs</Link>;
