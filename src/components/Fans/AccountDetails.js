import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Avatar,
  Grid,
  Checkbox,
  FormControlLabel,
  Typography,
  Dialog,
  Snackbar,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import _ from 'lodash';

import { useApi } from 'api/';
import { useAuth0 } from '@auth0/auth0-react';
import StyledTextField from 'components/shared/StyledTextField';
import Button from 'components/shared/Button';
import UploadFileReducer from 'reducers/UploadFileReducer';
import CloseIcon from '@material-ui/icons/Close';
import { generateFallbackAvatar } from 'util/helpers';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullPageLoader from 'components/shared/FullPageLoader';
import { AppContext } from 'components/AppContext';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function Header({ children }) {
  return (
    <Box fontWeight="fontWeightBold" fontSize={18}>
      {children}
    </Box>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};

const useStyles = makeStyles(theme => ({
  paper: {
    border: `solid 1px ${theme.palette.grey.main}`,
    padding: '24px',
    marginTop: '20px',
    boxShadow: 'none',
  },
  mainTitle: {
    fontSize: '22px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.darkPurple.main,
    fontWeight: '700',
    marginBottom: '3%',
  },
  title: {
    lineHeight: '32px',
  },
  avatar: {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.orange.main,
    fontWeight: 'bold',
    marginRight: '20px',
  },
  avatarButton: {
    borderColor: theme.palette.darkGrey.main,
    backgroundColor: theme.palette.grey.main,
    fontSize: '10px',
    height: '100%',
    marginRight: '20px',
  },
  row: {
    marginTop: '30px',
  },
  textFieldContainer: {
    padding: '10px',
  },
  textField: {
    width: '100%',
  },
  saveButton: {
    color: theme.palette.black.main,
    borderWidth: 2,
    margin: '0 10px',
    width: '100px',
    '&:hover': {
      borderWidth: 2,
      backgroundColor: theme.palette.white.main,
    },
  },
  deactivateText: {
    marginTop: '12px',
    marginBottom: '12px',
  },
  root: {
    padding: '6%',
    fontFamily: "'Rubik','sans-serif'",
  },
  alertTitle: {
    fontSize: '22px',
    color: theme.palette.black.main,
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    cursor: 'pointer',
  },
  alertHeader: {
    fontSize: '16px',
    fontWeight: '530',
    marginTop: '20px',
  },
  alertList: {
    color: theme.palette.primary.main,
    marginTop: '7%',
  },
  alertText: {
    fontSize: '16px',
    color: theme.palette.black.main,
  },
  alertTextBottom: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '7%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  btns: {
    fontSize: '14px',
    marginTop: '40px',
  },
  cancelBtn: {
    marginRight: '20px',
    background: theme.palette.primary.main,
    color: theme.palette.black.main,
    boxShadow: 'none',
    padding: '10px 30px ',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    width: '140px',
    '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.black.main,
    },
    '@media (max-width: 400px)': {
      marginRight: '0px',
      marginBottom: '10px',
    },
  },
  deactiveBtn: {
    background: theme.palette.white.main,
    padding: '10px 30px ',
    color: theme.palette.black.main,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    boxShadow: 'none',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    width: '140px',
    '&:hover': {
      background: theme.palette.white.main,
    },
  },
  errorText: {
    color: theme.palette.red.main,
    fontWeight: 'bold',
  },
  accountId: {
    marginBottom: 10,
  },
}));

