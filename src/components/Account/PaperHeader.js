import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  label: {
    // This stuff is what creates that grey line in Organization Information ------------
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '10px',
  },

  line: {
    // background: '#fff',
    borderBottom: '1px solid #e0e0e3',
    margin: '5px 0px 5px 15px',
    minWidth: '20%',
    flexGrow: 1,
  },
});

export default function PaperHeader({ label, styleOverrides, style }) {
  const classes = useStyles();

  return (
    <div style={style} className={clsx(classes.label, styleOverrides.label)}>
      {label}
      <div className={clsx(classes.line, styleOverrides.line)} />
    </div>
  );
}

PaperHeader.propTypes = {
  label: PropTypes.string.isRequired,
  styleOverrides: PropTypes.shape({
    label: PropTypes.string,
    line: PropTypes.string,
  }),
  style: PropTypes.shape({}),
};

PaperHeader.defaultProps = {
  styleOverrides: {},
  style: undefined,
};
