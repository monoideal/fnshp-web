import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

const FancyTable = ({ options, components, ...props }) => {
  return (
    <MaterialTable
      options={{
        emptyRowsWhenPaging: false,
        exportFileName: `fanship_${moment().format('YYYY-MM-DD')}`,
        padding: 'dense',
        draggable: false,
        exportAllData: true,
        ...options,
      }}
      components={{
        // Container: React.Fragment,
        ...components,
      }}
      {...props}
    />
  );
};

FancyTable.propTypes = {
  options: PropTypes.shape({}),
  components: PropTypes.shape({}),
};

FancyTable.defaultProps = {
  options: {},
  components: {},
};

export default FancyTable;
