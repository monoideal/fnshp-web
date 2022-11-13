import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  ErrorChip,
  WarningChip,
  SuccessChip,
} from 'components/shared/StyledChips';

const useStyles = makeStyles(() => ({
  containerPageHeader: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px',
  },
  textHeader: {
    margin: 0,
  },
}));
export default function PageHeader({ label, status }) {
  const classes = useStyles();

  const showStatus = () => {
    switch (status) {
      case 'approved':
        return <SuccessChip label="Approved" />;
      case 'pending':
        return <WarningChip label="Pending" />;
      case 'denied':
      case 'rejected':
        return <ErrorChip label="Rejected" />;
      default:
        return <ErrorChip label="Document Required" />;
    }
  };

  return (
    <div className={classes.containerPageHeader}>
      <h1 className={classes.textHeader}>{label}</h1>
      {showStatus()}
    </div>
  );
}

PageHeader.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
