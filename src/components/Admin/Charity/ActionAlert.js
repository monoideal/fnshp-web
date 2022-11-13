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
    minWidth: '450px',
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
    fontSize: '16px',
    marginTop: '15px',
    color: theme.palette.black.main,
    marginBottom: '4%',
    fontWeight: 'bold',
  },
  bodyTxt: {
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
  redBtn: {
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
  primaryBtn: {
    background: theme.palette.primary.main,
    padding: '10px 30px ',
    color: theme.palette.black.main,
    boxShadow: 'none',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}));

export default function ActionAlert({
  open,
  close,
  selectedCharity,
  updateUsersTable,
}) {
  const classes = useStyles();
  const api = useApi();

  const handleSubmit = async () => {
    await api
      .updateUserSuspension(
        selectedCharity.charityData.userId,
        selectedCharity.actionName === 'Deactivate Charity',
      )
      .then(success => {
        console.log(success);
        updateUsersTable(
          selectedCharity.actionName === 'Deactivate Charity',
          selectedCharity.charityData,
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
        <DialogContent dividers className={classes.root}>
          <Typography gutterBottom className={classes.title}>
            {selectedCharity.actionName}: &quot;
            {selectedCharity.charityData &&
              `${selectedCharity.charityData.name}`}
            &quot; ?
          </Typography>
          <Typography gutterBottom className={classes.text}>
            {selectedCharity.actionName === 'Deactivate Charity' &&
              'You can restore suspended account later.'}
            {selectedCharity.actionName === 'Restore' &&
              'Restore is immediate.'}
          </Typography>
          <CloseIcon
            className={classes.closeIcon}
            onClick={() => close(false)}
          />
          <Typography gutterBottom className={classes.bodyTxt}>
            {selectedCharity.actionName === 'Deactivate Charity'
              ? 'The Charity will be Suspended.'
              : 'The Charity will be restored.'}
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
              onClick={() => close(false)}
            >
              Cancel
            </Button>
            <Button
              className={
                selectedCharity.actionName === 'Deactivate Charity'
                  ? classes.redBtn
                  : classes.primaryBtn
              }
              variant="contained"
              onClick={handleSubmit}
            >
              {selectedCharity.actionName
                ? `${selectedCharity.actionName}`
                : 'not Selected'}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

ActionAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  updateUsersTable: PropTypes.func.isRequired,
  selectedCharity: PropTypes.shape({
    charityData: PropTypes.shape({
      userId: PropTypes.number,
      isSuspended: PropTypes.bool,
      name: PropTypes.string,
    }),
    charityIndex: PropTypes.number,
    actionName: PropTypes.string,
  }).isRequired,
};
