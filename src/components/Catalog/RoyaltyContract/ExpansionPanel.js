import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';

// eslint-disable-next-line import/prefer-default-export
export const ExpansionPanelSummary = withStyles({
  root: {
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
