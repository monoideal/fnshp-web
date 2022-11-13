import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Dialog, Typography, Grid } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { useApi } from 'api/';
import { toast } from 'react-toastify';

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

export default function RemoveFromSale({
  open,
  close,
  booksDetails,
  updateUsersTable,
  isRemoveSale,
}) {
  const classes = useStyles();
  const api = useApi();

  const handleSubmit = async () => {
    await api
      .disableBookForSale(booksDetails.id)
      .then(success => {
        console.log(success);
        updateUsersTable();
        toast.success(`${booksDetails.title} removed from sale.`);
      })
      .catch(error => {
        console.log(error);
        toast.error('failed to remove book from sale.');
      });
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
            Remove &quot;
            {booksDetails && `${booksDetails.title}`}
            &quot;
          </Typography>
          <CloseIcon
            className={classes.closeIcon}
            onClick={() => close(false)}
          />
          <Typography gutterBottom className={classes.header}>
            {isRemoveSale
              ? 'Please create the royalty to remove from sale'
              : 'You cannot undo this action.'}
          </Typography>
          <Typography gutterBottom className={classes.text}>
            The book will be removed from the sale
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
              className={classes.inactiveBtn}
              variant="contained"
              onClick={handleSubmit}
              disabled={isRemoveSale}
            >
              Remove
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

RemoveFromSale.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  booksDetails: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
  }),
  updateUsersTable: PropTypes.func.isRequired,
  isRemoveSale: PropTypes.bool.isRequired,
};

RemoveFromSale.defaultProps = {
  booksDetails: {
    title: '',
  },
};
