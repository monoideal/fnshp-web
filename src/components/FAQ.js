import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { Grid, Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import config from 'config';
import { useAuth0 } from '@auth0/auth0-react';
import history from 'lib/history';

const useStyles = makeStyles(theme => ({
  header: {
    color: theme.palette.black.main,
    fontWeight: 'bold',
    padding: '80px 15px 40px 15px',
    fontSize: '40px',
    fontVariant: 'all-petite-caps',
  },
  question: {
    color: theme.palette.black.main,
    fontWeight: 'bold',
    margin: '10px 15px',
    '& a': {
      textDecoration: 'underline',
      color: 'blue',
    },
  },
  answer: {
    color: theme.palette.black.main,
    lineHeight: '1.5',
    padding: '10px 15px',
    '& a': {
      textDecoration: 'underline',
      color: 'blue',
    },
    '& button': {
      marginTop: '-2px',
      padding: 0,
      textTransform: 'none',
      fontSize: '16px',
      lineHeight: '1.5',
      textDecoration: 'underline',
      letterSpacing: 0,
      color: 'blue',
      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline',
      },
    },
    '& p': {
      marginTop: 0,
    },
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
  tabsContainer: {
    marginBottom: 60,
    borderBottom: `solid 1px ${theme.palette.grey.main}`,
  },
  tab: {
    padding: '15px 25px',
    color: theme.palette.darkGrey.main,
    fontSize: '22px',
    fontWeight: 'light',
    cursor: 'pointer',
  },
  selected: {
    borderBottom: `solid 2px ${theme.palette.darkOrange.main}`,
    color: theme.palette.black.main,
    fontWeight: 'regular',
  },
}));

function Tabs({ selectedTab }) {
  const classes = useStyles(selectedTab);
  return (
    <Grid container justify="center" className={classes.tabsContainer}>
      <Grid
        item
        onClick={() => history.push('/faq-authors')}
        className={clsx(
          classes.tab,
          selectedTab === 'authors' && classes.selected,
        )}
      >
        <Box>I am an Author</Box>
      </Grid>
      <Grid item className={classes.spaceTab} />
      <Grid
        item
        onClick={() => history.push('/faq-fans')}
        className={clsx(
          classes.tab,
          selectedTab === 'fans' && classes.selected,
        )}
      >
        <Box>I am a Fan</Box>
      </Grid>
    </Grid>
  );
}

Tabs.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

export default function FAQ(props) {
  const { section } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Grid item xs={12}>
        <Box className={classes.header}>Frequently Asked Questions</Box>
      </Grid>
      <Tabs selectedTab={section} />
      {section === 'fans' ? (
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.question}>
              What is Fanship? Who is behind it?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Fanship is a destination for discovering books and rewarding
                creators.
              </p>
              <p>
                For book lovers, Fanship is a place to discover your next
                favourite read, earn reward points for sharing your great taste
                in books, and see how your personal recommendations make a
                difference by helping a book you love to find new readers.
              </p>
              <p>
                For authors, Fanship is a place to find new readers, access data
                about readers’ engagement with their work, and earn more from
                their ebook sales.
              </p>
              <p>
                Fanship is the creation of 
                <PrescientLink />, an innovation lab founded by and a wholly
                owned subsidiary of 
                <AccessCopyrightLink />.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              Fanship is in beta. What does that mean?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Beta testing means we know we&apos;re building something
                great, but before we start to move in the couch and hang the
                pictures, we need to know the structure is sound. This is where
                we ask the book lovers, readers and writers we were created to
                support (ie. you) to visit with us a while, take a tour, and
                help us understand how things are looking. We&apos;re almost
                there, but we literally cannot complete this next step without
                you. 
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              As a Fan, what can I expect from Fanship beta?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Joining Fanship in beta means you get to be one of the very
                first. It also means you may encounter some technical bugs or
                discover something else askew. This platform is for you, and
                your feedback will help us to build it the way you want it. If
                you have comments or ideas to share, we&apos;d love to hear from
                you. Contact us at <EmailLink />.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              I’m a book lover. Why should I join Fanship?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                We all know how an enthusiastic recommendation from someone you
                trust can be the most reliable route to your next favourite
                read. On Fanship, you can reach out to an individual and say, "I
                read this book just know you&apos;ll love it too." That personal
                touch makes a big difference to whether a book finds a new
                reader, and it also makes a difference to you as you see how
                your recommendations are received. You can earn reward points
                that can be redeemed for free books or donated to a worthy
                cause. Creating your Fan Profile is easy,{' '}
                <RegisterLink>click here</RegisterLink>.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              I already have an Author Profile on Fanship. Do I still need to
              create a Fan Profile?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Your Author Profile allows you to receive applause from your
                fans, to tell readers more about you, and to access data about
                your fans’ engagement with your work, but it does not allow you
                to earn points or to recommend books to others. In order to
                recommend books on Fanship and earn reward points, you will also
                need to create a separate{' '}
                <RegisterLink>Fan Profile</RegisterLink>.
              </p>
              <p>
                Please note that Fan Profiles and Author Profiles are two
                separate accounts. You will need to create them with two
                separate email IDs.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              How is Fanship different from other ebook retailers?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Fanship is more than just an ebook retailer. Through analytics and
              reporting available on the site, authors, publishers and fans can
              all see how book recommendations connect the community through the
              joy of finding your next great read. Book recommendations earn
              points for fans, which can then be used to applaud their favourite
              authors and to support great causes, simply by telling others
              about the books they are currently loving.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              Is Fanship a social network? Do I have to build a following?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              You do not need to build a following on Fanship. When you want to
              recommend a book, Fanship generates a unique recommendation link
              for you to share via email, Facebook, WhatsApp or text message.
              The people you recommend books to do not have to be existing
              Fanship users. However, if they also create a profile you will
              each receive reward points when your recommendations result in a
              sale.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              How does recommending books work?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Recommending a book on Fanship is simple. Just follow these easy
                steps:
              </p>
              <ul>
                <li>
                  Locate the book you want to recommend and click "Recommend"
                  generating a link that is unique to you;
                </li>
                <li>
                  Make your recommendation via email, Facebook Messenger,
                  WhatsApp or text message to the friends and family members
                  that you think will enjoy the book. You can also post your
                  book recommendation links on Facebook and Twitter;
                </li>
                <li>
                  Watch your reward points grow every time your recommendation
                  leads to a view or a sale.
                </li>
              </ul>
              <p>
                Visit your profile to see how your influence is helping to
                support your favourite books and authors.
              </p>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              How do I earn reward points? How can I redeem them?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Fanship users earn reward points in two ways: by making
              recommendations that result in a sale, and by buying books through
              the platform. Points can be redeemed to purchase books or be
              donated to a good cause. For more details on using your reward
              points, please refer to Fanship's 
              <TermsLink />.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              What does it mean when I applaud an author?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              With a Fan profile, you can let your favourite writers know how
              much you value their work by applauding them with a one-time
              contribution. This impactful gesture can be made at checkout.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              Can I buy ebooks on Fanship without creating a profile?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              You don't need a profile to purchase books through the Fanship
              platform. However, if you check out as a guest, you will miss the
              chance to earn reward points to redeem for future books or to
              donate to a good cause. Also, if your purchase is the result of a
              recommendation from a friend on Fanship, creating your own profile
              ensures they get their reward points too.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              How often does Fanship add new books?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              The Fanship library is continually updating. If you are a
              publisher or an independent author wanting to offer your books on
              Fanship, email us at 
              <EmailLink />.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              What devices can I read my ebook on?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              On Fanship, ebooks are available in EPUB, MOBI or PDF formats
              (availability subject to formats provided by the publishers or
              independent authors) and are DRM-free so you can read them on the
              device of your choice.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              My purchase won’t download to my device.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Log into your account to access your purchase history and download
              the ebook again. If you need further assistance, please contact us
              at 
              <EmailLink />.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              I can’t access my purchases / find my download.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Make sure that the file format downloaded can be used on your
              device. To do so, please check your download folder to access your
              ebook file.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              I think my account has been compromised, what should I do?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              If you believe that your account has been compromised, please
              immediately re-set your password and then contact us at 
              <EmailLink />
               to investigate further.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              My reward points are not showing up in my account, what should I
              do?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              It can take up to 24 hours for your points balance to be updated.
              If you see issues with your reward points, please contact us at 
              <EmailLink />
               for further assistance.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              I bought the wrong ebook format by mistake, what should I do?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Please contact us at 
              <EmailLink />
               for further assistance.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              How is Fanship ensuring proceeds from sales will go to creators?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Fanship uses the <ALLink />, a connection between a work file, its
              metadata and the copyright holder, to verify that every book
              listed for purchase on the platform is properly credited. It is
              your guarantee that purchases made on Fanship will directly
              support creators.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              Is the Attribution Ledger a DRM system?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              The <ALLink /> is not a DRM system. Books sold through Fanship are
              DRM-free.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              I'm a publisher. How do I get my catalogue on Fanship?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Contact us at 
              <EmailLink />
              . We'd love to hear from you.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              I am an independent author and I would like my book to be
              available on Fanship.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Contact us at 
              <EmailLink />
              . We'd love to hear from you.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              Have any other questions about the Fanship experience? They might
              be answered on our <AuthorFAQLink /> for Authors.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.footer}>
              Still can’t find an answer to your question. Send us an email at:{' '}
              <EmailLink />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.question}>
              What is Fanship? Who is behind it?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Fanship is a destination for discovering books and rewarding
                creators.
              </p>
              <p>
                For authors, Fanship is a place to find new readers, access data
                about readers’ engagement with your work, and earn more from
                your ebook sales.
              </p>
              <p>
                For book lovers, Fanship is a place to discover your next
                favourite read, earn reward points for sharing your great taste
                in books, and see how your personal recommendations make a
                difference by helping a book you love to find new readers.
              </p>
              <p>
                Fanship is the creation of 
                <PrescientLink />, an innovation lab founded by and a wholly
                owned subsidiary of 
                <AccessCopyrightLink />.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              Fanship is in beta. What does that mean?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Beta testing means we know we're building something great, but
                before we start to move in the couch and hang the pictures, we
                need to know the structure is sound. This is where we ask the
                book lovers, readers and writers we were created to support (ie.
                you) to visit with us a while, take a tour, and help us
                understand how things are looking. We're almost there, but we
                literally cannot complete this next step without you.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              As an Author, what can I expect from Fanship beta?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Joining Fanship in beta means you get to be one of the very
                first. It also means you may encounter some technical bugs or
                discover something else askew. This platform is for you, and
                your feedback will help us to build it the way you want it. If
                you have comments or ideas to share, we'd love to hear from you.
                Contact us at <EmailLink />.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              I’m an Author and my books are available on Fanship. Why should I
              create a profile?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                As a published author with books available on Fanship, we
                encourage you to set up an Author Profile. When you do, you’ll
                gain access to data about how readers are engaging with your
                books and how their personal recommendations are driving
                discoverability and sales. You’ll also activate the “Applaud the
                author” feature, which allows readers to make a one-time
                contribution at checkout, every penny of which is paid to you.{' '}
                <RegisterLink>Create your author profile here</RegisterLink>.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              I already have a Fan Profile on Fanship. Do I need to create an
              Author Profile?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Your Fan Profile allows you to recommend books, earn reward
                points, and access data about how your great taste is making a
                difference to a book’s discoverability, but readers won’t be
                able to see you on Fanship or have the option to applaud you
                when they purchase your books. In order to activate the “Applaud
                the author” feature to earn more from your ebook sales, and to
                access data about your readers’ engagement with your books on
                Fanship, you will also need to create a separate{' '}
                <RegisterLink>Author Profile</RegisterLink>.
              </p>
              <p>
                Please note that Fan Profiles and Author Profiles are two
                separate accounts. You will need to create them with two
                separate email IDs.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              How is Fanship different from other ebook retailers?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Fanship is more than just an ebook retailer. Through analytics and
              reporting available on the site, authors, publishers and fans can
              all see how book recommendations make connections through book
              lovers discovering their next great read. Book recommendations
              earn points for fans, which can then be used to purchase books or
              to support a great cause. As an author, you’ll also be able to
              receive your fans’ applause.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              What does it mean to “applaud the author”?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Fans can let you know how much they value your work by applauding
              you with a one-time contribution at checkout. This impactful
              gesture can only be extended to authors who have completed an
              Author Profile.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              Is Fanship a social network? Do I have to build a following?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              You do not need to build a following on Fanship. Your Author
              Profile is a way for readers to learn more about you and to enable
              them to “Applaud” you at checkout. However, the more you encourage
              your readers and followers on your existing networks (Twitter,
              Facebook, blog etc.) to use Fanship, the more you’ll all
              benefit.In your Author Profile you’ll find a toolkit to help you
              do this.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              But I like to build a following! How can I use Fanship to market
              and promote my work to my fans?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Tell your fans (Twitter/Facebook/blog etc) about Fanship and
              encourage them to join you on the platform and to recommend your
              books. Through Fanship's reporting and analytics features, you
              will be able to directly see how the activity of your fans on the
              site generates sales and interest in your work.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              How can I recommend other authors’ books on Fanship?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              To recommend books and earn rewards you will need to create a
              separate <RegisterLink>Fan Profile</RegisterLink> using a separate
              email address. For more information visit the <FanFAQLink /> page.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              Why can’t I make recommendations using my Author Profile?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              <p>
                Your Author Profile allows you to receive applause from your
                fans, to tell readers more about you, and to access data about
                your fans’ engagement with your work, but it does not allow you
                to earn reward points or to recommend books. To do that you’ll
                need to create a separate{' '}
                <RegisterLink>Fan Profile</RegisterLink>.
              </p>
              <p>
                Please note that Fan Profiles and Author Profiles are two
                separate accounts. You will need to create them with two
                separate email IDs.
              </p>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              How often does Fanship add new books?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              The Fanship library is continually updating. If you are a
              publisher or an independent author wanting to offer your books on
              Fanship, email us at 
              <EmailLink />.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              I'm a publisher. How do I get my catalogue on Fanship?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Contact us at 
              <EmailLink />
              . We'd love to hear from you.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              I’m a traditionally published author and I would like my book to
              be available on Fanship.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Contact us at <EmailLink />. We’d be happy to answer your
              questions.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              I am an independent author and I would like my book to be
              available on Fanship.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Contact us at 
              <EmailLink />
              . We'd love to hear from you.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              I think my account has been compromised, what should I do?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              If you believe that your account has been compromised, please
              immediately re-set your password and then contact us
              at info@fanship.fan to investigate further.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              How is Fanship ensuring proceeds from sales will go to creators?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              Fanship uses the <ALLink />, a connection between a work file, its
              metadata and the copyright holder, to verify that every book
              listed for purchase on the platform is properly credited. It is
              your guarantee that purchases made on Fanship will directly
              support creators.
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.question}>
              Is the Attribution Ledger a DRM system?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.answer}>
              The <ALLink /> is not a DRM system. Books sold through Fanship are
              DRM-free.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.question}>
              Have any other questions about the Fanship experience? They might
              be answered on our <FanFAQLink /> for Fans.
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.footer}>
              Still can’t find an answer to your question. Send us an email at:{' '}
              <EmailLink />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}

