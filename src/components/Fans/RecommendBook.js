import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from "@auth0/auth0-react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, MobileStepper, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RecommendBookDescription from 'components/Fans/RecommendBookDescription';
import RecommendBookReadYear from 'components/Fans/RecommendBookReadYear';
import RecommendBookShare from 'components/Fans/RecommendBookShare';
import { AppContext } from 'components/AppContext';
import { useApi } from 'api/';

const useStyles = makeStyles(theme => ({
  dialog: {
    width: '700px',
    height: ' 620px',
    padding: '40px 80px 10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      margin: 10,
      padding: 20,
      width: '100%',
      height: 'auto',
      textAlign: 'center',
    },
  },
  closeIconContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  previousStepIconContainer: {
    height: '100%',
    position: 'absolute',
    left: '10px',
    top: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  previousStepIcon: {
    border: `solid ${theme.palette.primary.main} 2px`,
  },
  titleContainer: {
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
      '& div': {
        justifyContent: 'center',
      },
    },
    '& > span': {
      fontSize: 22,
      fontWeight: 'bold',
    },
  },
  stepContainer: {
    height: '100%',
  },
  recommendationIcon: {
    marginRight: '10px',
  },
  stepper: {
    background: 'inherit',
  },
  dots: {
    margin: 'auto',
    '& div': {
      margin: '0 5px',
    },
  },
  hidden: {
    display: 'none',
  },
}));

export default function RecommendBook({ book, show, onCloseModal }) {
  const { fanshipUser } = React.useContext(AppContext);
  const [linkExists, setLinkExists] = useState(false);
  const [step, setStep] = useState(linkExists ? 2 : 0);
  const { user } = useAuth0();
  const { isBookRecommended } = useApi();

  const classes = useStyles();

  const checkForLink = async () => {
    if (user && fanshipUser && show && book && book.id) {
      const res = await isBookRecommended(book.id);
      if (res.isRecommended) {
        setStep(2);
        setLinkExists(res.isRecommended);
      }
    }
  };

  useEffect(() => {
    checkForLink();
  }, [book, show]);

  function handleNext() {
    setStep(s => s + 1);
  }

  function handlePrevious() {
    setStep(s => s - 1);
  }

  function handleCloseModal() {
    setStep(linkExists ? 2 : 0);
    onCloseModal();
  }

  const steps = [
    <RecommendBookDescription
      bookTitle={book.title || ''}
      onNext={handleNext}
    />,
    <RecommendBookReadYear book={book} onNext={handleNext} />,
    <RecommendBookShare book={book} />,
  ];

  return (
    <Dialog
      open={fanshipUser && fanshipUser.fan ? show : false}
      onClose={handleCloseModal}
      classes={{ paper: classes.dialog }}
    >
      <div className={classes.closeIconContainer}>
        <IconButton size="small" onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </div>
      <div
        className={clsx(
          classes.previousStepIconContainer,
          step === 0 && classes.hidden,
        )}
      >
        {!linkExists && (
          <IconButton
            size="small"
            className={classes.previousStepIcon}
            onClick={handlePrevious}
          >
            <ArrowLeftIcon />
          </IconButton>
        )}
      </div>
      <div className={classes.titleContainer}>
        <img
          key="img"
          alt="recommend"
          src="/img/recommend.svg"
          className={classes.recommendationIcon}
        />
        <span>{`Recommend "${book.title}"`}</span>
      </div>
      <div className={classes.stepContainer}>{steps[step]}</div>
      {!linkExists && (
        <MobileStepper
          classes={{
            root: classes.stepper,
            dots: classes.dots,
          }}
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={step}
        />
      )}
    </Dialog>
  );
}

RecommendBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
