import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  inputTextField: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  containerTextField: {
    minWidth: 'fit-content',
  },
  iconInfo: {
    color: '#999',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  starRequired: {
    color: '#ff3333',
  },
  label: {
    top: 'inherit',
    left: 'inherit',
  },
}));

export function RequiredAsterisk() {
  const classes = useStyles();
  return <span className={classes.starRequired}>*</span>;
}

export default function StyledTextField({
  isRequired,
  label,
  shrink,
  pattern,
  value,
  maxLength,
  InputProps,
  inputProps,
  ...props
}) {
  const classes = useStyles();
  const fancyLabel = isRequired ? (
    <>
      {label}
      <RequiredAsterisk />
    </>
  ) : (
    label
  );

  return (
    <TextField
      variant="outlined"
      InputLabelProps={{ className: classes.label, shrink }}
      InputProps={{
        disableUnderline: true,
        required: isRequired,
        ...InputProps,
      }}
      // This is a legitimate prop of a TextField
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        pattern,
        maxLength,
        ...inputProps,
        className: clsx(inputProps.className, classes.inputTextField),
      }}
      label={fancyLabel}
      value={value}
      {...props}
    />
  );
}

StyledTextField.propTypes = {
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  shrink: PropTypes.bool,
  InputProps: PropTypes.shape({}),
  inputProps: PropTypes.shape({ className: PropTypes.string }),
  pattern: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
};

StyledTextField.defaultProps = {
  isRequired: false,
  label: '',
  shrink: undefined,
  InputProps: {},
  inputProps: {},
  pattern: undefined,
  value: '',
  maxLength: undefined,
};

export function ProfileTextField({ isCritical, ...props }) {
  const classes = useStyles();
  const maybeAddEndAdornment = isCritical
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Please note that this information is considered critical. Any updates will require an admin’s approval. The change will not update right away.">
              <InfoIcon className={classes.iconInfo} />
            </Tooltip>
          </InputAdornment>
        ),
      }
    : {};
  return (
    <Grid
      item
      component={StyledTextField}
      className={classes.containerTextField}
      xs={12}
      md={6}
      fullWidth
      InputProps={maybeAddEndAdornment}
      {...props}
    />
  );
}

ProfileTextField.propTypes = {
  isCritical: PropTypes.bool,
};

ProfileTextField.defaultProps = {
  isCritical: false,
};

export function StyledAutoField({ label, textProps, ...props }) {
  return (
    <Autocomplete
      autoHighlight
      renderInput={params => (
        <StyledTextField {...params} label={label} {...textProps} />
      )}
      {...props}
    />
  );
}

StyledAutoField.propTypes = {
  label: PropTypes.string,
  textProps: PropTypes.shape({}),
};

StyledAutoField.defaultProps = {
  label: '',
  textProps: {},
};