FAQ.propTypes = {
  section: PropTypes.string.isRequired,
};

const EmailLink = () => (
  <a href="mailto:info@fanship.fan?subject=Fanship">info@fanship.fan</a>
);

const TermsLink = () => (
  <Link to="/terms-and-conditions">Terms and Conditions of Use</Link>
);

const PrescientLink = () => (
  <a
    href="https://prescientinnovations.com"
    rel="noopener noreferrer"
    target="_blank"
  >
    Prescient Innovations
  </a>
);

const AccessCopyrightLink = () => (
  <a
    href="https://www.accesscopyright.ca/"
    rel="noopener noreferrer"
    target="_blank"
  >
    Access Copyright
  </a>
);

const ALLink = () => (
  <a
    href={config.AL_FRONTEND_URL || 'https://attributionledger.com/'}
    rel="noopener noreferrer"
    target="_blank"
  >
    Attribution Ledger
  </a>
);

const RegisterLink = ({ children }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      varient="link"
      onClick={() => {
        ReactGA.event({
          category: 'User',
          action: 'Clicked Join Fanship',
        });
        loginWithRedirect();
      }}
    >
      {children}
    </Button>
  );
};
RegisterLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const FanFAQLink = () => <Link to="/faq-fans">Fan FAQ</Link>;

const AuthorFAQLink = () => <Link to="/faq-authors">Author FAQ</Link>;
