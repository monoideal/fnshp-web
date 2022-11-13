import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import DefaultListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/ListOutlined';
import HelpIcon from '@material-ui/icons/HelpOutline';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
// import TimelineIcon from '@material-ui/icons/Timeline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import { useAuth0 } from '@auth0/auth0-react';
import { AppContext } from './AppContext';

const ListItem = withStyles({
  root: {
    '&:hover': {
      textDecoration: 'underline',
    },
    '&$selected': {
      boxSizing: 'border-box',
      backgroundColor: '#F3F8FB',
      borderLeft: 'solid 8px #FFC153',
      color: '#171331',
      '& svg': {
        color: '#171331',
      },
      '&:hover': {
        backgroundColor: '#F3F8FB',
      },
    },
  },
  selected: {},
})(DefaultListItem);

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    height: '100%',
  },
  logo: {
    height: '40px',
  },
  textLink: {
    textDecoration: 'underline',
  },
  errorIcon: {
    color: 'red !important',
  },
}));

function NavList({ location }) {
  const { pathname } = location;
  const classes = useStyles();
  const { logout } = useAuth0();
  const { fanshipUser } = React.useContext(AppContext);

  return (
    <div className={classes.root}>
      {/* Top List */}
      <List>
        <div>
          <Link to="/">
            <ListItem button>
              <img
                className={classes.logo}
                alt="logo"
                src="/img/logo-white-beta.png"
              />
            </ListItem>
          </Link>
          <Link to="/dashboard">
            <ListItem
              button
              selected={pathname.includes('/dashboard')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          {fanshipUser.creator && (
            <Link to="/profiles">
              <ListItem
                button
                selected={pathname.includes('/profiles')}
                classes={{ selected: 'drawer-selected' }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Profiles" />
              </ListItem>
            </Link>
          )}
          <Link to="/catalog">
            <ListItem
              button
              selected={pathname.includes('/catalog')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="My Catalogue" />
            </ListItem>
          </Link>
          {/* <Link to="/analytics">
            <ListItem
            button
              selected={pathname.includes('/analytics')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
          </Link> */}
          <Link to="/payment-info">
            <ListItem
              button
              selected={pathname.includes('/payment-info')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Payment Info" />
            </ListItem>
          </Link>
          <Link to="/notifications">
            <ListItem
              button
              selected={pathname.includes('/notifications')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <NotificationsNoneIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
          </Link>
        </div>
      </List>

      {/* Bottom List */}
      <List>
        <Link to="/account">
          <ListItem
            button
            selected={pathname.includes('/account')}
            classes={{ selected: 'drawer-selected' }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItem>
        </Link>

        <Link to="/help-authors">
          <ListItem
            button
            selected={pathname.includes('/help-authors')}
            classes={{ selected: 'drawer-selected' }}
          >
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </Link>
        <ListItem
          button
          selected={pathname.includes('/logout')}
          classes={{ selected: 'drawer-selected' }}
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
        <Link to="/terms-and-conditions">
          <ListItem
            button
            selected={pathname.includes('/terms-and-conditions')}
            classes={{ selected: 'drawer-selected' }}
          >
            <ListItemText
              className={classes.textLink}
              primary="Terms & Conditions of Use"
            />
          </ListItem>
        </Link>
        <Link to="/policy">
          <ListItem
            button
            selected={pathname.includes('/policy')}
            classes={{ selected: 'drawer-selected' }}
          >
            <ListItemText
              className={classes.textLink}
              primary="Privacy Policy"
            />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}

NavList.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(NavList);
