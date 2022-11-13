import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Grid } from '@material-ui/core';

import history from 'lib/history';
import HomeLink from 'components/PaymentInfo/HomeLink';
import TextField from 'components/shared/StyledTextField';
import Button from 'components/shared/Button';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
  },
  row: {
    marginTop: 30,
  },
  cancelButton: {
    borderWidth: 2,
    color: theme.palette.black.main,
    '&:hover': {
      borderWidth: 2,
    },
  },
}));

export default function PaypalLink({ initialEmail, onSubmit }) {
  const classes = useStyles();
  const [email, setEmail] = useState(initialEmail);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email);
    history.push('/payment-info');
  }

  useEffect(() => setEmail(initialEmail), [initialEmail]);

  return (
    <>
      <HomeLink />
      <h3>Other Payment Option</h3>

      <Paper className={classes.paper}>
        <Box fontSize={17}>
          {'Please provide your email to receive payments from Fanship.'}
        </Box>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <form onSubmit={handleSubmit} className={classes.row}>
              <TextField
                fullWidth
                type="email"
                label="Email Address"
                value={email}
                onChange={handleChangeEmail}
              />
              <input type="submit" hidden />
            </form>
          </Grid>
        </Grid>
        <Grid container className={classes.row} spacing={2}>
          <Grid item sm={3} xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={e => {
                handleSubmit(e);
              }}
            >
              SAVE
            </Button>
          </Grid>
          <Grid item sm={3} xs={12}>
            <Button
              className={classes.cancelButton}
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push('/payment-info');
              }}
            >
              CANCEL
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

PaypalLink.propTypes = {
  initialEmail: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

PaypalLink.defaultProps = {
  initialEmail: '',
};
