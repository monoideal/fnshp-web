import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    justify: 'space-evenly',
    flexDirection: 'column',
  },

  button: {
    marginLeft: '35%',
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },

  asterisk: {
    color: '#d0021b',
  },
  icon: {
    marginTop: '4px',
    marginLeft: '2px',
  },
  chip: {
    margin: theme.spacing(1),
  },

  fieldAlign: {
    padding: '20px 0px 20px 0px',
    marginLeft: '4px',
  },

  addLinks: {
    paddingLeft: '8px',
    paddingBottom: '5px',
  },

  Caption: {
    paddingLeft: '8px',
    fontStyle: 'italic',
  },

  divider: {
    marginTop: '1.5%',
  },

  textField: {
    display: 'flex',
    padding: '5px',
  },

  headerFields: {
    marginTop: '5%',
  },

  field: {
    padding: 5,
    width: '100%',
  },
  chipStyle: {
    backgroundColor: '#d3e5ec',
    width: 'auto',
    height: '34px',
    margin: '6px',
  },
  search: {
    position: 'absolute',
    marginTop: '14px',
    marginLeft: '0px',
    marginRight: '3px',
    color: '#999999',
    fontSize: '16px',
  },
}));

export default useStyles;
