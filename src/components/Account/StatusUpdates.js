import React from 'react';
import { TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { WarningChip, SuccessChip } from 'components/shared/StyledChips';
import StyledTable from 'components/shared/StyledTable';
import { any } from 'bluebird';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    '& td': {
      borderBottom: '1px solid rgba(131, 126, 152, 0.2)',
      padding: '10px 20px',
      textAlign: 'left',
    },

    '& th': {
      textAlign: 'left',
    },
  },
  chipCompact: {
    margin: 0,
  },
}));

export default function StatusUpdates(props) {
  const classes = useStyles();
  const { userHistory, isVerified } = props;
  const filterHistory = [];
  if (!_.isEmpty(userHistory)) {
    for (let i = 0; i < userHistory.length; i += 1) {
      if (
        userHistory[i].type === 'update_profile' &&
        userHistory[i].changeRequest !== null
        // &&
        // (!_.isEmpty(_.get(userHistory[i].changeRequest, 'addressChange')) ||
        //   !_.isEmpty(_.get(userHistory[i].changeRequest, 'basicInfoChange')))
      ) {
        filterHistory.push(userHistory[i]);
      }
    }
  }

  const displayChangedData = data => {
    const result = [];
    Object.entries(data).forEach(([key, value]) => {
      if (!_.isEmpty(value)) {
        result.push(_.startCase(key));
      }
    });
    return result.join(' , ');
  };

  return (
    <StyledTable className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell>REQUEST</TableCell>
          <TableCell>DATE</TableCell>
          <TableCell>STATUS</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {!_.isEmpty(filterHistory) ? (
          filterHistory.map(history => (
            <TableRow>
              <TableCell>{displayChangedData(history.changeRequest)}</TableCell>
              <TableCell>
                {moment.unix(history.createdAt).format('LLL')}
              </TableCell>
              {isVerified === 'pending' && history.status === 'pending' ? (
                <TableCell>
                  <WarningChip
                    label={_.capitalize(isVerified)}
                    className={classes.chipCompact}
                  />
                </TableCell>
              ) : (
                <TableCell>
                  <SuccessChip
                    label={
                      isVerified === 'approved'
                        ? _.capitalize(isVerified)
                        : _.capitalize(history.status) || 'Approved'
                    }
                    className={classes.chipCompact}
                  />
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell>No Update</TableCell>
          </TableRow>
        )}
      </TableBody>
    </StyledTable>
  );
}

StatusUpdates.propTypes = {
  userHistory: PropTypes.arrayOf(any).isRequired,
  isVerified: PropTypes.string.isRequired,
};
