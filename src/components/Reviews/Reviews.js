import React from 'react';

import { Formik, Form, Field, FieldArray } from 'formik';

import { TextField } from 'formik-material-ui';
import { Typography, IconButton, Grid } from '@material-ui/core/';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    link: {
      border: 'none',
      padding: 0,
      background: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontFamily: 'Open Sans',
      fontSize: '12px',
      color: theme.palette.darkOrange.main,
    },

    asterisk: {
      paddingRight: '5px',
    },

    divider: {
      marginTop: '2%',
    },

    textField: {
      display: 'flex',
      padding: '5px',
    },
  }),
);

export default function Reviews(props) {
  const classes = useStyles();

  const { callback, initialValues, multiline } = props;
  const onFormSubmit = value => {
    const removeStrays = value.values.filter(str => {
      return /\S/.test(str);
    });

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
        onSubmit={onFormSubmit}
        render={({ values }) => (
          <Form onBlur={() => setUpdatedValue(values)}>
            <FieldArray
              name="values"
              render={arrayHelpers => (
                <div>
                  {values.values &&
                    values.values.map((value, index) => (
                      <div key={index}>
                        <Grid container>
                          <Grid item xs={10}>
                            <Field
                              name={`values.${index}.reviewText`}
                              component={TextField}
                              variant="outlined"
                              fullWidth
                              multiline={multiline}
                              rows={2}
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
                    onClick={() => arrayHelpers.push({ reviewText: '' })}
                  >
                    <button
                      disabled={false}
                      type="submit"
                      className={classes.link}
                    >
                      + Add Reviews
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

Reviews.propTypes = {
  callback: PropTypes.func.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
  multiline: PropTypes.bool,
};
