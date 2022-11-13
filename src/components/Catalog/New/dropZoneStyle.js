import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    color: '##c04800',
    cursor: 'pointer',
    padding: '5px',
  },

  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },

  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
  },

  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },

  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },

  container: {
    height: '114px',
    display: 'in-line block',
    width: '300px',
    marginTop: '15px',
    marginBottom: '12px',
    border: 'dashed #dddddd',
    backgroundColor: 'transparent',
  },

  uploadContainer: {
    marginTop: theme.spacing(1),
  },

  url: {
    marginTop: theme.spacing(4),
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },

  extraurl: {
    flexDirection: 'column',
    marginTop: theme.spacing(1),
  },

  italic: {
    fontStyle: 'italic',
  },

  button: {
    marginTop: '10%',
  },

  iconRed: {
    color: '#d0021b',
  },

  text: {
    padding: '5px',
    fontWeight: 'normal',
  },

  boxText: {
    marginLeft: '5%',
  },
  textBox: {
    marginLeft: '30%',
    color: '#666666',
  },

  icon: {
    color: '#666666',
    marginLeft: '40%',
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
