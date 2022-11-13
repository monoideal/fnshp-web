import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Typography,
  Grid,
  InputBase,
  TextField,
  MenuItem,
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import HelpIcon from '@material-ui/icons/Help';
import { useApi } from 'api/';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    width: '100%',
  },
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.palette.grey.main,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '80%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
  root: {
    padding: '6%',
    fontFamily: "'Rubik','sans-serif'",
  },
  title: {
    fontSize: '20px',
    color: theme.palette.black.main,
    fontWeight: '700',
  },
  closeIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    cursor: 'pointer',
  },
  text: {
    fontSize: '16px',
    color: theme.palette.black.main,
    marginBottom: '4%',
    minWidth: '400px',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  btns: {
    fontSize: '14px',
    marginTop: '30px',
  },
  cancelBtn: {
    marginRight: '20px',
    background: theme.palette.white.main,
    borderColor: theme.palette.grey.main,
    color: theme.palette.black.main,
    border: '1px solid',
    boxShadow: 'none',
    padding: '10px 30px ',
    fontWeight: 'bold',
    '&:hover': {
      background: theme.palette.lightGrey.main,
      borderColor: theme.palette.lightGrey.main,
    },
  },
  inactiveBtn: {
    background: theme.palette.primary.main,
    padding: '10px 30px ',
    color: theme.palette.black.main,
    boxShadow: 'none',
    fontWeight: 'bold',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  input: {
    height: 40,
  },
  select: {
    width: 170,
  },
  help: {
    verticalAlign: 'middle',
    color: theme.palette.grey[500],
    marginLeft: '2%',
    width: '24px',
    height: '24px',
    marginTop: '23px',
  },
  inputLabel: {
    height: 40,
    top: '-7px',
  },
}));

const accountsType = [
  {
    value: 'Owner',
    label: 'Owner',
  },
  {
    value: 'Admin',
    label: 'Admin',
  },
];

export default function PromoteAlert({
  open,
  close,
  success,
  selectedUser,
  updateUsersTable,
}) {
  const classes = useStyles();
  const api = useApi();
  const [accountType, setAccountType] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClose = () => {
    close(false);
  };

  const handleSubmit = async () => {
    if (accountType === '') {
      setErrorMessage('Please select One!');
    } else {
      await api
        .upsertAdminRoles(selectedUser.id, accountType.toLowerCase())
        .then(response => {
          success({ selectedUser: response });
          updateUsersTable('newUsers');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleAccountType = value => {
    setAccountType(value.target.value);
    setErrorMessage('');
  };

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <DialogContent dividers className={classes.root}>
          <Typography gutterBottom className={classes.title}>
            Promote User
          </Typography>
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          <Typography gutterBottom className={classes.text}>
            Email address of the account holder
          </Typography>
          <BootstrapInput
            value={selectedUser ? selectedUser.admin.email : ''}
            id="bootstrap-input"
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Account Type"
            className={classes.select}
            value={accountType}
            onChange={handleAccountType}
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
              },
            }}
            InputProps={{
              className: classes.input,
            }}
            helperText={errorMessage}
            error={errorMessage !== ''}
            margin="normal"
            variant="outlined"
          >
            {accountsType.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <HelpIcon className={classes.help} />
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            className={classes.btns}
          >
            <Button
              className={classes.cancelBtn}
              variant="contained"
              onClick={handleClose}
            >
              CANCEL
            </Button>
            <Button
              className={classes.inactiveBtn}
              variant="contained"
              onClick={handleSubmit}
            >
              PROMOTE
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

PromoteAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  success: PropTypes.func.isRequired,
  updateUsersTable: PropTypes.func.isRequired,
  selectedUser: PropTypes.objectOf(PropTypes.any),
};

PromoteAlert.defaultProps = {
  selectedUser: null,
};
