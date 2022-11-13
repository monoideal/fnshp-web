import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { set } from 'lodash';
import MomentUtils from '@date-io/moment';
import {
  MenuItem,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
// import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { ProfileTextField } from 'components/shared/StyledTextField';
import StyledInputForm, { RowBreak } from 'components/shared/StyledInputForm';
import PaperHeader from 'components/Account/PaperHeader';
import PrimaryButton from 'components/shared/PrimaryButton';

// const accountUpdated = creator => {
//   const updated = [];
//   if (creator.address.length > 0) updated.push('address');
//   if (creator.dateOfBirth !== 0) updated.push('date of birth');
//   if (creator.firstName && creator.lastName) updated.push('full name');
//   if (creator.phoneNumber) updated.push('phone number');
//   return updated;
// };

const useStyles = makeStyles(theme => ({
  main: {
    maxWidth: 1200,
    padding: theme.spacing(3),
    '& a': {
      textDecoration: 'underline',
    },
    '& h1': {
      fontSize: 36,
      textAlign: 'center',
      margin: '50px 0 20px',
    },
  },
  introImage: {
    maxWidth: 329,
    margin: '0 auto',
    '& > img': {
      display: 'block',
      width: '100%',
      height: 'auto',
    },
  },
  // plaidSuccess: {
  //   display: 'flex',
  //   padding: '10px 20px',
  //   maxWidth: 580,
  //   backgroundImage: 'linear-gradient(90deg, #00998F 0%, #11CCB3 100%)',
  //   borderRadius: 7,
  //   fontSize: 18,
  //   color: 'white',
  //   '& > svg': {
  //     width: 70,
  //     height: 70,
  //     paddingRight: 20,
  //   },
  // },
  littlemore: {
    maxWidth: 420,
    fontSize: 18,
    color: '#4E4E4E',
    lineHeight: 1.5,
    textAlign: 'center',
  },
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
  continueButtonCont: {
    width: '100%',
    marginTop: 50,
    textAlign: 'center',
  },
  alignAdjustment: {
    marginTop: '0 !important',
  },
}));

const OnboardingCreatorReducer = (state, action) => {
  switch (action.type) {
    case 'form_edit': {
      const { path, value } = action.payload;
      const toUpdate = { ...state };
      set(toUpdate, [...path], value);

      if (path[0] === 'dateOfBirth') {
        toUpdate.dateOfBirth =
          value && value !== '' ? moment.utc(value, 'YYYY-MM-DD').unix() : 0;
      }

      return toUpdate;
    }
    default:
      throw new Error('invalid action for dispatch');
  }
};

export default function CreatorUserProfile({ handleCreate, profile }) {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [updatedProfile, dispatchProfile] = useReducer(
    OnboardingCreatorReducer,
    {},
  );

  const firstAddress = updatedProfile.address && updatedProfile.address[0];

  useEffect(() => {
    const setDefaultPaymentEmail = () => {
      dispatchProfile({
        type: 'form_edit',
        payload: { path: ['paymentEmail'], value: profile.email },
      });
    };
    setDefaultPaymentEmail();
  }, []);

  const handleChange = key => evt => {
    dispatchProfile({
      type: 'form_edit',
      payload: { path: [key], value: evt.target.value },
    });
  };

  const handleDateChange = key => date => {
    dispatchProfile({
      type: 'form_edit',
      payload: { path: [key], value: date },
    });
  };

  const handleMultiChange = (baseKey, idx) => fieldKey => evt => {
    const { value } = evt.target;
    console.log({ path: [baseKey, idx, fieldKey], value });
    dispatchProfile({
      type: 'form_edit',
      payload: { path: [baseKey, idx, fieldKey], value },
    });
  };

  const handleSubChange = handleMultiChange('address', 0);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={3}
      className={classes.main}
    >
      <div className={classes.introImage}>
        <img
          src="/img/deco/fs_plaid_lady.png"
          width={329}
          height={270}
          alt="Plaid security"
        />
      </div>

      <h1>Verify your identity</h1>
      {/* <div className={classes.plaidSuccess}>
        <CheckIcon />
        <p>
          Success! We were successfully able to retrieve your{' '}
          <strong>{accountUpdated(profile).join(', ')}</strong>
        </p>
      </div> */}

      <p className={classes.littlemore}>
        To complete your identity verification process we need a little more
        information about you.
      </p>

      <StyledInputForm handleSubmit={() => handleCreate(updatedProfile)}>
        <PaperHeader
          styleOverrides={{ label: classes.paperHeader }}
          label="Basic Information"
        />
        {profile && !profile.firstName && (
          <ProfileTextField
            label="First name"
            value={updatedProfile.firstName}
            onChange={handleChange('firstName')}
            className={classes.alignAdjustment}
            isRequired
            md={6}
          />
        )}
        {profile && !profile.lastName && (
          <ProfileTextField
            label="Last name"
            value={updatedProfile.lastName}
            onChange={handleChange('lastName')}
            className={classes.alignAdjustment}
            isRequired
            md={6}
          />
        )}
        {profile && !profile.paymentEmail && (
          <ProfileTextField
            label="Payment Email"
            value={updatedProfile.paymentEmail}
            onChange={handleChange('paymentEmail')}
            isRequired
            type="email"
            variant="outlined"
            defaultValue={profile.email}
            helperText="Used to receive payments via e-transfer"
            md={6}
          />
        )}
        {profile && !profile.dateOfBirth && (
          <Grid item className={classes.containerTextField} xs={12} md={6}>
            <MuiPickersUtilsProvider utils={MomentUtils} isRequired>
              <KeyboardDatePicker
                inputVariant="outlined"
                format="YYYY-MM-DD"
                margin="none"
                error={false}
                required
                id="date-picker-inline"
                label="Date of Birth"
                helperText="(YYYY-MM-DD)"
                value={
                  !updatedProfile.dateOfBirth
                    ? null
                    : moment
                        .unix(updatedProfile.dateOfBirth)
                        .utc()
                        .format('YYYY-MM-DD')
                }
                onChange={handleDateChange('dateOfBirth')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                clearable
                autoOk
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        )}
        {profile && !profile.phoneNumber && (
          <ProfileTextField
            value={updatedProfile.phoneNumber}
            onChange={handleChange('phoneNumber')}
            type="tel"
            pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
            helperText="111-222-3333 or 1112223333"
            label="Phone Number"
            isRequired
          />
        )}
        {profile && !profile.address.length > 0 && (
          <React.Fragment>
            <PaperHeader
              styleOverrides={{ label: classes.paperHeader }}
              label="Address"
            />
            <RadioGroup
              aria-label="Type of address"
              required
              name="type"
              onChange={handleSubChange('type')}
              value={firstAddress && firstAddress.type}
              style={{ flexDirection: 'row' }}
            >
              <FormControlLabel
                value="home"
                control={<Radio color="primary" required />}
                label="Home"
              />
              <FormControlLabel
                value="office"
                control={<Radio color="primary" required />}
                label="Office"
              />
            </RadioGroup>
            <RowBreak />
            <ProfileTextField
              value={firstAddress && firstAddress.address1}
              onChange={handleSubChange('address1')}
              label="Address"
              isRequired
            />
            <ProfileTextField
              value={firstAddress && firstAddress.city}
              onChange={handleSubChange('city')}
              label="City"
              isRequired
            />
            <RowBreak />
            <ProfileTextField
              value={firstAddress && firstAddress.state}
              onChange={handleSubChange('state')}
              isRequired
              label="Province/State"
              xs={12}
              md={4}
            />
            <ProfileTextField
              value={firstAddress && firstAddress.country}
              onChange={handleSubChange('country')}
              isRequired
              label="Country"
              xs={12}
              md={5}
            />
            <ProfileTextField
              value={firstAddress && firstAddress.postalCode}
              onChange={handleSubChange('postalCode')}
              isRequired
              label="Postal/Zip Code"
              xs={12}
              md={3}
            />
          </React.Fragment>
        )}
        <div className={classes.continueButtonCont}>
          <PrimaryButton type="submit">Continue</PrimaryButton>
        </div>
      </StyledInputForm>
    </Grid>
  );
}

CreatorUserProfile.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    paymentEmail: PropTypes.string,
    email: PropTypes.string,
    dateOfBirth: PropTypes.number,
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
};
