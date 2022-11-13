import React, { useEffect, useRef } from 'react';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    '& a': {
      textDecoration: 'underline',
      color: 'blue',
      cursor: 'pointer',
    },
  },
  header: {
    color: theme.palette.black.main,
    fontWeight: 'bold',
    padding: '80px 0px 60px 0px',
    fontSize: '40px',
    fontVariant: 'all-petite-caps',
  },
  policyItem: {
    color: theme.palette.black.main,
    fontWeight: 'bold',
    margin: '10px 10px 10px 10px',
  },
  policy: {
    color: theme.palette.black.main,
    margin: '10px 10px 10px 10px',
  },
  subpolicy: {
    color: theme.palette.black.main,
    margin: '10px 10px 10px 70px',
  },
  optionLink: {
    margin: '10px 10px 10px 20px',
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer',
  },
}));

export default function PrivacyPolicy() {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const ref10 = useRef(null);
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Box className={classes.header}>Privacy Policy</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>Last updated: September 8, 2020</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policyItem}>1. Introduction</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            Fanship and the Fanship’s website, https://www.Fanship.fan, are
            administered by Prescient Innovations Inc. (“Prescient”) located at
            69 Yonge Street, Suite 1100, Toronto, ON M5E 1K3 Canada. “Fanship”
            “We” “Us” mean Prescient, “our” means Prescient’s. Fanship offers
            various products and services to help you recommend, buy, learn of,
            and/or sell books (collectively, the products and services are
            referred to as “the Services”).
          </Box>
          <Box className={classes.policy}>
            Prescient is committed to respecting your right to privacy. This
            Privacy Policy is intended to help you better understand how we
            collect, use and store your personal information, whether you’re a
            Fan (you send a recommendation, set up an account, or buy a book), a
            rightsholder, or visitor of this website. By using any of Fanship’s
            Services, you are agreeing to the terms of this Privacy Policy and,
            as applicable, the Fanship Terms of Use.
          </Box>
          <Box className={classes.policy}>
            We may update this Privacy Policy from time to time in order to
            reflect, for example, changes to our privacy practices or for other
            operational, legal, or regulatory reasons. If we make material
            changes to this Privacy Policy we will give you notice of such
            changes by posting the revised policy on this website, and where
            appropriate, by other means. Your continued use of Services after
            these changes are posted constitutes agreement to the revised
            policy.{' '}
            <strong>
              If you do not agree to any changes to the Policy, do not continue
              to use our Services.
            </strong>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref1)}
              >
                Fans
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref6)}
              >
                What we don’t do{' '}
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref2)}
              >
                Rightsholders: Individuals
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref7)}
              >
                Security
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref3)}
              >
                Rightsholders: Organizations
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref8)}
              >
                Cross-border transfers
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref4)}
              >
                Visitors
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref9)}
              >
                Control and Access
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref5)}
              >
                Retention
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                className={classes.optionLink}
                onClick={() => scrollToRef(ref10)}
              >
                Contact
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} ref={ref1}>
          <Box className={classes.policyItem}>2. Fans</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            (a) What personal information do we collect from Fans and why?
          </Box>
          <Box className={classes.policy}>We collect your name and email.</Box>
          <Box className={classes.policy}>
            We use this information to provide the Services; for example to send
            you rewards or provide recommendation links to include in your notes
            to friends about the books you read.
          </Box>
          <Box className={classes.policy}>
            We also collect information about the browser and device you use and
            how you use our website. We use this information to improve our
            Services, including making our Services more accessible via your
            browser and device.
          </Box>
          <Box className={classes.policy}>
            (b) When do we collect this information?
          </Box>
          <Box className={classes.policy}>
            We collect this information when you use or access our Services,
            such as when you sign up for an account or buy a book.
          </Box>
          <Box className={classes.policy}>
            (c) Processing and collection by third-party service providers
          </Box>
          <Box className={classes.policy}>
            Shopify, Plaid, and Auth0 are third party service providers
            (respectively providing ecommerce, identity verification, and login
            authentication services) that process and collect personal
            information for example, to fulfill your book purchases and
            authenticate your account; as provided in our Terms of Use, your use
            of the Services is subject to your acceptance of the following:
          </Box>
          <Box className={classes.subpolicy}>
            The Shopify{' '}
            <a target="_blank" href="https://www.shopify.com/legal/terms">
              Terms of Use
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://www.shopify.com/legal/privacy">
              Privacy Policy
            </a>{' '}
            as may be amended by Shopify from time to time,
          </Box>
          <Box className={classes.subpolicy}>
            The PLAID{' '}
            <a target="_blank" href="https://plaid.com/legal/">
              Terms of Use
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://plaid.com/legal/">
              Privacy Policy
            </a>{' '}
            as may be amended by PLAID from time to time and
          </Box>
          <Box className={classes.subpolicy}>
            The Auth0{' '}
            <a target="_blank" href="https://auth0.com/web-terms">
              Terms of Use
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://auth0.com/privacy/">
              Privacy Policy
            </a>{' '}
            as may be amended by Auth0 from time to time.
          </Box>
          <Box className={classes.policy}>
            Third party service providers such as Smartlook and Google Analytics
            also collect and process information about the browser and device
            you use and how you use our websites (activity and movement); as
            provided in our Terms of Use, your use of the Services is subject to
            your acceptance of the following:
          </Box>
          <Box className={classes.subpolicy}>
            The Smartlook{' '}
            <a
              target="_blank"
              href="https://help.smartlook.com/en/articles/3244453-terms-of-service"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://help.smartlook.com/en/articles/3244452-privacy-policy"
            >
              Privacy Policy
            </a>{' '}
            as may be amended by Smartlook from time to time and
          </Box>
          <Box className={classes.subpolicy}>
            The Google Analytics{' '}
            <a
              target="_blank"
              href="https://marketingplatform.google.com/about/analytics/terms/us/"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://policies.google.com/privacy?hl=en-US"
            >
              Privacy Policy
            </a>{' '}
            as may be amended by Google from time to time.
          </Box>
          <Box className={classes.policy}>
            (d) When and why do we share personal information with third
            parties?
          </Box>
          <Box className={classes.policy}>
            We may share your information in the following circumstances:
          </Box>
          <Box className={classes.subpolicy}>
            To prevent, investigate, or take action regarding illegal
            activities, suspected fraud, situations involving potential threats
            to the physical safety of any person, violations of our Terms of Use
            or any other agreement related to the Services, or as otherwise
            required by law.
          </Box>
          <Box className={classes.subpolicy}>
            To conform to legal requirements, or to respond to lawful court
            orders, subpoenas, warrants, or other requests by public authorities
            (including to meet national security or law enforcement
            requirements).
          </Box>
          <Box className={classes.policy}>
            Personal information may also be shared with a company that acquires
            our business whether through merger, acquisition, bankruptcy,
            dissolution, reorganization, or other similar transaction or
            proceeding.
          </Box>
          <Box className={classes.policy}>
            With your consent, we may use your email address to send you an
            email newsletter and occasionally to send you emails about news or
            events related to our services and activities. You can unsubscribe
            to our email list any time.
          </Box>
          <Box className={classes.policy}>
            With your consent, we may share your email address and name with
            rightsholders so that you can receive rewards from the creators and
            publishers of the books you read and recommend.
          </Box>
        </Grid>
        <Grid item xs={12} ref={ref2}>
          <Box className={classes.policyItem}>
            3. Rightsholders (‘Owners’): Individuals
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            (a) What personal information do we collect and why?
          </Box>
          <Box className={classes.policy}>
            We collect your name, email, phone number, birth date, ISNI,
            address, and payment details.
          </Box>
          <Box className={classes.policy}>
            We use this information to provide you with our Services; for
            example, to confirm your identity, contact you, and pay you. We also
            use this information to make sure that we comply with legal
            requirements.
          </Box>
          <Box className={classes.policy}>
            Where we need to verify your identity (for example, if there are
            concerns around identity theft, or if you contact support and we
            need to authenticate your account), we may request that you provide
            us with government-issued identification information.
          </Box>
          <Box className={classes.policy}>
            We also collect information about the browser and device you use and
            how you use our website. We use this information to improve our
            Services, including making our Services more accessible via your
            browser and device.
          </Box>
          <Box className={classes.policy}>
            (b) When do we collect this information?
          </Box>
          <Box className={classes.policy}>
            We collect this information when you sign up for our Services or
            otherwise provide us with the information.
          </Box>
          <Box className={classes.policy}>
            (c) Processing and collection by third-party service providers
          </Box>
          <Box className={classes.policy}>
            Shopify, Plaid, and Auth0 are third party service providers
            (respectively providing ecommerce, identity verification, and login
            authentication services) that process and collect personal
            information; as provided in our{' '}
            <a target="_blank" href="/terms-and-conditions">
              Terms of Use
            </a>
            , your use of the Services is subject to your acceptance of the
            following:
          </Box>
          <Box className={classes.subpolicy}>
            The Shopify{' '}
            <a target="_blank" href="https://www.shopify.com/legal/terms">
              Terms of Use
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://www.shopify.com/legal/privacy">
              Privacy Policy
            </a>{' '}
            as may be amended by Shopify from time to time,
          </Box>
          <Box className={classes.subpolicy}>
            The PLAID{' '}
            <a target="_blank" href="https://plaid.com/legal/">
              Terms of Use
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://plaid.com/legal/">
              Privacy Policy
            </a>{' '}
            as may be amended by PLAID from time to time and
          </Box>
          <Box className={classes.subpolicy}>
            The Auth0{' '}
            <a target="_blank" href="https://auth0.com/web-terms">
              Terms of Use
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://auth0.com/privacy/">
              Privacy Policy
            </a>{' '}
            as may be amended by Auth0 from time to time.
          </Box>

          <Box className={classes.policy}>
            Third party service providers such as Smartlook and Google Analytics
            also collect and process information about the browser and device
            you use and how you use our websites (activity and movement); as
            provided in our{' '}
            <a target="_blank" href="/terms-and-conditions">
              Terms of Use
            </a>
            , your use of the Services is subject to your acceptance of the
            following:
          </Box>
          <Box className={classes.subpolicy}>
            The Smartlook{' '}
            <a
              target="_blank"
              href="https://help.smartlook.com/en/articles/3244453-terms-of-service"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://help.smartlook.com/en/articles/3244452-privacy-policy"
            >
              Privacy Policy
            </a>{' '}
            as may be amended by Smartlook from time to time and
          </Box>
          <Box className={classes.subpolicy}>
            The Google Analytics{' '}
            <a
              target="_blank"
              href="https://marketingplatform.google.com/about/analytics/terms/us/"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://policies.google.com/privacy?hl=en-US"
            >
              Privacy Policy
            </a>{' '}
            as may be amended by Google from time to time.
          </Box>
          <Box className={classes.policy}>
            (d) When and why do we share personal information with third
            parties?
          </Box>
          <Box className={classes.policy}>
            We may share your information in the following circumstances:
          </Box>
          <Box className={classes.subpolicy}>
            To prevent, investigate, or take action regarding illegal
            activities, suspected fraud, situations involving potential threats
            to the physical safety of any person, violations of our Terms of Use
            or any other agreement related to the Services, or as otherwise
            required by law.
          </Box>
          <Box className={classes.subpolicy}>
            To conform to legal requirements, or to respond to lawful court
            orders, subpoenas, warrants, or other requests by public authorities
            (including to meet national security or law enforcement
            requirements).
          </Box>
          <Box className={classes.policy}>
            Personal information may also be shared with a company that acquires
            our business, whether through merger, acquisition, bankruptcy,
            dissolution, reorganization, or other similar transaction or
            proceeding. If this happens, we will post a notice on our home page.
          </Box>
          <Box className={classes.policy}>
            With your consent, we may use your email address to send you an
            email newsletter and occasionally to send you emails about news or
            events related to our services and activities. You can unsubscribe
            to our email list any time.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policyItem} ref={ref3}>
            3. (ii) Owners: Organization Contact Person
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            (a) What information do we collect and why?
          </Box>
          <Box className={classes.policy}>
            We may collect the following personal information of the contact
            person of your organization: name, address, email, and phone number.
          </Box>
          <Box className={classes.policy}>
            We use this information to provide you with our Services; for
            example, to authenticate your account, contact the organization, and
            pay the organization. We also use this information to make sure that
            we comply with legal requirements.
          </Box>
          <Box className={classes.policy}>
            We also collect information about the browser and device you use and
            how you use our website. We use this information to improve our
            Services, including making our Services more accessible via your
            browser and device.
          </Box>
          <Box className={classes.policy}>
            (b) When do we collect this information?
          </Box>
          <Box className={classes.policy}>
            We collect this information when you sign up for our Services or
            otherwise provide us with the information.
          </Box>
          <Box className={classes.policy}>
            (c) Processing and collection by third-party service providers
          </Box>
          <Box className={classes.policy}>
            Shopify, Plaid, and Auth0 are third party service providers
            (respectively providing ecommerce, identity verification, and login
            authentication services) that process and collect personal
            information, for example, to authenticate your account and pay the
            organization; as provided in our Terms of Use, your use of the
            Services is subject to your acceptance of the following:
          </Box>
          <Box className={classes.policy}>
            Shopify, Plaid, and Auth0 are third party service providers
            (respectively providing ecommerce, identity verification, and login
            authentication services) that process and collect personal
            information; as provided in our{' '}
            <a target="_blank" href="/terms-and-conditions">
              Terms of Use
            </a>
            , your use of the Services is subject to your acceptance of the
            following:
          </Box>
          <Box className={classes.subpolicy}>
            The Shopify{' '}
            <a target="_blank" href="https://www.shopify.com/legal/terms">
              Terms of Use
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://www.shopify.com/legal/privacy">
              Privacy Policy
            </a>{' '}
            as may be amended by Shopify from time to time,
          </Box>
          <Box className={classes.subpolicy}>
            The PLAID{' '}
            <a target="_blank" href="https://plaid.com/legal/">
              Terms of Use
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://plaid.com/legal/">
              Privacy Policy
            </a>{' '}
            as may be amended by PLAID from time to time and
          </Box>
          <Box className={classes.subpolicy}>
            The Auth0{' '}
            <a target="_blank" href="https://auth0.com/web-terms">
              Terms of Use
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://auth0.com/privacy/">
              Privacy Policy
            </a>{' '}
            as may be amended by Auth0 from time to time.
          </Box>

          <Box className={classes.policy}>
            Third party service providers such as Smartlook and Google Analytics
            also collect and process information about the browser and device
            you use and how you use our websites (activity and movement); as
            provided in our{' '}
            <a target="_blank" href="/terms-and-conditions">
              Terms of Use
            </a>
            , your use of the Services is subject to your acceptance of the
            following:
          </Box>
          <Box className={classes.subpolicy}>
            The Smartlook{' '}
            <a
              target="_blank"
              href="https://help.smartlook.com/en/articles/3244453-terms-of-service"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://help.smartlook.com/en/articles/3244452-privacy-policy"
            >
              Privacy Policy
            </a>{' '}
            as may be amended by Smartlook from time to time and
          </Box>
          <Box className={classes.subpolicy}>
            The Google Analytics{' '}
            <a
              target="_blank"
              href="https://marketingplatform.google.com/about/analytics/terms/us/"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://policies.google.com/privacy?hl=en-US"
            >
              Privacy Policy
            </a>{' '}
            as may be amended by Google from time to time.
          </Box>
          <Box className={classes.policy}>
            (d) When and why do we share information with third parties?
          </Box>
          <Box className={classes.policy}>
            We may share your information in the following circumstances:
          </Box>
          <Box className={classes.subpolicy}>
            To prevent, investigate, or take action regarding illegal
            activities, suspected fraud, situations involving potential threats
            to the physical safety of any person, violations of our Terms of Use
            or any other agreement related to the Services, or as otherwise
            required by law.
          </Box>
          <Box className={classes.subpolicy}>
            To conform to legal requirements, or to respond to lawful court
            orders, subpoenas, warrants, or other requests by public authorities
            (including to meet national security or law enforcement
            requirements).
          </Box>
          <Box className={classes.policy}>
            Personal information may also be shared with a company that acquires
            our business, whether through merger, acquisition, bankruptcy,
            dissolution, reorganization, or other similar transaction or
            proceeding. If this happens, we will post a notice on our home page.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policyItem} ref={ref4}>
            4. Information from Fanship website visitors and users of our
            support
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            (a) What information do we collect and why?
          </Box>
          <Box className={classes.policy}>
            As you visit or browse the Fanship websites, we collect information
            about the browser and device you use and how you use our websites.
            We use this information to improve our Services, including making
            our Services more accessible via your browser and device.
          </Box>
          <Box className={classes.policy}>
            (b) When do we collect this information?
          </Box>
          <Box className={classes.policy}>
            We collect this information when you visit the Fanship website.
          </Box>
          <Box className={classes.policy}>
            (c) Processing and collection by third-party service providers
          </Box>
          <Box className={classes.policy}>
            Third party service providers such as Smartlook and Google Analytics
            collect and process information about the browser and device you use
            and how you use our websites (activity and movement); as provided in
            our Terms of Use, your use of the Services is subject to your
            acceptance of the following:
          </Box>
          <Box className={classes.subpolicy}>
            The Smartlook{' '}
            <a
              target="_blank"
              href="https://help.smartlook.com/en/articles/3244453-terms-of-service"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://help.smartlook.com/en/articles/3244452-privacy-policy"
            >
              Privacy Policy
            </a>{' '}
            as may be amended by Smartlook from time to time and
          </Box>
          <Box className={classes.subpolicy}>
            The Google Analytics{' '}
            <a
              target="_blank"
              href="https://marketingplatform.google.com/about/analytics/terms/us/"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://policies.google.com/privacy?hl=en-US"
            >
              Privacy Policy
            </a>{' '}
            as may be amended by Google from time to time.
          </Box>
          <Grid item xs={12}>
            <Box className={classes.policyItem} ref={ref5}>
              5. For how long do we retain your personal information?
            </Box>
          </Grid>{' '}
          <Box className={classes.policy}>
            We will continue to store archived copies of your personal
            information for only as necessary to fulfill the purposes outlined
            in this Privacy Policy. When assessing these periods we carefully
            examine our need to collect personal information at all and if we
            establish a relevant need we only retain it for the shortest
            possible period to realize the purpose of collection unless a longer
            retention period is required, such as to defend a claim.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policyItem} ref={ref6}>
            6. What we don’t do with your personal information
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            We do not share, disclose, sell, rent, or otherwise provide personal
            information to other companies for the marketing of their own
            products or services.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policyItem} ref={ref7}>
            7. How do we keep your personal information secure?
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            We follow industry standards on information security management to
            safeguard information, such as financial information and any other
            personal information entrusted to us. Our information security
            systems apply to people, processes and information technology
            systems on a risk management basis.
          </Box>
          <Box className={classes.policy}>
            No method of transmission, or method of electronic storage, is 100%
            secure. Therefore, we cannot guarantee the absolute security of your
            personal information.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policyItem} ref={ref8}>
            8. Your information may be transferred across borders
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            Fanship primarily stores data in Canada and the United States and
            works with third party service providers to help provide you with
            our Services. Your personal information may be sent to another
            jurisdiction for processing; while in another jurisdiction, it may
            be accessed by the courts, law enforcement and national security
            authorities.
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policyItem} ref={ref9}>
            9. Control over and access to your personal information
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            Fanship understands that you have rights over your personal
            information, and takes reasonable steps to allow you to access,
            correct, amend, or limit the use of your personal information. If
            you are unable to change your personal information within your
            account settings, or if you are concerned about data collected as
            you visit Fanship’s websites or use our support services, please
            contact us to make the required changes.
          </Box>
          <Box className={classes.policy}>
            It’s important to remember that if you delete or limit the use of
            your personal information, the Services may not function properly.
          </Box>
        </Grid>
        <Grid item xs={12} ref={ref10}>
          <Box className={classes.policyItem}>10. How to contact Fanship</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.policy}>
            If you have any questions about your personal information or this
            policy, please contact Fanship by email at{' '}
            <span className={classes.fontLink}>
              privacy@prescientinnovations.com
            </span>
            , or by using the contact details:
          </Box>
          <Box className={classes.policy}>Prescient Innovations Inc.</Box>
          <Box className={classes.policy}>
            Attn: Chief Privacy Officer 69 Yonge Street, Suite 1100 Toronto, ON
            M5E 1K3 Canada
          </Box>
          <Box className={classes.policy}>
            416-868-1620 (toll-free 1-800-893-5777)
          </Box>
          <Box className={classes.policy}>
            If you feel that you concerns have not been addressed adequately,
            you may contact the Officer of the Privacy Commissioner at
            1-800-282-1376 or by mail st Office of the Privacy Commissioner of
            Canada 30 Victoria Street Gatineau, Quebec K1A 1H3
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
