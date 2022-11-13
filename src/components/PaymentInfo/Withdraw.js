import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import Button from 'components/shared/Button';
import StyledTextField from 'components/shared/StyledTextField';
import HomeLink from 'components/PaymentInfo/HomeLink';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '0px 25px 15px 25px',
    overflow: 'auto',
  },
  money: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  buttonSolid: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  buttonOutline: {
    border: '2px solid #ffc555',
    textTransform: 'none',
  },
  buttonPaypal: {
    border: '2px solid #ffc555',
    borderRadius: '4px',
    padding: '10px 25px',
    display: 'flex',
    alignItems: 'center',
  },
  containerButton: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '400px',
    marginTop: '10px',
  },
}));

function ConfirmDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        WITHDRAW
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <div style={{ padding: '30px 50px' }}>
          <DialogTitle id="confirm-dialog-title">Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              <div
                style={{ fontSize: '40px', fontWeight: 'bold', color: '#000' }}
              >
                $567.10
              </div>
              <div style={{ fontSize: '20px', color: '#000' }}>
                will be transferred to your bank
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button className={classes.buttonOutline} onClick={handleClose}>
              CANCEL
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose}>
              CONFIRM
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default function Withdraw() {
  const classes = useStyles();

  return (
    <>
      <HomeLink />

      <h1>Withdraw</h1>

      <Paper className={classes.paper}>
        <Grid
          container
          justify="flex-start"
          alignContent="space-between"
          className={classes.containerPaper}
          spacing={2}
        >
          <Grid item xs={12}>
            <h3>Payments</h3>
          </Grid>
          <Grid item xs={12}>
            Your account balance is:{' '}
            <span className={classes.money}>$567.10</span>
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              InputProps={{
                startAdornment: <span style={{ color: '#837e98' }}>$</span>,
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{ style: { padding: '10px 5px' } }}
              style={{ maxWidth: '250px' }}
            />
          </Grid>

          <Grid item xs={12} style={{ marginBottom: '40px' }}>
            Where do you want to transfer?
            <div className={classes.containerButton}>
              <div className={classes.buttonPaypal}>
                {/* This image is just a placeholder */}
                {/* eslint-disable */}
                <img
                  src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_76x48.png"
                  alt="Paypal Logo"
                  onClick={() => (window.location.href = 'https://paypal.com')}
                />
                {/* eslint-enable */}
              </div>
              <div style={{ margin: '10px 20px' }}>or</div>
              <Button className={classes.buttonOutline}>Direct Deposit</Button>
            </div>
          </Grid>

          <Grid item xs={12} className={classes.buttonContainer}>
            <ConfirmDialog />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
