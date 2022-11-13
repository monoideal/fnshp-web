import React from 'react';
import PropTypes from 'prop-types';
import history from 'lib/history';
import DefaultListItem from '@material-ui/core/ListItem';
import { List, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import SelectedIcon from '@material-ui/icons/Stop';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ListItem = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.white.main,
      textDecoration: 'underline',
    },
    '&$selected': {
      color: theme.palette.darkOrange.main,
      backgroundColor: theme.palette.white.main,
      '&:hover': {
        backgroundColor: theme.palette.white.main,
        textDecoration: 'underline',
      },
    },
  },
  selected: {},
}))(DefaultListItem);

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '20px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    height: '100%',
  },
  icon: {
    color: theme.palette.darkOrange.main,
    minWidth: '30px',
  },
}));

export default function AccountNavList({ activeTab }) {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.root}>
      {desktopView && (
        <List>
          <div>
            <ListItem
              button
              onClick={() => history.push('/fans/account')}
              selected={activeTab === 'accountDetails'}
            >
              {activeTab === 'accountDetails' && (
                <ListItemIcon classes={{ root: classes.icon }}>
                  <SelectedIcon fontSize="small" />
                </ListItemIcon>
              )}
              <ListItemText primary="Account Details" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push('/fans/account/rewards')}
              selected={activeTab === 'rewards'}
            >
              {activeTab === 'rewards' && (
                <ListItemIcon classes={{ root: classes.icon }}>
                  <SelectedIcon fontSize="small" />
                </ListItemIcon>
              )}
              <ListItemText primary="Rewards" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push('/fans/account/purchase-history')}
              selected={activeTab === 'purchaseHistory'}
            >
              {activeTab === 'purchaseHistory' && (
                <ListItemIcon classes={{ root: classes.icon }}>
                  <SelectedIcon fontSize="small" />
                </ListItemIcon>
              )}
              <ListItemText primary="Purchase History" />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push('/fans/account/how-to-use-fanship')}
              selected={activeTab === 'howToUseFanship'}
            >
              {activeTab === 'howToUseFanship' && (
                <ListItemIcon classes={{ root: classes.icon }}>
                  <SelectedIcon fontSize="small" />
                </ListItemIcon>
              )}
              <ListItemText primary="How to Use Fanship" />
            </ListItem>
          </div>
        </List>
      )}
    </div>
  );
}

AccountNavList.propTypes = {
  activeTab: PropTypes.string.isRequired,
};
