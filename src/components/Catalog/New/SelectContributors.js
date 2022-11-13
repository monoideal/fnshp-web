import React, { useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography, IconButton, Grid, MenuItem } from '@material-ui/core/';
import ArrayFieldStyle from 'components/Catalog/New/ArrayFieldsStyle';
import PropTypes from 'prop-types';

const contributorTypes = [
  {
    key: 0,
    label: 'Author',
    type: 'A01',
    code: 'AUTHOR',
  },
  {
    key: 1,
    label: 'Illustrator',
    type: 'A12',
    code: 'ILLUSTRATOR',
  },
  {
    key: 2,
    label: 'Translator',
    type: 'B06',
    code: 'TRANSLATOR',
  },
  {
    key: 3,
    label: 'Editor',
    type: 'B01',
    code: 'EDITOR',
  },
  {
    key: 4,
    label: 'Additional Contributor',
    type: 'Z01',
    code: 'ADDITIONAL_CONTRIBUTOR',
  },
];

const guessNames = src => {
  const data = {
    firstName: '',
    lastName: '',
    middleName: '',
  };

  if (!src) {
    return data;
  }

  const names = src.split(' ');
  if (names.length === 1) {
    data.firstName = names[0];
  } else if (names.length === 2) {
    data.firstName = names[0];
    data.lastName = names[1];
  } else if (names.length >= 3) {
    data.firstName = names[0];
    data.lastName = names[names.length - 1];
    data.middleName = src.replace(data.firstName, '').trim();
    data.middleName = data.middleName.replace(data.lastName, '').trim();
  }

  return data;
};

function SelectContributors(props) {
  const classes = ArrayFieldStyle();
  const { callback, initialValues } = props;
  const hydrateInitialValues = {
    values: initialValues.values.map(value => ({
      ...value,
      ...guessNames(value.displayName),
      type: contributorTypes.find(c => c.code === value.contributorType).type,
    })),
  };

  const onFormSubmit = values => {
    // Remove any without a contributor type
    const contributorsWithoutEmpties = values.values.filter(
      contributor => contributor.type,
    );
    callback(contributorsWithoutEmpties);
  };

  useEffect(() => {
    // AL needs this, but backend does not provide it
    onFormSubmit(hydrateInitialValues);
  }, []);

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
        initialValues={hydrateInitialValues}
        onSubmit={onFormSubmit}
        render={({ values }) => (
          <Form onBlur={() => setUpdatedValue(values)}>
            <FieldArray
              name="values"
              render={arrayHelpers => (
                <div>
                  {values.values.map((value, index) => (
                    <div key={index}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Field
                            name={`values.${index}.type`}
                            select
                            component={TextField}
                            label="Contributor"
                            variant="outlined"
                            fullWidth
                            className={classes.textField}
                            disabled={false}
                          >
                            {contributorTypes.map(option => (
                              <MenuItem key={option.type} value={option.type}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </Grid>
                        <Grid item xs={7}>
                          <Field
                            name={`values.${index}.firstName`}
                            component={TextField}
                            variant="outlined"
                            fullWidth
                            placeholder="First Name"
                            className={classes.textField}
                            disabled={false}
                          />
                          <Field
                            name={`values.${index}.middleName`}
                            component={TextField}
                            variant="outlined"
                            fullWidth
                            placeholder="Middle Name"
                            className={classes.textField}
                            disabled={false}
                          />
                          <Field
                            name={`values.${index}.lastName`}
                            component={TextField}
                            variant="outlined"
                            fullWidth
                            placeholder="Last Name"
                            className={classes.textField}
                            disabled={false}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            type="submit"
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
                            Remove
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  <Typography
                    onClick={() =>
                      arrayHelpers.push({
                        type: '',
                        firstName: '',
                        middleName: '',
                        lastName: '',
                      })
                    }
                  >
                    <button
                      disabled={false}
                      type="submit"
                      className={classes.link}
                    >
                      + Add Contributors
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
SelectContributors.propTypes = {
  callback: PropTypes.func.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SelectContributors;
