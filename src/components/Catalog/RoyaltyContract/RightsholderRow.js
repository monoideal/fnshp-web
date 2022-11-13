import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import StyledTextField, {
  StyledAutoField,
} from 'components/shared/StyledTextField';
import FieldsValidation from 'components/Catalog/RoyaltyContract/fieldsValidation';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '12px',
    height: '80px',
  },
  index: {
    padding: '15px',
    width: '40px',
  },
  label: {
    color: theme.palette.darkGrey.main,
  },
  textField: {
    marginRight: '15px',
  },
  alertMessage: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    marginLeft: '10px',
    color: theme.palette.primary.main,
    fontWeight: '550',
  },
}));

export default function RightsholderRow(props) {
  const classes = useStyles();
  const handleProps = props;
  const {
    mainHolder,
    index,
    handleRightHolders,
    readOnly,
    bookId,
    creatorList,
    royaltyHolder
  } = handleProps;
  const [rightsValues, setRightsValues] = useState({
    values: {
      name: readOnly ? mainHolder.mainHolder.name : royaltyHolder?.name,
      email: readOnly ? mainHolder.mainHolder.email : royaltyHolder?.email,
      percentage: readOnly ? mainHolder.mainHolder.percentage : royaltyHolder?.percentage,
    },
    errors: {
      name: readOnly ? false : '',
      email: readOnly ? false : '',
      percentage: readOnly ? false : '',
    },
    messages: {
      name: '',
      email: '',
      percentage: '',
    },
  });

  const mounted = useRef();
  useEffect(() => {
    const init = () => {
      if (!mounted.current) {
        mounted.current = true;
      } else {
        let fieldsvalidationResult = 0;
        const { errors } = rightsValues;
        Object.keys(errors).forEach(key => {
          if (errors[key] === true || errors[key] === '""') {
            fieldsvalidationResult += 1;
          }
        });
        if (!readOnly) {
          if (fieldsvalidationResult === 0) {
            handleRightHolders(index, rightsValues.values);
          }
        }
      }
    }
    init();
  });

  const handleInputs = (name, value, type) => {
    const updateValues = rightsValues.values;
    const updateErrors = rightsValues.errors;
    const updateMessages = rightsValues.messages;

    if (FieldsValidation(value, type) === true) {
      updateErrors[name] = false;
      updateValues[name] = value;
      updateMessages[name] = '';
      setRightsValues({
        values: updateValues,
        errors: updateErrors,
        messages: updateMessages,
      });
    } else {
      updateErrors[name] = true;
      updateValues[name] = value;
      updateMessages[name] = FieldsValidation(value, type);
      setRightsValues({
        values: updateValues,
        errors: updateErrors,
        messages: updateMessages,
      });
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      classes={{ root: classes.container }}
      className={classes.txtField}
    >
      <Grid item>
        <Box classes={{ root: classes.index }}>{index + 1}</Box>
      </Grid>
      <Grid item xs={6}>
        <StyledAutoField
          className={classes.textField}
          label="Rightsholder"
          options={creatorList}
          disabled={readOnly}
          getOptionLabel={({ name, userId, isOrganization }) => {
            if (!name) {
              return '';
            }

            let label = `${name} (${userId})`;
            if (isOrganization) {
              label = `[ORG] ${label}`;
            }

            return label;
          }}
          value={rightsValues.values.name}
          onChange={(evt, val) => handleInputs('name', val, 'name')}
          textProps={{
            error:
              rightsValues.errors.name === ''
                ? false
                : rightsValues.errors.name,
            helperText: rightsValues.messages.name,
            fullWidth: true,
          }}
        />
      </Grid>
      <Grid item>
        <StyledTextField
          classes={{ root: classes.textField }}
          label="Royalty Percentage (%)"
          className={classes.label}
          value={rightsValues.values.percentage}
          helperText={rightsValues.messages.percentage}
          error={
            rightsValues.errors.percentage === ''
              ? false
              : rightsValues.errors.percentage
          }
          onChange={value =>
            handleInputs('percentage', value.target.value, 'percentage')
          }
          InputProps={{ readOnly }}
        />
      </Grid>
    </Grid>
  );
}
