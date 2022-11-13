import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Dialog, Typography, Grid } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { useApi } from 'api/';
import SelectPoints from 'components/Fans/Donation/SelectPoints';
import PointsConfirmation from 'components/Fans/Donation/PointsConfirmation';
import Success from 'components/Fans/Donation/Success';
import { rewardsPointsToCAD } from 'util/helpers';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
  root: {
    padding: '6%',
    fontFamily: "'Rubik','sans-serif'",
  },
  sucessRoot: {
    padding: '6%',
    fontFamily: "'Rubik','sans-serif'",
    background: '#cee7f5',
    maxWidth: '650px',
  },
  title: {
    fontSize: '20px',
    color: theme.palette.black.main,
    fontWeight: '700',
  },
  closeIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    cursor: 'pointer',
  },
  successClose: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
  },
  text: {
    fontSize: '16px',
    color: theme.palette.black.main,
    marginBottom: '4%',
    minWidth: '400px',
  },
  charityName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '15px',
    marginBottom: '15px',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  btns: {
    fontSize: '14px',
    marginTop: '30px',
  },
  continueBtn: {
    marginRight: '20px',
    background: theme.palette.white.main,
    borderColor: theme.palette.primary.main,
    color: theme.palette.black.main,
    border: '1px solid',
    boxShadow: 'none',
    padding: '10px 30px ',
    fontWeight: 'bold',
    '&:hover': {
      background: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  inactiveBtn: {
    background: theme.palette.primary.main,
    padding: '10px 30px ',
    color: theme.palette.black.main,
    boxShadow: 'none',
    fontWeight: 'bold',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  input: {
    height: 40,
  },
  select: {
    width: 170,
  },
  help: {
    verticalAlign: 'middle',
    color: theme.palette.grey[500],
    marginLeft: '2%',
    width: '24px',
    height: '24px',
    marginTop: '23px',
  },
  inputLabel: {
    height: 40,
    top: '-7px',
  },
  bottomNavigation: {
    margin: '8px',
    cursor: 'pointer',
  },
  sliderPoints: {
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '14px',
    color: '#999999',
  },
  errorMessage: {
    color: theme.palette.red.main,
  },
  hidden: {
    display: 'none',
  },
  hoverArrow: {
    width: '100%',
    height: '100%',
  },
  imageBoxes: {
    width: '100px',
    height: '50px',
  },
}));

