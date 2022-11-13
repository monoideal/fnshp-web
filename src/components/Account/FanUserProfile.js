import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PaperHeader from 'components/Account/PaperHeader';
import { ProfileTextField } from 'components/shared/StyledTextField';
import StyledInputForm, { RowBreak } from 'components/shared/StyledInputForm';
import { useApi } from 'api/';

const useStyles = makeStyles(theme => ({
  checkbox: {
    padding: '0 8px',
    [theme.breakpoints.down('md')]: {
      '& span': {
        fontSize: '14px',
      },
    },
  },
}));

export default function FanUserProfile({
  formId,
  handleSubmit,
  formState,
  dispatch,
}) {
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
    debounceCheck(formState.username);
  }, [formState.username, api]);

  return (
    <StyledInputForm
      formId={formId}
      handleSubmit={() => {
        if (!usernameOk) {
          return;
        }

        handleSubmit();
      }}
    >
      <PaperHeader label="Account Information" />
      {/* user information */}
      <ProfileTextField
        label="Username"
        value={formState.username}
        onChange={handleChange('username')}
        error={!usernameOk}
        helperText={!usernameOk && 'Username unavailable!'}
        isRequired
        md={6}
      />
      <RowBreak />

      <ProfileTextField
        label="First name"
        value={formState.firstName}
        onChange={handleChange('firstName')}
        isRequired
      />
      <ProfileTextField
        label="Last name"
        value={formState.lastName}
        onChange={handleChange('lastName')}
        isRequired
      />
      <PaperHeader label="Notifications" />
      <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            color="primary"
            checked={formState.notificationsEnabled || false}
            onChange={handleCheckbox('notificationsEnabled')}
          />
        }
        label="Allow important notifications to be sent by email"
      />
      <Box component="div" fontSize="14px" padding="8px">
        {
          'We periodically send out important news about Fanship to our users via email. We keep the email volume to an absolute minimum.'
        }
      </Box>
    </StyledInputForm>
  );
}

FanUserProfile.propTypes = {
  formId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isAnonymous: PropTypes.bool,
    notificationsEnabled: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