function AccountInformation() {
  const classes = useStyles();
  const { fanshipUser } = React.useContext(AppContext);
  const { user } = useAuth0();
  const api = useApi();

  const profile = fanshipUser.fan;

  const [avatarUrl, setAvatarUrl] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [{ percentage }, dispatch] = useReducer(UploadFileReducer, {
    percentage: 0,
  });

  useEffect(() => {
    const fullName = `${profile.firstName} ${profile.lastName}`;

    setName(fullName);
    const avatarName = fullName || profile.username;
    setUsername(profile.username || '');
    setIsAnonymous(profile.isAnonymous || false);
    setAvatarUrl(profile.avatarUrlKey || generateFallbackAvatar(avatarName));
  }, [fanshipUser]);

  function handleDeleteAvatar() {
    setAvatarUrl(generateFallbackAvatar(name || profile.username));
  }

  async function onImageUpload(e) {
    const file = _.first(e.target.files);
    setIsLoading(true);
    const avatar = await api.uploadFile(file, 'avatar', null, dispatch);
    setAvatarUrl(avatar);
    setIsLoading(false);
  }

  return (
    <Paper square classes={{ root: classes.paper }}>
      {isLoading ? (
        <FullPageLoader withPercentage percentage={percentage} />
      ) : null}
      <div className={classes.accountId}>
        Your account ID: {fanshipUser && fanshipUser.id}
      </div>
      <Header>Account Information</Header>

      <form
        onSubmit={async e => {
          e.preventDefault();
          try {
            const names = name.split(' ');
            const firstName = names[0];
            const lastName = names.slice(1).join(' ');
            await api.updateFanProfile({
              firstName,
              lastName,
              username,
              isAnonymous,
              avatarUrl,
            });
            alert('profile information updated');
          } catch (err) {
            console.log(err);
            alert('something went wrong');
          }
        }}
      >
        {/* avatar information */}
        <Grid container classes={{ root: classes.row }}>
          <Grid item>
            <Avatar className={classes.avatar} src={avatarUrl} />
          </Grid>
          <Grid item>
            <Button
              component="label"
              classes={{ root: classes.avatarButton }}
              variant="outlined"
            >
              <input
                onChange={onImageUpload}
                type="file"
                style={{ display: 'none' }}
              />
              CHOOSE FILE
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleDeleteAvatar}
              classes={{ root: classes.avatarButton }}
              variant="outlined"
              // disabled
            >
              DELETE PHOTO
            </Button>
          </Grid>
        </Grid>

        {/* user information */}
        <Grid container className={classes.row}>
          <Grid item sm={6} xs={12} className={classes.textFieldContainer}>
            <StyledTextField
              value={name}
              onChange={e => setName(e.target.value)}
              className={classes.textField}
              label="Name"
              isRequired
            />
          </Grid>
          <Grid item sm={6} xs={12} className={classes.textFieldContainer}>
            <StyledTextField
              value={user.email}
              className={classes.textField}
              label="Email"
              disabled
            />
          </Grid>
          <Grid item sm={6} xs={12} className={classes.textFieldContainer}>
            <StyledTextField
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={classes.textField}
              label="Username"
              isRequired
            />
          </Grid>
        </Grid>

        {/* submit */}
        <Grid className={classes.row} container justify="center">
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              className={classes.saveButton}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              className={classes.saveButton}
            >
              SAVE
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

function Notifications() {
  const classes = useStyles();
  const [checked, check] = useState(true);
  return (
    <Paper square classes={{ root: classes.paper }}>
      <Header>Notifications</Header>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={checked}
            onClick={() => check(!checked)}
          />
        }
        label="Allow important notifications to be sent by email"
      />
      <Box component="div" fontSize="14px">
        We periodically send out important news about Fanship to our users via
        email. We keep the email volume to an absolute minimum.
      </Box>
    </Paper>
  );
}

export function DeactivateAccount({ type }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <Paper square classes={{ root: classes.paper }}>
      <Header>Deactivate Fanship Account</Header>
      <Box className={classes.deactivateText}>
        You may choose to deactivate your Fanship account and rejoin later.
      </Box>
      <Box
        textAlign={{ xs: 'center', md: 'left' }}
        marginTop={{ xs: 2, md: 0 }}
      >
        <Button
          variant="contained"
          color="primary"
          // eslint-disable-next-line no-alert
          onClick={() => setOpen(true)}
        >
          Deactivate Account
        </Button>
      </Box>
      <DeactivateAlert open={open} close={() => setOpen(false)} type={type} />
    </Paper>
  );
}

DeactivateAccount.propTypes = {
  type: PropTypes.string.isRequired,
};

