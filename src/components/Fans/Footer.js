/* eslint-disable jsx-a11y/anchor-is-valid */
// enable me pls when these links go somewhere

import React from 'react';
import clsx from 'clsx';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.primary.main,
    padding: '48px 124px 12px',
    marginTop: '60px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
      marginTop: '20px',
    },
  },
  content: {
    maxWidth: theme.fanSite.maxWidth,
    margin: 'auto',
    padding: '0 124px',
    [theme.breakpoints.down('md')]: {
      margin: 0,
      padding: 0,
      '& > div': {
        marginBottom: 16,
      },
    },
  },
  copyright: {
    marginTop: '48px',
  },
  link: {
    marginTop: '14px',
  },
  smallFont: {
    fontSize: '14px',
  },
  socialIcon: {
    width: '24px',
    height: '24px',
    marginRight: '20px',
  },
  fontLink: {
    textDecoration: 'underline',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid
        container
        direction="row"
        justify="space-between"
        classes={{ root: classes.content }}
      >
        <Grid item xs={12} sm={4}>
          <Box component="div" fontWeight="fontWeightBold">
            Community
          </Box>
          <Box
            component="div"
            classes={{ root: clsx(classes.link, classes.smallFont) }}
          >
            <Link to="/faq-fans" className={classes.cursorPointer}>
              FAQs
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box component="div" fontWeight="fontWeightBold">
            Company
          </Box>
          <Box
            component="div"
            classes={{ root: clsx(classes.link, classes.smallFont) }}
          >
            <Link to="/faq-fans">About</Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box component="div" fontWeight="fontWeightBold">
            Contact Us
          </Box>
          <Box
            component="div"
            classes={{ root: clsx(classes.link, classes.smallFont) }}
          >
            <a href="mailto:info@fanship.fan">info@fanship.fan</a>
          </Box>
          <Box
            component="div"
            classes={{ root: clsx(classes.link, classes.smallFont) }}
          >
            <a href="https://twitter.com/FanshipCA">
              <img
                alt="Twitter"
                src="/img/social_media/twitter.png"
                className={classes.socialIcon}
              />
            </a>
            <a href="https://www.facebook.com/FanshipCA">
              <img
                alt="Facebook"
                src="/img/social_media/facebook.png"
                className={classes.socialIcon}
              />
            </a>
            <a href="https://www.instagram.com/fanshipca/?hl=en">
              <img
                alt="Instagram"
                src="/img/social_media/instagram.png"
                className={classes.socialIcon}
              />
            </a>
          </Box>
        </Grid>
        <Grid item xs={12} classes={{ root: classes.copyright }}>
          <Box classes={{ root: classes.smallFont }}>
            © 2019 Prescient Innovation Inc. Innovation Powered by Access
            Copyright.{' '}
            <Link to="/terms-and-conditions" style={{ cursor: 'pointer' }}>
              <span className={classes.fontLink}>Terms of Use</span>
            </Link>
            {' and '}
            <Link to="/policy" className={classes.cursorPointer}>
              <span className={classes.fontLink}>Privacy Policy</span>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
