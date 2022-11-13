/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  TableCell,
  Snackbar,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuditHistory from 'components/Catalog/View/AuditHistory';
import RemoveFromSale from 'components/Catalog/View/RemoveFromSale';
import { get, has } from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles(theme => ({
  dialogModelWidth: {
    width: 640,
  },
  buttonContainer: {
    justifyContent: 'flex-end;',
  },
  button: {
    width: '141px',
    height: '44px',
    fontSize: '14px',
    fontWeight: 600,
  },
  cancelButton: {
    width: '115px',
    height: '44px',
    borderRadius: '2px',
    boxShadow:
      '0 1px 1px 0 rgba(0, 0, 0, 0.03), inset 0 1px 1px 0 rgba(0, 0, 0, 0.03)',
    border: 'solid 1px #dddddd',
    backgroundColor: '#ffffff',
    fontWeight: 600,
    fontSize: '14px',
    textTransform: 'capitalize',
    color: '#202f35',
  },
  dialogHeader: {
    marginTop: '-35px',
    height: '30px',
    fontSize: '22px',
    fontWeight: 600,
  },
  confirmText: {
    height: '72px',
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#333333',
    paddingButtom: '30px',
  },
  alignment: {
    padding: theme.spacing(3),
  },
  container: {
    textAlign: 'center',
  },
  itemsData: {
    padding: '36px',
    fontSize: '20px',
    fontFamily: "'Rubik','sans-serif'",
    fontWeight: '550',
    color: theme.palette.black.main,
  },
  bodyTxt: {
    fontSize: '14px',
    fontWeight: '500',
  },
  txtItem: {
    fontFamily: "'Rubik','sans-serif'",
    textAlign: 'left',
    paddingTop: '10px',
    paddingBottom: '15px',
    '& div': {
      margin: '10px',
    },
  },
  txtLinks: {
    color: '#c04800',
    fontSize: '14px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  expanssion: {
    background: '#fff7e8',
  },
}));

export default function MoreDetails({ booksDetails, updateUsersTable }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [isRemoveSale, setIsRemoveSale] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [openConfirmEditDialog, setOpenConfirmEditDialog] = useState(false);
  const { book = {}, summary = {} } = booksDetails;

  function handleRemoveSale() {
    setOpenRemove(true);
    if (book && book.shopifyStatus === 'published') {
      setIsRemoveSale(false);
    }
  }
  function closeDialog() {
    setOpenConfirmEditDialog(false);
  }
  function openDialog() {
    setOpenConfirmEditDialog(true);
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <TableCell align="left" className={classes.expanssion} colSpan={5}>
      <Grid container className={classes.container}>
        <Grid item xs className={classes.itemsData}>
          <Grid item xs={12}>
            {summary.unitsSold}
          </Grid>
          <Grid item xs={12} className={classes.bodyTxt}>
            Units Sold
          </Grid>
        </Grid>
        <Grid item xs className={classes.itemsData}>
          <Grid item xs={12}>
            ${`${summary.netRevenue}`}
          </Grid>
          <Grid item xs={12} className={classes.bodyTxt}>
            Net Revenue
          </Grid>
        </Grid>
        <Grid item xs className={classes.itemsData}>
          <Grid item xs={12}>
            ${`${summary.tipsReceived}`}
          </Grid>
          <Grid item xs={12} className={classes.bodyTxt}>
            Applause Received
          </Grid>
        </Grid>
        <Grid item xs={false} lg />
        <Grid item xs className={classes.txtItem}>
          <Grid item xs={12}>
            <Typography
              className={classes.txtLinks}
              onClick={() => setOpen(true)}
            >
              Audit History
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.txtLinks} onClick={handleRemoveSale}>
              Remove from Sale
            </Typography>
          </Grid>
          {book.status !== 'Approved' ? (
            <Grid item xs={12}>
              <Typography
                className={classes.txtLinks}
                component={Link}
                to={`/catalog/new/edit/${book.id}`}
              >
                Edit Work
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography
                className={classes.txtLinks}
                onClick={() => openDialog()}
              >
                Edit Work
              </Typography>

              <Dialog
                open={openConfirmEditDialog}
                onClick={() => closeDialog()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
              >
                <div className={classes.dialogModelWidth}>
                  <DialogActions>
                    <Button onClick={() => closeDialog()}>
                      <CloseOutlinedIcon />
                    </Button>
                  </DialogActions>
                  <DialogTitle
                    id="alert-dialog-title-share"
                    className={classes.dialogHeader}
                  >
                    Edit Approved Claim
                  </DialogTitle>
                  <DialogContent className={classes.alignment}>
                    <DialogContentText
                      id="alert-dialog-description-share"
                      className={classes.confirmText}
                    >
                      Updating an Approved claim will revert the status to
                      “Pending”. Are you sure you want to continue?
                    </DialogContentText>
                    <Grid container className={classes.buttonContainer}>
                      <Grid item xs={3}>
                        <Button
                          className={classes.cancelButton}
                          variant="contained"
                          onClick={() => closeDialog()}
                        >
                          CANCEL
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          className={classes.button}
                          color="primary"
                          component={Link}
                          to={`/catalog/new/edit/${book.id}`}
                        >
                          CONTINUE
                        </Typography>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </div>
              </Dialog>
            </Grid>
          )}
          {get(book, 'status') === 'Rejected' ? null : has(book, 'price') &&
            get(book, 'status') === 'Approved' ? (
            <Grid item xs={12}>
              <Typography
                className={classes.txtLinks}
                component={Link}
                to={`/catalog/view/${book.id}`}
              >
                View Royalty Contract
              </Typography>
            </Grid>
          ) : get(book, 'status') === 'Pending' ? (
            <>
              <Grid item xs={12}>
                <Typography
                  className={classes.txtLinks}
                  onClick={() => setSnackbarOpen(true)}
                >
                  Create Royalty Contract
                </Typography>
              </Grid>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={`Cannot create royalty for ${book.status} book.`}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              />
            </>
          ) : (
            <Grid item xs={12}>
              <Typography
                className={classes.txtLinks}
                component={Link}
                to={`/catalog/${book.id}/royalty-contract`}
              >
                Create Royalty Contract
              </Typography>
            </Grid>
          )}
        </Grid>
        <AuditHistory
          open={open}
          close={() => setOpen(false)}
          booksDetails={book}
        />
        <RemoveFromSale
          open={openRemove}
          close={() => setOpenRemove(false)}
          booksDetails={book}
          updateUsersTable={updateUsersTable}
          isRemoveSale={isRemoveSale}
        />
      </Grid>
    </TableCell>
  );
}

MoreDetails.propTypes = {
  booksDetails: PropTypes.shape({
    book: PropTypes.object,
    summary: PropTypes.object,
  }),
  updateUsersTable: PropTypes.func.isRequired,
};

MoreDetails.defaultProps = {
  booksDetails: {
    book: {},
    summary: {},
  },
};