function DeactivateAlert({ open, close, type }) {
  const classes = useStyles();
  const [openProgressAlert, setOpenProgressAlert] = React.useState(false);

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <DialogContent dividers className={classes.root}>
          <Typography gutterBottom className={classes.alertTitle}>
            Deactivate Account?
          </Typography>
          <CloseIcon className={classes.closeIcon} onClick={() => close()} />
          <Typography gutterBottom className={classes.alertHeader}>
            You may choose to deactivate your Fanship account at any time, but
            before you go:
          </Typography>
          {type === 'fan' ? (
            <ul className={classes.alertList}>
              <li>
                <Typography gutterBottom className={classes.alertText}>
                  Your loyalty points will be voided.
                </Typography>
              </li>
              <li>
                <Typography gutterBottom className={classes.alertText}>
                  All of your current recommendations will become inactive.
                </Typography>
              </li>
            </ul>
          ) : null}
          <Typography gutterBottom className={classes.alertTextBottom}>
            If you wish to re-instate your account at a later date, just let us
            know.
          </Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.btns}
          >
            <Button
              className={classes.cancelBtn}
              variant="contained"
              onClick={() => close()}
            >
              CANCEL
            </Button>
            <Button
              className={classes.deactiveBtn}
              variant="contained"
              onClick={() => {
                setOpenProgressAlert(true);
                close();
              }}
            >
              DEACTIVATE
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
      <DeactivateAccountProgressAlert
        open={openProgressAlert}
        close={() => setOpenProgressAlert(false)}
      />
    </div>
  );
}

DeactivateAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

function DeactivateAccountProgressAlert({ open, close }) {
  const classes = useStyles();
  const api = useApi();
  const { logout } = useAuth0();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [isFailure, setFailure] = React.useState(false);

  useEffect(() => {
    const handleSubmit = async () => {
      await api
        .deactivateAccount(true)
        .then(() => {
          // Show the snackbar for 2 secs and then logout
          setSnackbarOpen(true);
          setTimeout(() => logout({ returnTo: window.location.origin }), 2000);
          close();
        })
        .catch(error => {
          console.error(error);
          setFailure(true);
        });
    };

    if (open) {
      setFailure(false);
      setTimeout(handleSubmit, 2000);
    }
  }, [open]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Your account has been deactivated."
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      />
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <DialogContent dividers className={classes.root}>
          <h2 className={classes.alertTitle}>Sorry to see you go.</h2>
          {isFailure ? (
            <CloseIcon className={classes.closeIcon} onClick={() => close()} />
          ) : null}
          <Typography gutterBottom className={classes.alertHeader}>
            You can always reactivate your account by contacting the Fanship
            team.
          </Typography>
          <Typography gutterBottom className={classes.alertHeader}>
            Logging off.
          </Typography>
          {!isFailure ? (
            <>
              <h2 className={classes.alertTextBottom}>Deactivate Account</h2>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <CircularProgress />
              </Grid>
            </>
          ) : (
            <div className={classes.errorText}>Sorry, try again.</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

DeactivateAccountProgressAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default function AccountDetails({ desktopView }) {
  const classes = useStyles();
  const [profileInfo, setProfileInfo] = useState({});
  const api = useApi();

  const determineUserType = () => {
    if (profileInfo.fan) {
      return 'fan';
    }
    if (profileInfo.organization) {
      return 'organization';
    }
    if (profileInfo.creator) {
      return 'creator';
    }
    return '';
  };

  React.useEffect(() => {
    async function initialize() {
      try {
        setProfileInfo(await api.fetchProfile());
      } catch (err) {
        console.log(err);
      }
    }
    initialize();
  }, [api]);
  return (
    <>
      <Grid item xs={12} className={classes.mainTitle}>
        Account Details
      </Grid>
      {desktopView ? (
        <Box
          component="div"
          fontWeight="fontWeightBold"
          fontSize="22px"
          classes={{ root: classes.title }}
        >
          Account Details
        </Box>
      ) : (
        ''
      )}
      <AccountInformation />
      <Notifications />
      <DeactivateAccount type={determineUserType()} />
    </>
  );
}

AccountDetails.propTypes = {
  desktopView: PropTypes.bool.isRequired,
};
