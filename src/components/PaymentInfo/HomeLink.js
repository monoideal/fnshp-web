import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  containerLink: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '40px',

    color: '#000',
  },
  chevronNormal: {
    fontSize: '2em',
  },
  chevronBig: {
    fontSize: '2.5em',
  },
}));

export default function HomeLink() {
  const classes = useStyles();
  const [active, setActive] = useState(false);

  return (
    <Link
      to="/payment-info"
      className={classes.containerLink}
      component={RouterLink}
      underline="hover"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ChevronLeft
        className={active ? classes.chevronBig : classes.chevronNormal}
      />
      Payment Information
    </Link>
  );
}
