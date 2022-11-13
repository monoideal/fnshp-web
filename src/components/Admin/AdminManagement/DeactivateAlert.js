import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Dialog, Typography, Grid } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { useApi } from 'api/';

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
  header: {
    fontSize: '17px',
    fontWeight: '550',
    marginTop: '20px',
  },
  text: {
    fontSize: '14px',
    color: theme.palette.black.main,
    marginBottom: '4%',
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
    textTransform: 'capitalize',
    '&:hover': {
      background: theme.palette.lightGrey.main,
      borderColor: theme.palette.lightGrey.main,
    },
  },
  inactiveBtn: {
    background: theme.palette.red.main,
    padding: '10px 30px ',
    color: theme.palette.white.main,
    boxShadow: 'none',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    '&:hover': {
      background: theme.palette.red.main,
    },
  },
}));

export default function DeactivateAlert({
  open,
  close,
  selectedUser,
  updateUsersTable,
}) {
  const classes = useStyles();
  const api = useApi();

  const handleClose = () => {
    close(false);
  };

  const handleSubmit = async () => {
    await api
      .updateUserSuspension(selectedUser.id, true)
      .then(success => {
        console.log(success);
        updateUsersTable('allUsers');
      })
      .catch(error => {
        console.log(error);
      });
    handleClose();
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
            Deactivate &quot;
            {/* TODO: Later to be switched to firstName and lastName. For now displaying the email */}
            {/* {selectedUser &&
              `${selectedUser.admin.firstName} ${selectedUser.admin.lastName}`} */}
            {selectedUser && selectedUser.admin.email}
            &quot;
          </Typography>
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          <Typography gutterBottom className={classes.header}>
            You cannot undo this action.
          </Typography>
          <Typography gutterBottom className={classes.text}>
            The user will no longer be able to log in when account is
            deactivated.
          </Typography>
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
              Cancel
            </Button>
            <Button
              className={classes.inactiveBtn}
              variant="contained"
              onClick={handleSubmit}
            >
              Inactive
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

DeactivateAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateUsersTable: PropTypes.func.isRequired,
  selectedUser: PropTypes.objectOf(PropTypes.any),
};

DeactivateAlert.defaultProps = {
  selectedUser: null,
};