export default function DonateAlert({ open, close, selectedCharity, fan, updateUser }) {
  const classes = useStyles();
  const [points, setPoints] = React.useState(0);
  const [donationValue, setDonationValue] = React.useState('0');
  const [steps, setSteps] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [isAllowToCharity, setIsAllowToCharity] = React.useState(true);
  const [displayMessage, setdisplayMessage] = React.useState('');
  const api = useApi();

  React.useEffect(() => {
    if (fan.points === 0) {
      setIsAllowToCharity(false);
      setdisplayMessage('You do not have enough points to donate.');
    }
  }, []);

  const handleClose = () => {
    setSteps(0);
    close(false);
  };

  const handleContinue = async () => {
    if (fan.points <= 0) {
      setIsAllowToCharity(false);
      setdisplayMessage('You do not have enough points to donate.');
    }
    const stepsToUpdate = steps + 1;
    setSteps(stepsToUpdate);
    if (steps === 0) {
      return setSteps(stepsToUpdate);
    }

    if (donationValue > 0) {
      if (isAllowToCharity) {
        const cadDonateValue = parseInt(points, 10);
        await api
          .donateUserCharity(selectedCharity.userId, cadDonateValue)
          .then(success => {
            setdisplayMessage('Success');
            console.log(success);
            updateUser();
          })
          .catch(error => {
            setdisplayMessage('Failed');
            updateUser();
            console.log(error);
          });
        setSteps(stepsToUpdate);
      }
    } else {
      setErrorMessage(true);
      setdisplayMessage('Please select the donation value.');
    }
  };

  const handleEdit = () => {
    const stepsToUpdate = steps - 1;
    setSteps(stepsToUpdate);
  };

  const handlePoints = (event, pointsValue) => {
    setPoints(pointsValue);
    setDonationValue(rewardsPointsToCAD(pointsValue));
    if (pointsValue > 0) {
      setErrorMessage(false);
    }
  };

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
        <DialogContent
          dividers
          className={steps !== 2 ? classes.root : classes.sucessRoot}
        >
          {isAllowToCharity ?
            (
              <>
                {steps !== 2 && (
                  <>
                    <Typography gutterBottom className={classes.title}>
                      Donate to Charity
                    </Typography>
                    <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                    <Typography gutterBottom className={classes.text}>
                      Donate to:
                    </Typography>
                    <div className={classes.imageBoxes}>
                      <img
                        className={classes.hoverArrow}
                        src={selectedCharity.logoUrl}
                        alt="Right Arrow"
                      />
                    </div>
                    <Typography gutterBottom className={classes.charityName}>
                      {selectedCharity.name}
                    </Typography>
                    <Typography
                      className={
                        errorMessage === false ? classes.hidden : classes.errorMessage
                      }
                    >
                      Donation amount cannot be 0
                    </Typography>
                    <hr />
                  </>
                )}
                {steps === 0 && (
                  <SelectPoints
                    handlePoints={handlePoints}
                    fanPoints={fan.points}
                    selectedPoints={points}
                    donationValue={donationValue}
                  />
                )}
                {steps === 1 && (
                  <PointsConfirmation
                    selectedPoints={points}
                    donationValue={donationValue}
                    handleEdit={handleEdit}
                  />
                )}
                {steps === 2 && (
                  <>
                    <Grid item xs={12} className={classes.successClose}>
                      <CloseIcon onClick={handleClose} />
                    </Grid>
                    <Grid>  
                      {isAllowToCharity && !errorMessage ? (
                        <Success
                          close={handleClose}
                          displayMessage={displayMessage}
                        />
                      ) : (
                        <>
                        <Grid item xs={12} className={classes.successClose}>
                          <CloseIcon onClick={handleClose} />
                        </Grid>
                          {displayMessage}
                        </>
                      )}
                    </Grid>
                  </>
                )}

                {steps !== 2 && (
                  <>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      className={classes.btns}
                    >
                      <Button
                        className={classes.continueBtn}
                        variant="contained"
                        onClick={handleContinue}
                      >
                        {steps === 0 ? 'CONTINUE' : 'CONFIRM'}
                      </Button>
                    </Grid>
                  </>
                )}

                {steps === 0 && (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.btns}
                  >
                    <img
                      className={classes.bottomNavigation}
                      src="/img/recommendations/oval.png"
                      alt="navigation one"
                    />
                    <img
                      className={classes.bottomNavigation}
                      src="/img/recommendations/oval-copy.png"
                      alt="navigation icon"
                    />
                  </Grid>
                )}
                {steps === 1 && (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.btns}
                  >
                    <img
                      className={classes.bottomNavigation}
                      src="/img/recommendations/oval-copy.png"
                      alt="navigation icon"
                    />
                    <img
                      className={classes.bottomNavigation}
                      src="/img/recommendations/oval.png"
                      alt="navigation one"
                    />
                  </Grid>
                )}
            </>
          ) : <>
            <Grid item xs={12} className={classes.successClose}>
              <CloseIcon onClick={handleClose} />
            </Grid>
              {displayMessage}
          </> }
          </DialogContent>
      </Dialog>
    </div>
  );
}

DonateAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  selectedCharity: PropTypes.objectOf(PropTypes.any),
  fan: PropTypes.shape({
    points: PropTypes.number,
    totalDonated: PropTypes.number,
  }).isRequired,
};

DonateAlert.defaultProps = {
  selectedCharity: null,
};
