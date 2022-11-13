import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { ExpandMore } from '@material-ui/icons';
import { Grid } from '@material-ui/core/';
import Button from 'components/shared/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import ButtonLink from 'components/shared/ButtonLink';
import PropTypes from 'prop-types';
import { isEmpty, first } from 'lodash';
import clsx from 'clsx';
import history from 'lib/history';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import config from 'config';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  rootContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  panel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  panelcolor: {
    backgroundColor: '#fff2d8',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    color: theme.palette.black.main,
    marginBottom: '30px',
    borderWidth: '2px',
    '&:hover': {
      borderWidth: '2px',
    },
  },
  formControl: {
    margin: theme.spacing(3),
  },
  headerPadding: {
    paddingBottom: '5px',
    paddingLeft: '6px',
  },
  section: {
    fontWeight: 'normal',
    fontFamily: 'Arial',
  },
  image: {
    width: '100px',
    height: 128,
  },
  img: {
    height: '134px',
    width: '140px',
    objectFit: 'contain',
  },
  titleBold: {
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  desc: {
    paddingInlineStart: '20px',
  },
  headerPaddingImg: {
    paddingBottom: '5px',
    paddingLeft: '6px',
  },
  gridDisply: {
    flexBasis: '0%',
  },
  errorMargin: {
    marginBottom: '10px',
  },
  optionMargin: {
    marginTop: '10px',
  },
  errorMsg: {
    color: 'red',
  },
  duplicateMessage: {
    fontSize: '14px',
  },
  sameUser: {
    color: '#000',
  },
  differentUser: {
    color: 'red',
  },
  readMore: {
    cursor: 'pointer',
    fontSize: '12px',
    paddingLeft: '8px',
    color: '#003a99',
  },
  content: {
    marginBottom: '6px',
  },
  wrapText: {
    wordWrap: 'break-word',
  },
  link: {
    fontSize: '14px',
    color: '#003a99',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  marginBottom: {
    marginBottom: '16px',
  },
}));

