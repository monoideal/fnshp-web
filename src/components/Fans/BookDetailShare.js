import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Box, Snackbar, IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import PropTypes from 'prop-types';
import qs from 'qs';
import url from 'url';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

const useStyles = makeStyles(theme => ({
  dialogModelWidth: {
    width: 640,
  },
  fontBold: {
    fontWeight: 'bolder',
    color: '#000',
  },
  buttonLink: {
    wordBreak: 'break-word',
    background: 'none !important',
    border: 'none',
    padding: '0 !important',
    textTransform: 'initial',
    color: '#c04800',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 'bolder',
    '&:hover': {},
  },
  classOr: {
    fontWeight: 'bolder',
    fontSize: 14,
    color: 'black',
  },
  buttonIcon: {
    marginLeft: 8,
    cursor: 'pointer',
  },
  hiddenTextBox: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  copyToClipboardContainer: {
    margin: '14px',
    textAlign: 'center',
  },
  copyIcon: {
    color: theme.palette.black.main,
  },
  clipboardIcon: {
    display: 'block',
    margin: '0 auto',
  },
  shareButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: '30px',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

const shareButtons = [
  ['facebook', FacebookShareButton, FacebookIcon],
  ['twitter', TwitterShareButton, TwitterIcon],
];

function generateLink(bookId) {
  const parsedQs = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  const parsedUrl = url.parse(
    `${window.location.protocol}//${window.location.host}/books/${bookId}`,
  );

  parsedUrl.search = qs.stringify(parsedQs);

  return url.format(parsedUrl);
}

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  shareText: {
    fontWeight: '800 !important',
    fontSize: 22,
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.shareText}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function BookDetailShare(props) {
  const { open, handleClose, book } = props;
  const classes = useStyles();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  }
  const link = generateLink(book.id);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title-share" onClose={handleClose}>
          Share
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className={classes.fontBold}
            align="center"
            id="alert-dialog-description-share"
          >
            Here is the link, feel free to pass it around
          </DialogContentText>

          <div className={classes.copyToClipboardContainer}>
            <CopyToClipboard
              className={classes.buttonLink}
              text={link}
              onCopy={() => setIsSnackbarOpen(true)}
            >
              <span>
                <span className={classes.shareLink}>{link}</span>
                <IconButton className={classes.clipboardIcon}>
                  <CopyIcon className={classes.copyIcon} />
                </IconButton>
              </span>
            </CopyToClipboard>
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message="Copied to clipboard"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            />
          </div>

          <DialogContentText className={classes.classOr} align="center">
            or
          </DialogContentText>

          <Box
            alignItems="center"
            alignContent="center"
            className={classes.shareButtons}
          >
            {shareButtons.map(([key, Button, Icon]) => (
              <Button key={key} url={link}>
                <Icon round size={32} />
              </Button>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

BookDetailShare.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  book: PropTypes.objectOf(PropTypes.any).isRequired,
};
