import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  box: {
    padding: '9%',
    textAlign: 'center',
    fontSize: '17px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
  },
  mainTxt: {
    fontSize: '36px',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '28px',
    },
  },
  middleSection: {
    marginBottom: '15px',
  },
  viewDetails: {
    lineHeight: '1',
    color: '#c04800',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  arrowUp: {
    verticalAlign: 'sub',
    color: theme.palette.orange.main,
    marginRight: '2%',
  },
  arrowDown: {
    verticalAlign: 'sub',
    color: theme.palette.red.main,
    marginRight: '2%',
  },
  help: {
    verticalAlign: 'middle',
    color: theme.palette.grey[500],
    marginLeft: '2%',
    fontSize: 'medium',
  },
}));

export default function SummaryCard({
  label,
  current,
  previous,
  formatter,
  link,
  tooltip,
}) {
  const classes = useStyles();

  const comparing = current - previous;
  const percentage = previous ? (comparing / previous) * 100 : 100;
  const formatted = formatter(current || 0);

  return (
    <Grid item xs={12} md>
      <Paper className={classes.box}>
        <Grid item xs={12} className={classes.mainTxt}>
          {formatted}
        </Grid>
        <Grid item xs className={classes.total}>
          {label}
          {tooltip && (
            <Tooltip title={tooltip} placement="right">
              <HelpIcon className={classes.help} />
            </Tooltip>
          )}
        </Grid>
        {previous && (
          <Grid item xs className={classes.middleSection}>
            {percentage > 0 ? (
              <ArrowUpwardIcon fontSize="small" className={classes.arrowUp} />
            ) : (
              <ArrowDownwardIcon
                fontSize="small"
                className={classes.arrowDown}
              />
            )}
            {parseFloat(Math.round(percentage * 100) / 100).toFixed(0)}
            %
            <HelpIcon className={classes.help} />
          </Grid>
        )}
        {link && (
          <Grid item xs className={classes.viewDetails}>
            <Link to={link} style={{ cursor: 'pointer' }}>
              View Details
            </Link>
          </Grid>
        )}
      </Paper>
    </Grid>
  );
}

SummaryCard.propTypes = {
  label: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  previous: PropTypes.number.isRequired,
  formatter: PropTypes.func,
  link: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
};

SummaryCard.defaultProps = {
  formatter: v => v,
  tooltip: null,
};
