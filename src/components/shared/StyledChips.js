import { withStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const StyledChip = withStyles({
  root: {
    color: '#fff',
    margin: '10px 20px',
    fontWeight: 'bold',
    padding: '0px 15px',
    minWidth: '120px',
    height: '25px',
  },
  label: {
    userSelect: 'auto',
  },
})(Chip);

export default StyledChip;

export const ErrorChip = withStyles({
  root: {
    background: '#d0021b',
  },
})(StyledChip);

export const WarningChip = withStyles({
  root: {
    background: '#f5a623',
  },
})(StyledChip);

export const SuccessChip = withStyles({
  root: {
    background: '#7ed321',
  },
})(StyledChip);

export const ActiveChip = withStyles({
  root: {
    background: '#00865a',
  },
})(StyledChip);

export const UnconfirmedChip = withStyles({
  root: {
    border: `solid 2px #837e98`,
    color: 'black',
    backgroundColor: 'white',
  },
})(StyledChip);
