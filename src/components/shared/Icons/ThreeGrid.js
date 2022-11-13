import React from 'react';
import PropTypes from 'prop-types';

export default function ThreeGrid({ className }) {
  return (
    <svg className={className} width="19px" height="19px" viewBox="0 0 19 19">
      <rect width="5" height="5" stroke="none" strokeWidth="1px" />
      <rect x="7" width="5" height="5" stroke="none" strokeWidth="1px" />
      <rect x="14" width="5" height="5" stroke="none" strokeWidth="1px" />
      <rect y="7" width="5" height="5" stroke="none" strokeWidth="1px" />
      <rect x="7" y="7" width="5" height="5" stroke="none" strokeWidth="1px" />
      <rect x="14" y="7" width="5" height="5" stroke="none" strokeWidth="1px" />
      <rect y="14" width="5" height="5" stroke="none" strokeWidth="1px" />
      <rect x="7" y="14" width="5" height="5" stroke="none" strokeWidth="1px" />
      <rect
        x="14"
        y="14"
        width="5"
        height="5"
        stroke="none"
        strokeWidth="1px"
      />
    </svg>
  );
}

ThreeGrid.propTypes = {
  className: PropTypes.string,
};

ThreeGrid.defaultProps = {
  className: '',
};
