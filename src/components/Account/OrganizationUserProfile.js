import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';

import ButtonLink from 'components/shared/ButtonLink';
import { ProfileTextField } from 'components/shared/StyledTextField';
import StyledInputForm, { RowBreak } from 'components/shared/StyledInputForm';
import PaperHeader from 'components/Account/PaperHeader';

const classes = {
  subHeading: {
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'italic',
    letterSpacing: '0.09em',
    margin: '10px 15px',
  },
};

export default function OrganizationUserProfile({
  formId,
  handleSubmit,
  formState,
  dispatch,
}) {
  const handleChange = key => evt => {
    dispatch({
      type: 'form_edit',
      payload: { path: [key], value: evt.target.value },
    });
  };

  // TODO: chkBox to be used when conditions to disable Save button is implemented for Org
  const [chkBox, setChkBox] = React.useState(false);
  const [chkBoxArr, setChkBoxArr] = React.useState([]);

  function handleChkBox(value, index) {
    const chkItem = chkBoxArr;
    chkItem[index] = value;
    setChkBoxArr(chkItem);

    // check if at least one checkbox was checked
    if (chkItem.length > 1) {
      const checked = chkItem.some(c => c === true);
      setChkBox(checked);
    } else {
      setChkBox(value);
    }
  }

  const multiFieldOrDefault = baseKey =>
    formState[baseKey].length > 0 ? formState[baseKey] : [{}];

  const handleMultiChange = (baseKey, idx) => (fieldKey, opt = {}) => evt => {
    let { value } = evt.target;
    if (opt.isCheckbox) {
      value = evt.target.checked;
      //store value
      handleChkBox(value, idx);
    }
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
      <PaperHeader label="Organization Information" />
      <RowBreak />
      <ProfileTextField
        label="Organization Name"
        isCritical
        isRequired
        value={formState.name}
        onChange={handleChange('name')}
      />
      <ProfileTextField
        label="Website URL"
        type="url"
        isCritical
        value={formState.url}
        onChange={handleChange('url')}
      />
      <RowBreak />
      <ProfileTextField
        label="Phone Number"
        type="tel"
        pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
        helperText="111-222-3333 or 1112223333"
        isRequired
        value={formState.phoneNumber}
        onChange={handleChange('phoneNumber')}
      />
      <ProfileTextField
        label="Parent Company"
        isCritical
        value={formState.parentCompany}
        onChange={handleChange('parentCompany')}
      />
      <RowBreak />

      {multiFieldOrDefault('subsidiaryCompany').map((elem, idx) => {
        const handleSubChange = handleMultiChange('subsidiaryCompany', idx);
        let label = 'Subsidiary Company';
        if (idx !== 0) {
          label = `${label} ${idx + 1}`;
        }

        return (
          <React.Fragment key={idx}>
            <ProfileTextField
              isCritical
              value={elem.name}
              onChange={handleSubChange('name')}
              label={label}
            />
          </React.Fragment>
        );
      })}
      <RowBreak />
      <ButtonLink onClick={() => appendFor('subsidiaryCompany')}>
        + Add Subsidiary Company
      </ButtonLink>
      {multiFieldOrDefault('subsidiaryCompany').length > 1 && (
        <ButtonLink onClick={() => removeFor('subsidiaryCompany')}>
          - Remove Subsidiary Company
        </ButtonLink>
      )}
      <RowBreak />

      {multiFieldOrDefault('address').map((elem, idx) => {
        const handleSubChange = handleMultiChange('address', idx);
        const isFirstRow = idx === 0;

        return (
          <React.Fragment key={idx}>
            {!isFirstRow && (
              <PaperHeader
                label={`Address #${idx + 1}`}
                style={classes.subHeading}
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
              isCritical
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
      <RowBreak />

      <PaperHeader label="Contact Person Information" />
      {multiFieldOrDefault('contactPerson').map((elem, idx) => {
        const handleSubChange = handleMultiChange('contactPerson', idx);
        const isFirstRow = idx === 0;

        return (
          <React.Fragment key={idx}>
            {!isFirstRow && (
              <PaperHeader
                label={`Contact #${idx + 1}`}
                style={classes.subHeading}
              />
            )}
            <ProfileTextField
              value={elem.firstName}
              onChange={handleSubChange('firstName')}
              isRequired={isFirstRow}
              label="First Name"
              isCritical
            />
            <ProfileTextField
              value={elem.lastName}
              onChange={handleSubChange('lastName')}
              isRequired={isFirstRow}
              label="Last Name"
              isCritical
            />
            <RowBreak />
            <ProfileTextField
              value={elem.email}
              onChange={handleSubChange('email')}
              isRequired={isFirstRow}
              type="email"
              label="Email"
            />
            <ProfileTextField
              value={elem.phoneNumber}
              onChange={handleSubChange('phoneNumber')}
              isRequired={isFirstRow}
              type="tel"
              pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
              helperText="111-222-3333 or 1112223333"
              label="Phone Number"
            />
            <RowBreak />
            <ProfileTextField
              value={elem.jobTitle}
              onChange={handleSubChange('jobTitle')}
              label="Job Title"
            />
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  color="primary"
                  checked={elem.isPrimary || false}
                  onChange={handleSubChange('isPrimary', {
                    isCheckbox: true,
                  })}
                />
              }
              label="This Person is authorized to act on behalf of the organization"
            />
            <RowBreak />
          </React.Fragment>
        );
      })}
      <RowBreak />
      <ButtonLink onClick={() => appendFor('contactPerson')}>
        + Add Contact Person
      </ButtonLink>
      {multiFieldOrDefault('contactPerson').length > 1 && (
        <ButtonLink onClick={() => removeFor('contactPerson')}>
          - Remove Contact Person
        </ButtonLink>
      )}
    </StyledInputForm>
  );
}

OrganizationUserProfile.propTypes = {
  formId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    phoneNumber: PropTypes.string,
    parentCompany: PropTypes.string,
    subsidiaryCompany: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string }),
    ),
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
    contactPerson: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
        jobTitle: PropTypes.string,
        isPrimary: PropTypes.bool,
      }),
    ),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
