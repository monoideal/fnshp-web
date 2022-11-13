import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import { Button, Dialog, Typography, Grid, InputBase } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

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
    // Use the system font instead of the default Roboto font.
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
  okBtn: {
    background: theme.palette.primary.main,
    padding: '10px 50px ',
    color: theme.palette.black.main,
    boxShadow: 'none',
    fontWeight: 'bold',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}));

export default function SuccessAlert({ open, close, selectedUser }) {
  const classes = useStyles();

  const handleClose = () => {
    close(false);
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
            Success
          </Typography>
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          <Typography gutterBottom className={classes.text}>
            The user has been promoted to{' '}
            {selectedUser && selectedUser.admin.isOwner ? 'Owner' : 'Admin'}.
          </Typography>
          <BootstrapInput
            value={selectedUser ? selectedUser.admin.email : ''}
            id="bootstrap-input"
          />
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            className={classes.btns}
          >
            <Button
              className={classes.okBtn}
              variant="contained"
              onClick={handleClose}
            >
              OK
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

SuccessAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  selectedUser: PropTypes.objectOf(PropTypes.any),
};

SuccessAlert.defaultProps = {
  selectedUser: null,
};
