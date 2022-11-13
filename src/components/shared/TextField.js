import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputBase,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: props => ({
    marginTop: theme.spacing(3),
    border: `${theme.palette[props.color].main} solid 1px`,
    borderRadius: 4,
    boxShadow: `inset 0 0 1px 1px ${theme.palette[props.color].light}`,
    background: 'white',
    '& input': {
      padding: '18.5px 14px',
    },
  }),
  formControl: {
    width: '100%',
  },
  label: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: theme.palette.black.light,
    '&.Mui-focused': {
      color: theme.palette.black.main,
    },
  },
}));

const TextField = props => {
  const { label, value, color, className, helperText, error, ...rest } = props;
  const classes = useStyles({ color });

  return (
    <FormControl className={className} error={error}>
      <InputLabel className={classes.label} shrink>
        {label}
      </InputLabel>
      <InputBase value={value} className={classes.textField} {...rest} />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  className: PropTypes.string,
};

TextField.defaultProps = {
  label: null,
  color: 'grey',
  value: '',
  helperText: null,
  error: false,
  className: null,
};

export default TextField;
