import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Popover, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';

const ETHEREUM_BLOCKCHAIN_EXPLORER_PREFIX = 'https://rinkeby.etherscan.io/tx/'; // put slash as the end

const useStyles = makeStyles(theme => ({
  container: {
    width: '450px',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: '#000',
    opacity: 0.8,
    color: theme.palette.primary.light,
  },
  text: {
    wordWrap: 'break-word',
  },
  popupLink: {
    color: '#5f9ea0',
  },
}));

export default function BlockchainPopover(props) {
  const classes = useStyles();
  const { handlePopoverClose, anchorEl, transactionHash } = props;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Popover
        id={id}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Typography className={classes.text} variant="body2">
              Transaction Hash:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {!isEmpty(transactionHash) ? (
              <Link
                href={`${ETHEREUM_BLOCKCHAIN_EXPLORER_PREFIX}${transactionHash}`}
                target="_blank"
                rel="noopener"
                variant="caption"
                className={classes.popupLink}
              >
                {transactionHash}
              </Link>
            ) : (
              <Typography className={classes.popupLink} variant="caption">
                No Transaction Hash Found
              </Typography>
            )}
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}

BlockchainPopover.propTypes = {
  anchorEl: PropTypes.node.isRequired,
  handlePopoverClose: PropTypes.func.isRequired,
  transactionHash: PropTypes.string.isRequired,
};
