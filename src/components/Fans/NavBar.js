import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Input,
  InputAdornment,
  Button,
  IconButton,
  Badge,
  Popover,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import qs from 'qs';
import history from 'lib/history';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { useAuth0 } from '@auth0/auth0-react';
import { useCart } from 'components/Fans/Cart';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  topBarContainer: {
    background: '#000000',
    color: '#FFFFFF',
  },
  content: {
    maxWidth: theme.fanSite.maxWidth,
    margin: 'auto',
  },
  betaText: {
    padding: '10px 0',
    fontSize: '.8rem',
    [theme.breakpoints.down('md')]: {
      marginLeft: 12,
    },
  },
  currencyImg: {
    margin: '7px 13px 7px 0',
    width: '26px',
    height: '17px',
  },
  bottomBarContainer: {
    background: '#FFFFFF',
    color: '#000000',
    [theme.breakpoints.down('md')]: {
      padding: '0 12px',
    },
  },
  logo: {
    [theme.breakpoints.down('md')]: {
      padding: '8px 0 0',
    },
  },
  menuItem: {
    marginLeft: '32px',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
  },
  mobileMenu: {
    paddingTop: 5,
    textAlign: 'right',
    '& button': {
      paddingRight: 0,
      '& span': {
        justifyContent: 'end',
      },
      '&:focus': {
        backgroundColor: '#fff',
      },
      '&:hover': {
        backgroundColor: '#fff',
      },
    },
  },
  searchArea: {
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      borderTop: 'solid 1px rgba(0,0,0,0.2)',
    },
  },
  form: {
    display: 'inline',
    [theme.breakpoints.down('md')]: {
      '& > div': {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        '&:before': {
          height: '100%',
          border: '1px solid rgba(0, 0, 0, 0.42)',
          borderRadius: 4,
        },
        '&:after': {
          height: '100%',
          borderRadius: '0 0 4px 4px',
        },
      },
      '& svg': {
        color: '#696969',
      },
    },
  },
  searchInput: {
    flex: '4 0 auto',
    transition: 'flex 50ms ease-out 50ms',
  },
  loginContainer: {
    color: 'rgba(255,255,255,.4)',
  },
  loginButton: {
    minWidth: 0,
    textTransform: 'none',
    fontSize: 13,
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  discoverBooks: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  popOver: {
    padding: '20px',
    maxWidth: '550px',
    maxHeight: '400px',
    background: '#f7f7f7',
    [theme.breakpoints.down('md')]: {
      overflow: 'scroll',
    },
  },
  txtBody: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    cursor: 'pointer',
  },
  popOverBottomTxt: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    fontWeight: 'bold',
    lineHeight: '1',
    padding: '20px',
    background: '#ddd',
    cursor: 'pointer',
  },
  popOverTopTxt: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    lineHeight: '1',
    color: theme.palette.darkGrey.main,
  },
  popOverTopLink: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    lineHeight: '1',
    color: '#c04800',
    textAlign: 'right',
    '&:hover': {
      textDecoration: 'underline',
    },
    padding: '8px 8px 8px 8px',
  },
  booksTxt: {
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
  },
  booksIcon: {
    cursor: 'pointer',
  },
  booksActive: {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
  popOverContainer: {
    marginTop: '10px',
    borderRadius: '1px',
  },
  userMobile: {
    left: '0 !important',
    '& > div': {
      borderRadius: 0,
    },
  },
  userMobileButton: {
    color: '#fff',
    minWidth: 38,
    padding: '6px 0',
  },
  userMobileItems: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px 20px',
    '& > div': {
      marginBottom: 10,
    },
  },
  mobileExpansion: {
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    '& #book-subjects-content > div > div': {
      padding: '10px 0',
    },
  },
}));

function User() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  const { fanshipUser, initUsers } = React.useContext(AppContext);

  // declaration for determining the viewport
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (!fanshipUser) {
        try {
          await initUsers();
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      setIsLoading(false);
    }
    fetchUser();
  }, [isAuthenticated]);

  const isOnboarded =
    fanshipUser &&
    (fanshipUser.fan || fanshipUser.organization || fanshipUser.creator);

  const isSuperuser = fanshipUser && fanshipUser.isSuperuser;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Log in',
    });
    loginWithRedirect();
  };

  const handleRegister = () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Join Fanship',
    });
    loginWithRedirect();
  };

  if (isLoading) {
    return null;
  }

  if ((!isAuthenticated || !isOnboarded) && !isSuperuser) {
    return (
      <div className={classes.loginContainer}>
        <Button className={classes.loginButton} onClick={handleLogin}>
          <strong>Log in</strong>
        </Button>
        |
        <Button className={classes.loginButton} onClick={handleRegister}>
          Join Fanship
        </Button>
      </div>
    );
  }

  const creatorConfig = {
    text: 'My Account',
    url: '/dashboard',
  };
  const fanConfig = {
    text: 'My Account',
    url: '/fans/account',
  };
  const adminConfig = {
    text: 'Fan dashboard',
    url: '/fans/account',
  };

  const isFan = fanshipUser && fanshipUser.fan;
  const isCreator = fanshipUser && fanshipUser.creator;
  const isOrg = fanshipUser && fanshipUser.organization;

  const getConfig = () => {
    if (isFan) return fanConfig;
    if (isCreator || isOrg) return creatorConfig;
    if (isSuperuser) return adminConfig;
    return {};
  };

  const AccountLinkText = getConfig().text;
  const AccountLinkUrl = getConfig().url;

  return (
    <>
      {desktopView ? (
        <>
          {isFan && (
            <>
              <Link to="/fans/my-recommendations">My Recommendations</Link>
              <span> | </span>
            </>
          )}
          <Link to={AccountLinkUrl}>{AccountLinkText}</Link>
          {isSuperuser && (
            <>
              <span> | </span>
              <Link to="/admin">Admin dashboard</Link>
            </>
          )}
          <span> | </span>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <>
          <Button
            aria-controls="mobile-user-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.userMobileButton}
          >
            <MenuIcon />
          </Button>
          <Popover
            id="mobile-user-menu"
            elevation={0}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            className={classes.userMobile}
            marginThreshold={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Grid container className={classes.userMobileItems}>
              <Grid item xs={12}>
                <Link onClick={handleClose} to={AccountLinkUrl}>
                  Account Details
                </Link>
              </Grid>
              {isFan && (
                <>
                  <Grid item xs={12}>
                    <Link onClick={handleClose} to="/fans/my-recommendations">
                      My Recommendations
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link onClick={handleClose} to="/fans/account/rewards">
                      Rewards
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      onClick={handleClose}
                      to="/fans/account/purchase-history"
                    >
                      Purchase History
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      onClick={handleClose}
                      to="/fans/account/how-to-use-fanship"
                    >
                      How to Use Fanship
                    </Link>
                  </Grid>
                </>
              )}
              <Grid
                item
                xs={12}
                style={{
                  borderTop: '1px solid #333',
                  paddingTop: 10,
                  marginTop: 5,
                }}
              >
                <a href="/logout">Logout</a>
              </Grid>
            </Grid>
          </Popover>
        </>
      )}
    </>
  );
}

