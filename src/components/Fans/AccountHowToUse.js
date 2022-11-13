import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    lineHeight: '1.7em',
    '& h1': {
      marginBottom: 24,
      fontWeight: 'bold',
      fontSize: 22,
      color: theme.palette.darkPurple.main,
    },
    '& h2': {
      fontSize: 18,
    },
    '& img': {
      maxWidth: '100%',
    },
    '& a': {
      textDecoration: 'underline',
    },
  },
  bigger: {
    marginTop: 40,
    fontSize: 20,
  },
}));

const AccountHowToUse = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <h1>How to Use Fanship</h1>
        <h2>Recommend Books</h2>
        <ul>
          <li>
            Find <Link to="/books/all">books</Link> you’ve already read and
            loved.
            <p>
              <img
                width="550"
                src="/img/how-to-use-fanship-1.png"
                alt="Examples of books to find"
              />
            </p>
          </li>
          <li>
            Click the “Recommend” button to generate a link that is unique to
            you.
          </li>
          <li>
            Share your recommendation link via email, Facebook Messenger,
            WhatsApp or text message with friends, family members or co-workers
            you think will love a book as much as you.
          </li>
          <li>
            You can also post your book recommendation link on Facebook or
            Twitter or in your blog.
          </li>
          <li>
            Visit <Link to="/fans/my-recommendations">My Recommendations</Link>,
            where personal Engagement Graphs show how your influence is helping
            your favourite books to find new readers, and earning{' '}
            <Link to="/fans/account/rewards">reward points</Link> for you.
            <p>
              <img
                width="550"
                src="/img/how-to-use-fanship-2.png"
                alt="Examples of books to find"
              />
            </p>
          </li>
        </ul>
        <h2>Earn Rewards</h2>
        <ul>
          <li>
            Earn <Link to="/fans/account/rewards">reward points</Link> for every
            book you purchase and for every recommendation you make that results
            in a sale.
          </li>
          <li>
            Use your <Link to="/fans/account/rewards">reward points</Link> to
            get free ebooks, or <Link to="/fans/account/rewards">donate</Link>{' '}
            them to a literary charity.
          </li>
          <li>
            Keep track of your rewards in{' '}
            <Link to="/fans/account/rewards">My Account</Link>.
          </li>
        </ul>
        <h2>Support Authors</h2>
        <ul>
          <li>
            Make recommendations to help your favourite books and authors find
            new readers.
          </li>
          <li>
            When you buy a book on Fanship, “Applaud the Author” at checkout.
            This one-time contribution is an impactful gesture that goes
            directly to the author.
          </li>
        </ul>
        <p className={classes.bigger}>
          Have other questions we didn’t answer here? Try our{' '}
          <Link to="/faq-fans">FAQs</Link>.
        </p>
      </div>
    </>
  );
};

AccountHowToUse.propTypes = {};

export default AccountHowToUse;
