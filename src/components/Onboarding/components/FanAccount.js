import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import TextField from 'components/shared/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { useApi } from 'api/';
import PrimaryButton from 'components/shared/PrimaryButton';
import PromoCodeAdd from 'components/shared/PromoCodeAdd';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 450, // sm breakpoint value
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  checkbox: {
    padding: `0 ${theme.spacing(1)}px`,
    [theme.breakpoints.down('md')]: {
      '& span': {
        fontSize: '.9rem',
        lineHeight: '1.4',
      },
    },
  },
  promoCodeCont: {
    margin: `0 -${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  continueButton: {
    margin: `${theme.spacing(3)}px auto`,
    textAlign: 'center',
  },
}));

export default function FanAccount({ formState, dispatch, handleSubmit }) {
  const classes = useStyles();
  const api = useApi();

  const [usernameOk, setUsernameOk] = useState(true);
  const debounceCheck = useMemo(
    () =>
      _.debounce(async username => {
        if (!username) {
          return;
        }

        const result = await api.usernameAvailable(username);
        setUsernameOk(result);
      }, 400),
    [api],
  );

  const handleChange = key => evt => {
    dispatch({
      type: 'form_edit',
      payload: { path: [key], value: evt.target.value },
    });
  };

  const handleCheckbox = key => evt => {
    dispatch({
      type: 'form_edit',
      payload: { path: [key], value: evt.target.checked },
    });
  };

  useEffect(() => {
    debounceCheck(formState.form.username);
  }, [formState.form.username, api]);

  return (
    <Grid
      item
      className={classes.container}
      component="form"
      onSubmit={evt => {
        if (!usernameOk) {
          return;
        }
        evt.preventDefault();
        handleSubmit();
      }}
    >
      <TextField
        label="Username"
        className={classes.input}
        value={formState.form.username}
        onChange={handleChange('username')}
        error={!usernameOk}
        helperText={
          !usernameOk
            ? 'Username unavailable!'
            : 'Must be unique! 50 characters maximum'
        }
        variant="outlined"
        inputProps={{ required: true }}
      />
      <TextField
        label="First name"
        className={classes.input}
        value={formState.form.firstName}
        onChange={handleChange('firstName')}
        variant="outlined"
        inputProps={{ required: true }}
      />
      <TextField
        label="Last name"
        className={classes.input}
        value={formState.form.lastName}
        onChange={handleChange('lastName')}
        variant="outlined"
        inputProps={{ required: true }}
      />
      <Box className={classes.promoCodeCont}>
        <PromoCodeAdd
          value={formState.form.promoCode}
          handleChange={handleChange('promoCode')}
        />
      </Box>
      <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            color="primary"
            checked={formState.form.notificationsEnabled || false}
            onChange={handleCheckbox('notificationsEnabled')}
          />
        }
        label="Allow important notifications to be sent by email"
      />
      <Box component="div" fontSize="14px" padding="8px">
        We periodically send out important news about Fanship to our users via
        email. We keep the email volume to an absolute minimum.
      </Box>
      <div className={classes.continueButton}>
        <PrimaryButton type="submit">Continue</PrimaryButton>
      </div>
    </Grid>
  );
}

FanAccount.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    form: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      isAnonymous: PropTypes.bool,
      promoCode: PropTypes.string,
      notificationsEnabled: PropTypes.bool,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