function TopBar() {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div className={classes.topBarContainer}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        classes={{ root: classes.content }}
      >
        <Grid item classes={{ root: classes.betaText }}>
          <strong>
            {desktopView && `Fanship `}
            Beta:
          </strong>{' '}
          We&apos;re building something...
        </Grid>
        <Grid item classes={{ root: classes.user }}>
          <User />
        </Grid>
      </Grid>
    </div>
  );
}

function Menu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const popOverVerticalPos = desktopView ? 'top' : -9;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={classes.discoverBooks}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Books by Category
      </Button>
      <Popover
        id="mobile-user-menu"
        elevation={0}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        marginThreshold={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: popOverVerticalPos,
          horizontal: 'center',
        }}
      >
        <SubjectsPopOver close={handleClose} />
      </Popover>
    </>
  );
}

function SubjectsPopOver({ close }) {
  const classes = useStyles();
  const { categories } = React.useContext(AppContext);

  const handleSubjectLink = subjectUrl => {
    if (subjectUrl !== 'viewAll') {
      history.push(`/books/${subjectUrl}`);
    } else {
      history.push('/books/all');
    }
    close();
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        className={classes.popOver}
        direction="row"
        alignItems="center"
      >
        {categories.map((category, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={6}
            className={classes.txtBody}
            onClick={() => handleSubjectLink(category.url)}
          >
            {category.name}
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        className={classes.popOverBottomTxt}
        onClick={() => handleSubjectLink('viewAll')}
      >
        Popular Books
      </Grid>
    </>
  );
}

SubjectsPopOver.propTypes = {
  close: PropTypes.func.isRequired,
};

function Search() {
  const { q: searchString } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  const [value, setValue] = useState(searchString || '');

  // deaclaration for determining the viewport
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  const [inputSearch, setInputSearch] = React.useState(!!searchString);

  const classes = useStyles();

  useEffect(() => {
    function initialize() {
      setValue(searchString);
      setInputSearch(!!searchString);
    }
    initialize();
  }, [searchString]);

  function handleChange(event) {
    const { target } = event;
    setValue(target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    history.push(`/books?q=${value}`);
  }

  function handleMobileSearch() {
    return inputSearch ? setInputSearch(false) : setInputSearch(true);
  }

  const formClasses = inputSearch
    ? `${classes.form} ${classes.searchInput}`
    : classes.form;

  let searchField = (
    <Input
      id="input-with-icon-adornment"
      value={value}
      onChange={handleChange}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );

  if (inputSearch && !desktopView) {
    searchField = (
      <Input
        id="input-with-icon-adornment"
        value={value}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    );
  }

  if (!inputSearch && !desktopView) {
    searchField = (
      <Button onClick={handleMobileSearch}>
        <SearchIcon />
      </Button>
    );
  }

  return (
    <form className={formClasses} onSubmit={handleSubmit} autoComplete="off">
      {searchField}
    </form>
  );
}

function BottomBar() {
  const classes = useStyles();
  const { cart } = useCart();
  const cartItemsCount = Object.keys(cart).length;

  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.bottomBarContainer}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        classes={{ root: clsx(classes.content, classes.bottomBarContent) }}
      >
        <Grid item xs={4} md={6} classes={{ root: classes.logo }}>
          <Link to="/">
            <img
              style={{ height: '34px', width: '132px' }}
              alt="logo"
              src="/img/logo-beta.png"
            />
          </Link>
        </Grid>
        {!desktopView && (
          <Grid item xs={8} md={4} className={classes.mobileMenu}>
            <Menu />
          </Grid>
        )}
        <Grid item xs={12} md={6} align="center" className={classes.searchArea}>
          {desktopView && <Menu />}
          <Search />
          <Link to="/fans/cart">
            <IconButton>
              <Badge badgeContent={cartItemsCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default function NavBar() {
  return (
    <>
      <TopBar />
      <BottomBar />
    </>
  );
}
