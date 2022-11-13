import React from 'react';
import PropTypes from 'prop-types';

export default function TwoGrid({ className }) {
  return (
    <svg
      className={className}
      width="19px"
      height="19px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 19"
    >
      <path
        d="M7,2v5H2V2H7 M9,0H0v9h9V0L9,0z"
        stroke="none"
        strokeWidth="1px"
      />
      <path
        d="M17,2v5h-5V2H17 M19,0h-9v9h9V0L19,0z"
        stroke="none"
        strokeWidth="1px"
      />
      <path
        d="M7,12v5H2v-5H7 M9,10H0v9h9V10L9,10z"
        stroke="none"
        strokeWidth="1px"
      />
      <path
        d="M17,12v5h-5v-5H17 M19,10h-9v9h9V10L19,10z"
        stroke="none"
        strokeWidth="1px"
      />
    </svg>
  );
}

TwoGrid.propTypes = {
  className: PropTypes.string,
};

TwoGrid.defaultProps = {
  className: '',
};
