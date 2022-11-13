import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UploadKYC from 'components/Account/UploadKYC';

const useStyles = makeStyles(() => ({
  header: {
    textAlign: 'center',
  },
}));

export default function OrganizationKyc({
  setFormTitle,
  progressToNextSection,
}) {
  const classes = useStyles();
  setFormTitle('');

  const handleSubmit = useCallback(() => {
    progressToNextSection();
  });

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <h2 className={classes.header}>Verification Of Organization Status</h2>

        <UploadKYC handleSubmit={handleSubmit} />
      </Container>
    </>
  );
}

OrganizationKyc.propTypes = {
  setFormTitle: PropTypes.func.isRequired,
  progressToNextSection: PropTypes.func.isRequired,
};
