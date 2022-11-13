import React from 'react';
import clsx from 'clsx';
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AccountNavList from 'components/Fans/AccountNavList';
import AccountDetails from 'components/Fans/AccountDetails';
import Rewards from 'components/Fans/Rewards';
import PurchaseHistory from 'components/Fans/PurchaseHistory';
import AccountHowToUse from 'components/Fans/AccountHowToUse';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      padding: '0 20px',
      flexFlow: 'column',
    },
  },
  drawerPaper: {
    position: 'relative',
    width: theme.drawerWidth,
    border: 'none',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      '& > div': {
        marginTop: 0,
        '& > button': {
          backgroundColor: '#fff',
          border: 'solid 1px #979797',
          '& > span': {
            justifyContent: 'space-between',
            textTransform: 'capitalize',
          },
        },
      },
    },
  },
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      marginTop: 40,
    },
  },
  hidden: {
    display: 'none',
  },
}));

export default function AccountContainer({ activeTab }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{ paper: clsx(classes.drawerPaper) }}
        open
      >
        <AccountNavList activeTab={activeTab} />
      </Drawer>
      <main className={classes.content}>
        <div className={clsx(activeTab === 'accountDetails' || classes.hidden)}>
          <AccountDetails />
        </div>
        <div className={clsx(activeTab === 'rewards' || classes.hidden)}>
          <Rewards />
        </div>
        <div
          className={clsx(activeTab === 'purchaseHistory' || classes.hidden)}
        >
          <PurchaseHistory />
        </div>
        <div
          className={clsx(activeTab === 'howToUseFanship' || classes.hidden)}
        >
          <AccountHowToUse />
        </div>
      </main>
    </div>
  );
}
