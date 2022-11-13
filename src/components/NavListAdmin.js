import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import DefaultListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import FaceIcon from '@material-ui/icons/Face';
import AdminManagement from '@material-ui/icons/BusinessCenterOutlined';
import HelpIcon from '@material-ui/icons/HelpOutline';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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
      '&:before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: 8,
        backgroundColor: '#FFC153',
      },
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
  hidden: {
    display: 'none',
  },
  arrowDownIcon: {
    paddingLeft: '11px',
  },
  userMgmtLinks: {
    paddingLeft: '30px',
  },
  textLink: {
    textDecoration: 'underline',
  },
  smallText: {
    fontSize: 12,
  },
}));

function NavList({ location }) {
  const { pathname } = location;
  const classes = useStyles();
  const { fanshipUser } = React.useContext(AppContext);
  const { logout } = useAuth0();

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

          <Link to="/admin/dashboard">
            <ListItem
              button
              selected={pathname.includes('/admin/dashboard')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Link to="/admin/rightholders">
            <ListItem
              button
              selected={pathname.includes('/admin/rightholders')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Rights Holders" />
            </ListItem>
          </Link>

          <Link to="/admin/profile-requests">
            <ListItem
              button
              selected={pathname.includes('/admin/profile-requests')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary="Profile Requests" />
            </ListItem>
          </Link>

          <Link to="/admin/fans">
            <ListItem
              button
              selected={pathname.includes('/admin/fans')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <AccessibilityNewIcon />
              </ListItemIcon>
              <ListItemText primary="Fans" />
            </ListItem>
          </Link>

          {fanshipUser && fanshipUser.admin.isOwner ? (
            <Link to="/admin/AdminManagement">
              <ListItem
                button
                selected={pathname.includes('/admin/AdminManagement')}
                classes={{ selected: 'drawer-selected' }}
              >
                <ListItemIcon>
                  <AdminManagement />
                </ListItemIcon>
                <ListItemText primary="Admin Mgmt" />
              </ListItem>
            </Link>
          ) : null}

          <Link to="/admin/charity">
            <ListItem
              button
              selected={pathname.includes('/admin/charity')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Charity" />
            </ListItem>
          </Link>
          <Link to="/admin/analytics">
            <ListItem
              button
              selected={pathname.includes('/admin/analytics')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
          </Link>
          <Link to="/admin/statistics">
            <ListItem
              button
              selected={pathname.includes('/admin/statistics')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItem>
          </Link>
          <Link to="/admin/payments">
            <ListItem
              button
              selected={pathname.includes('/admin/payments')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="Payments" />
            </ListItem>
          </Link>
          <Link to="/admin/promocodes">
            <ListItem
              button
              selected={pathname.includes('/admin/promocodes')}
              classes={{ selected: 'drawer-selected' }}
            >
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Promo Codes" />
            </ListItem>
          </Link>
        </div>
      </List>

      {/* Bottom List */}
      <List>
        <Link to="/admin/help">
          <ListItem
            button
            selected={pathname.includes('/admin/help')}
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
              primary="Terms & Conditions"
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
