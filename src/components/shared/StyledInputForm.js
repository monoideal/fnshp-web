import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  containerForm: {
    maxWidth: '800px',
    margin: '10px 0px 20px 0px',
  },
}));

export function RowBreak() {
  return (
    <Grid
      item
      sm={12}
      style={{
        padding: '0px',
      }}
    />
  );
}

export default function StyledInputForm({ children, formId, handleSubmit }) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      justify="flex-start"
      alignContent="space-between"
      className={classes.containerForm}
      component="form"
      id={formId}
      onSubmit={evt => {
        evt.preventDefault();
        handleSubmit(formId);
      }}
    >
      {children}
    </Grid>
  );
}

StyledInputForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  formId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
