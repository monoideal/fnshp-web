import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { MenuItem, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { ProfileTextField } from 'components/shared/StyledTextField';
import ButtonLink from 'components/shared/ButtonLink';
import StyledInputForm, { RowBreak } from 'components/shared/StyledInputForm';
import PaperHeader from 'components/Account/PaperHeader';

const useStyles = makeStyles(() => ({
  paperHeader: {
    marginTop: 20,
  },
  containerProfilePicture: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: '10px 0px',
    alignItems: 'center',
  },
  containerTextField: {
    minWidth: 'fit-content',
    '& > div': {
      width: '100%',
    },
  },
  containerAvatar: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  subHeading: {
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'italic',
    letterSpacing: '0.09em',
    margin: '10px 15px',
  },
  pendingWarning: {
    fontStyle: 'italic',
  },
}));

export default function CreatorUserProfile({
  formId,
  handleSubmit,
  formState,
  dispatch,
}) {
  const classes = useStyles();

  const handleChange = key => evt => {
    dispatch({
      type: 'form_edit',
      payload: { path: [key], value: evt.target.value },
    });
  };

  const handleDateChange = key => date => {
    dispatch({
      type: 'form_edit',
      payload: { path: [key], value: date },
    });
  };

  const multiFieldOrDefault = baseKey => formState[baseKey] || [{}];

  const handleMultiChange = (baseKey, idx) => fieldKey => evt => {
    const { value } = evt.target;
    dispatch({
      type: 'form_edit',
      payload: { path: [baseKey, idx, fieldKey], value },
    });
  };

  const appendFor = key => {
    dispatch({ type: 'form_add_section', payload: key });
  };

  const removeFor = key => {
    dispatch({ type: 'form_delete_section', payload: key });
  };

  return (
    <StyledInputForm formId={formId} handleSubmit={handleSubmit}>
      <div className={classes.pendingWarning}>
        Any updates to your account will change the status to Pending while we
        verify the information. Verification can take up to 2 business days.
      </div>
      <PaperHeader
        styleOverrides={{ label: classes.paperHeader }}
        label="Account Information"
      />
      <ProfileTextField
        label="First name"
        error={!formState.firstName}
        value={formState.firstName}
        onChange={handleChange('firstName')}
        isRequired
        md={4}
      />
      <ProfileTextField
        label="Middle name"
        value={formState.middleName}
        onChange={handleChange('middleName')}
        md={4}
      />
      <ProfileTextField
        label="Last name"
        error={!formState.lastName}
        value={formState.lastName}
        onChange={handleChange('lastName')}
        isRequired
        md={4}
      />
      <RowBreak />

      <Grid
        item
        className={classes.containerTextField}
        xs={12}
        md={6}
        fullWidth
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            varient="static"
            error={!formState.dateOfBirth}
            inputVariant="outlined"
            format="YYYY-MM-DD"
            margin="normal"
            id="date-picker-inline"
            label="Date of Birth (YYYY-MM-DD)"
            value={
              formState.dateOfBirth === 0
                ? null
                : moment
                    .unix(formState.dateOfBirth)
                    .utc()
                    .format('YYYY-MM-DD')
            }
            onChange={handleDateChange('dateOfBirth')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid
        item
        className={classes.containerTextField}
        xs={12}
        md={6}
        fullWidth
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            varient="static"
            inputVariant="outlined"
            format="YYYY-MM-DD"
            margin="normal"
            id="date-picker-inline"
            label="Date of Death (YYYY-MM-DD)"
            value={
              formState.dateOfDeath === 0
                ? null
                : moment
                    .unix(formState.dateOfDeath)
                    .utc()
                    .format('YYYY-MM-DD')
            }
            onChange={handleDateChange('dateOfDeath')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <RowBreak />
      <ProfileTextField
        value={formState.email}
        onChange={handleChange('email')}
        isRequired
        type="email"
        label="Email"
        helperText="Email used for communication."
        disabled
      />
      <ProfileTextField
        value={formState.paymentEmail}
        onChange={handleChange('paymentEmail')}
        isRequired
        type="email"
        label="Payment Email"
        helperText="Email used to receive payments from Fanship via e-transfer."
      />
      <RowBreak />
      <ProfileTextField
        value={formState.phoneNumber}
        error={!formState.phoneNumber}
        onChange={handleChange('phoneNumber')}
        type="tel"
        pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
        helperText="111-222-3333 or 1112223333"
        label="Phone Number"
        isRequired
      />
      <RowBreak />
      <PaperHeader
        styleOverrides={{ label: classes.paperHeader }}
        label="Address"
      />
      {multiFieldOrDefault('address').map((elem, idx) => {
        const handleSubChange = handleMultiChange('address', idx);
        const isFirstRow = idx === 0;

        return (
          <React.Fragment key={idx}>
            {!isFirstRow && (
              <PaperHeader
                label={`Address #${idx + 1}`}
                styleOverrides={{ label: classes.subHeading }}
              />
            )}
            <ProfileTextField
              value={elem.type}
              onChange={handleSubChange('type')}
              label="Type of address"
              isRequired={isFirstRow}
              select
            >
              <MenuItem value="home">Home</MenuItem>
              <MenuItem value="office">Office</MenuItem>
            </ProfileTextField>
            <RowBreak />
            <ProfileTextField
              value={elem.address1}
              onChange={handleSubChange('address1')}
              label="Address"
              isRequired={isFirstRow}
            />
            <ProfileTextField
              value={elem.city}
              onChange={handleSubChange('city')}
              label="City"
              isRequired={isFirstRow}
            />
            <RowBreak />
            <ProfileTextField
              value={elem.state}
              onChange={handleSubChange('state')}
              isRequired={isFirstRow}
              label="Province/State"
              md={4}
            />
            <ProfileTextField
              value={elem.country}
              onChange={handleSubChange('country')}
              isRequired={isFirstRow}
              label="Country"
              md={4}
            />
            <ProfileTextField
              value={elem.postalCode}
              onChange={handleSubChange('postalCode')}
              isRequired={isFirstRow}
              label="Postal/Zip Code"
              md={4}
            />
          </React.Fragment>
        );
      })}
      <RowBreak />
      <ButtonLink onClick={() => appendFor('address')}>
        + Add Address
      </ButtonLink>
      {multiFieldOrDefault('address').length > 1 && (
        <ButtonLink onClick={() => removeFor('address')}>
          - Remove Address
        </ButtonLink>
      )}
    </StyledInputForm>
  );
}

CreatorUserProfile.propTypes = {
  formId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    dateOfDeath: PropTypes.string,
    email: PropTypes.string,
    paymentEmail: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        address1: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string,
        postalCode: PropTypes.string,
      }),
    ),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