function AccordionBookUploadCheck(props) {
  const { text, duplicateData, handleSkipCheck } = props;
  const classes = useStyles();
  const displayData = first(duplicateData.data);
  const {
    coverUrl,
    publisher,
    description,
    title,
    assetKey,
    claimId,
  } = displayData;
  const duplicate =
    duplicateData.message === 'Exists for same user'
      ? Object.assign(
          {},
          {
            messageComponent: (
              <Typography
                gutterBottom
                className={clsx(classes.duplicateMessage, classes.sameUser)}
              >
                It seems <strong>{title || assetKey}</strong> already exists
              </Typography>
            ),
            forSameUser: true,
          },
        )
      : Object.assign(
          {},
          {
            messageComponent: (
              <Typography
                gutterBottom
                className={clsx(
                  classes.duplicateMessage,
                  classes.differentUser,
                )}
              >
                It seems <strong>{title || assetKey}</strong> already exists in
                other user’s claim list. We can not proceed further.
              </Typography>
            ),
            forSameUser: false,
          },
        );
  const [readMore, setReadMore] = useState(false);

  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState({
    Yes: 'Yes!',
    No: 'No, this is not the same book',
  });
  const [isDisable, setDisable] = useState(true);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  function handleRadioChange(event) {
    setValue(event.target.value);
    setDisable(false);
  }

  const goToClaimDetails = async id => {
    const url = `${config.AL_FRONTEND_URL}/landing/book/${id}`;
    window.open(url, '_blank');
  };

  function handleReadMore() {
    setReadMore(rm => !rm);
  }

  function goBackToCatalog() {
    history.replace('/catalog');
  }

  // For Info Alert

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOK = () => {
    goBackToCatalog();
    setOpen(false);
  };

  // For handling continue click in case of duplicate claim for same user
  function clickContinue() {
    if (value === 'Yes') {
      setOpen(true);
      handleSkipCheck(false);
    } else {
      // skip check
      handleSkipCheck(true);
    }
  }

  return (
    <div className={classes.root}>
      <>
        <InfoAlert
          open={open}
          title="Confirm"
          message={
            <p>
              This work cannot be submitted. Please contact{' '}
              <a
                href="mailto:info@fanship.fan?subject=Fanship"
                className={classes.link}
              >
                info@fanship.fan
              </a>
            </p>
          }
          handleClose={handleClose}
          handleOK={handleOK}
        />
        <ExpansionPanel
          className={classes.panel}
          expanded={!isEmpty(duplicateData) ? true : expanded}
          onChange={handleChange(true)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            aria-controls="panelbh-content"
            id="panelbh-header"
          >
            <Typography>{text}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12} className={classes.marginBottom}>
                {duplicate.messageComponent}
                {!duplicate.forSameUser ? (
                  <Typography variant="body1" display="inline" gutterBottom>
                    <a
                      href="info@fanship.fan?subject=Fanship"
                      className={classes.link}
                    >
                      Contact us for any queries.
                    </a>
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <Grid container className={classes.bookDetailsBox}>
                  <Grid item xs={2}>
                    <div>
                      {' '}
                      <img
                        className={classes.img}
                        alt={title}
                        src={coverUrl}
                      />{' '}
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container>
                      <Grid item xs={1} className={classes.gridDisply}>
                        <Typography
                          color="textPrimary"
                          className={classes.titleBold}
                        >
                          Title:
                        </Typography>
                      </Grid>
                      <Grid item xs={11}>
                        <Typography className={classes.headerPadding}>
                          <ButtonLink
                            onClick={() => goToClaimDetails(claimId)}
                            underline="always"
                            className={classes.link}
                          >
                            {' '}
                            {title || assetKey}
                          </ButtonLink>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} className={classes.content}>
                        <Typography
                          color="textPrimary"
                          className={classes.titleBold}
                          display="inline"
                        >
                          Publisher:
                        </Typography>
                        <Typography
                          className={classes.headerPadding}
                          display="inline"
                        >
                          {publisher || ''}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        className={clsx(classes.content, classes.wrapText)}
                      >
                        <Typography
                          color="textPrimary"
                          className={classes.titleBold}
                          display="inline"
                        >
                          Description:
                        </Typography>
                        <Typography
                          className={classes.headerPadding}
                          display="inline"
                        >
                          {readMore ? (
                            <>
                              {description}{' '}
                              <ButtonLink
                                className={classes.readMore}
                                onClick={() => handleReadMore()}
                              >
                                Read Less
                              </ButtonLink>
                            </>
                          ) : (
                            <>
                              {description && description.split('', 150)}
                              <ButtonLink
                                className={classes.readMore}
                                onClick={() => handleReadMore()}
                              >
                                Read More
                              </ButtonLink>
                            </>
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {duplicate.forSameUser ? (
                  <>
                    <Typography
                      color="textPrimary"
                      className={classes.optionMargin}
                    >
                      Is this the same book that you would like to upload?
                    </Typography>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <RadioGroup
                        aria-label="E-book-upload"
                        name="E-book-upload"
                        className={classes.group}
                        value={value}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio color="primary" />}
                          label="Yes!"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio color="primary" />}
                          label="No, this is not the same book"
                        />
                      </RadioGroup>
                    </FormControl>
                  </>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <Grid item xs={12} classes={{ root: classes.buttonContainer }}>
            {duplicate.forSameUser ? (
              <Button
                onClick={clickContinue}
                color="primary"
                variant="outlined"
                classes={{ root: classes.button }}
                disabled={isDisable}
              >
                Continue
              </Button>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                classes={{ root: classes.button }}
                onClick={goBackToCatalog}
              >
                Go back to catalogue
              </Button>
            )}
          </Grid>
        </ExpansionPanel>
      </>
    </div>
  );
}
AccordionBookUploadCheck.propTypes = {
  text: PropTypes.string.isRequired,
  handleSkipCheck: PropTypes.func.isRequired,
  duplicateData: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        coverUrl: PropTypes.string,
        publisher: PropTypes.string,
        description: PropTypes.string,
        title: PropTypes.string,
        assetKey: PropTypes.string,
        claimId: PropTypes.string,
      }),
    ),
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccordionBookUploadCheck;

const infoAlertCss = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  dialogContent: {
    fontSize: '14px',
  },
  header: {
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.black.main,
    marginBottom: '8px',
    marginRight: '8px',
    borderWidth: '2px',
    '&:hover': {
      borderWidth: '2px',
    },
  },
}));
function InfoAlert(props) {
  const { title, open, message, handleClose, handleOK } = props;
  const classes = infoAlertCss();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.header}>
          {title}
        </DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleOK}
            color="primary"
            variant="outlined"
            classes={{ root: classes.button }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

InfoAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOK: PropTypes.func.isRequired,
};
