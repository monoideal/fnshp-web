import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography, IconButton, Grid } from '@material-ui/core/';
import ArrayFieldStyle from 'components/Catalog/New/ArrayFieldsStyle';
import PropTypes from 'prop-types';

function ArrayTextField(props) {
  const classes = ArrayFieldStyle();
  const {
    callback,
    fieldName,
    initialValues,
    multiline,
    placeholderName,
  } = props;
  const onFormSubmit = values => {
    const removeStrays = values.values.filter(str => /\S/.test(str));
    callback(removeStrays);
  };
  function setUpdatedValue(values) {
    onFormSubmit(values);
  }

  function handleDelete(values, index) {
    values.values.splice(index, 1);
    setUpdatedValue(values);
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => onFormSubmit}
        render={({ values }) => (
          <Form onBlur={() => setUpdatedValue(values)}>
            <FieldArray
              name="values"
              render={arrayHelpers => (
                <div>
                  {values.values.map((value, index) => (
                    <div key={index}>
                      <Grid container>
                        <Grid item xs={10}>
                          <Field
                            name={
                              fieldName === 'Copyright Holders'
                                ? `values.${index}.firstName`
                                : `values.${index}`
                            }
                            component={TextField}
                            fullWidth
                            multiline={multiline}
                            variant="outlined"
                            placeholder={placeholderName}
                            rows={10}
                            className={classes.textField}
                            disabled={false}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            onClick={() => handleDelete(values, index)}
                            className={classes.icon}
                          >
                            <Typography variant="caption" gutterBottom>
                              X
                            </Typography>
                          </IconButton>
                          <Typography
                            variant="caption"
                            className={classes.link}
                            onClick={() => handleDelete(values, index)}
                            gutterBottom
                          >
                            <button
                              type="button"
                              disabled={false}
                              className={classes.link}
                            >
                              Remove
                            </button>
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  <Typography
                    onClick={
                      fieldName === 'Copyright Holders'
                        ? () =>
                            arrayHelpers.push({
                              firstName: '',
                              lastName: '',
                              email: '',
                            })
                        : () => arrayHelpers.push('')
                    }
                  >
                    <button
                      disabled={false}
                      type="submit"
                      className={classes.link}
                    >
                      + Add {fieldName}
                    </button>
                  </Typography>
                </div>
              )}
            />
          </Form>
        )}
      />
    </div>
  );
}
ArrayTextField.propTypes = {
  callback: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
  multiline: PropTypes.bool,
  placeholderName: PropTypes.string.isRequired,
};
ArrayTextField.defaultProps = {
  multiline: undefined,
};

export default ArrayTextField;
