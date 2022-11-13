import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

export const ExpansionPanel = withStyles({
  root: {
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      marginTop: 0,
    },
  },
  expanded: {},
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    overflow: 'hidden',
    '&$expanded': {
      minHeight: '40px',
    },
  },
  content: {
    margin: '5px 0',
    '&$expanded': {
      margin: '5px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: 0,
    backgroundColor: theme.palette.lightGrey.main,
  },
}))(MuiExpansionPanelDetails);
