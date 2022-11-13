import React from 'react';
import PropTypes from 'prop-types';

export default function FourGrid({ className }) {
  return (
    <svg className={className} width="19px" height="19px" viewBox="0 0 19 19">
      <rect width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect x="5" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect x="10" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect x="15" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect y="5" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect x="5" y="5" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect x="10" y="5" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect x="15" y="5" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect y="15" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect x="5" y="15" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect
        x="10"
        y="15"
        width="4"
        height="4"
        stroke="none"
        strokeWidth="1px"
      />
      <rect
        x="15"
        y="15"
        width="4"
        height="4"
        stroke="none"
        strokeWidth="1px"
      />
      <rect y="10" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect x="5" y="10" width="4" height="4" stroke="none" strokeWidth="1px" />
      <rect
        x="10"
        y="10"
        width="4"
        height="4"
        stroke="none"
        strokeWidth="1px"
      />
      <rect
        x="15"
        y="10"
        width="4"
        height="4"
        stroke="none"
        strokeWidth="1px"
      />
    </svg>
  );
}

FourGrid.propTypes = {
  className: PropTypes.string,
};

FourGrid.defaultProps = {
  className: '',
};
