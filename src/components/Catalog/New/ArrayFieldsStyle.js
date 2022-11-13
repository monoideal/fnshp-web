import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  removeButton: {
    marginTop: '2%',
    cursor: 'pointer',
  },

  textField: {
    marginBottom: '10px',
    paddingRight: '10px',
  },

  link: {
    border: 'none',
    padding: 0,
    background: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontFamily: 'Open Sans',
    fontSize: '12px',
    color: theme.palette.darkOrange.main,
  },

  icon: {
    fontSize: '16px',
    color: '#d0021b',
    marginRight: '6px',
    marginLeft: '6px',
  },
}));

export default useStyles;
