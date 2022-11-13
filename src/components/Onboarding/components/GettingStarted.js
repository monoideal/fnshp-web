import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from 'components/shared/PrimaryButton';

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(3),
    maxWidth: 800,
    lineHeight: 1.6,
    '& h2': {
      fontSize: 18,
    },
    '& p': {
      width: '100%',
      fontSize: 16,
      fontWeight: 'normal',
    },
    '& ol': {
      marginTop: 0,
      paddingLeft: 20,
      fontSize: 24,
      fontWeight: 'bold',
    },
    '& li': { paddingLeft: 10 },
    '& > div': {
      textAlign: 'center',
    },
    '& img': {
      display: 'block',
      width: '100%',
      height: 'auto',
    },
  },
  introText: {
    margin: `${theme.spacing(4)} 0`,
    fontSize: '24px !important',
  },
  introImage: {
    '& > div': {
      maxWidth: 454,
      margin: '0 auto',
    },
  },
  applaudImage: {
    '& > div': {
      maxWidth: 493,
      margin: '0 auto',
    },
  },
  salesImage: {
    '& > div': {
      maxWidth: 451,
      margin: '0 auto',
    },
  },
  textContent: {
    fontSize: '16',
  },
}));

const GettingStarted = ({ handleSubmit }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={2} className={classes.main}>
      <Grid item xs={12} className={classes.introImage}>
        <div>
          <img
            src="/img/woman-on-books.png"
            width={454}
            height={394}
            alt="Woman on books"
          />
        </div>
      </Grid>

      <p className={classes.introText}>
        <strong>Welcome to Fanship</strong>, a new destination for book lovers
        created to help readers discover great books, to harness the power of
        word-of-mouth recommendations and to reward creators.
      </p>

      <h2>Why create an Author/Illustrator Profile on Fanship?</h2>

      <p>
        For authors and illustrators, Fanship is a place to be discovered by new
        readers, access data about how fans are engaging with your work, and
        earn more from your ebook sales.
      </p>

      <p>
        To enjoy these benefits, Authors and Illustrators first need to create a
        profile page. This is how we verify your identity as the copyright
        holder and so we can issue payments when book buyers “Applaud” you by
        adding a voluntary payment over the retail price.
      </p>

      <Grid item xs={12} className={classes.applaudImage}>
        <div>
          <img
            src="/img/onboarding-applaud.png"
            width={493}
            height={367}
            alt="Applaud example"
          />
        </div>
      </Grid>

      <p>
        An Author/Illustrator Profile provides access to real-time data about
        how readers’ engagement is facilitating discoverability of your work and
        driving sales.
      </p>

      <Grid item xs={12} className={classes.salesImage}>
        <div>
          <img
            src="/img/onboarding-sales.png"
            width={451}
            height={254}
            alt="Book sales example"
          />
        </div>
      </Grid>

      <p>It’s also how book lovers on the site will learn more about you.</p>

      <h2>How do I unlock the benefits of Fanship?</h2>

      <p>Creating your Author/Illustrator Profile is simple:</p>

      <ol>
        <li>
          <p>
            <strong>Verify your identity</strong>
          </p>
          <p>
            At Fanship, we are dedicated to sharing authoritative and trusted
            information about rightsholders and their creative works. We also
            want you to earn more from your ebook sales.
          </p>
          <p>
            Completing your account details in full enables us to link your
            profile to your books, and to activate the “Applaud the Author”
            feature, where fans can add a one-time payment to you at checkout.
          </p>
        </li>
        <li>
          <p>
            <strong>Set up your Profile</strong>
          </p>
          <p>
            Your Author or Illustrator Profile on Fanship is how book lovers
            will learn more about you.{' '}
          </p>
          <p>
            We recommend you include a headshot and a brief bio, as well as
            links to your social media.{' '}
          </p>
          <p>
            If you publish under multiple names, you can create a separate
            Profile for each within a single Account. 
          </p>
        </li>
        <li>
          <p>
            <strong>Add your books to your Catalogue</strong>
          </p>
          <p>
            The system will guide you through the steps for traditionally
            published or independent creators, as relevant to you.{' '}
          </p>
        </li>
        <li>
          <p>
            <strong>Visit your Dashboard</strong>
          </p>
          <p>
            This is where you’ll learn how readers are engaging with your work,
            how many books you’ve sold on Fanship, and how much “Applause”
            you’ve received.
          </p>
        </li>
      </ol>

      <Grid item xs={12} className={classes.check}>
        <PrimaryButton
          variant="contained"
          color="primary"
          style={{ width: '320px' }}
          onClick={handleSubmit}
        >
          Get started
        </PrimaryButton>
      </Grid>
      <Grid item md={12} style={{ paddingBottom: '60px' }} />
    </Grid>
  );
};

export default GettingStarted;

GettingStarted.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
