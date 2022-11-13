import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  ButtonGroup,
  Box,
  TextField,
  Dialog,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from 'components/shared/Button';
import ButtonLink from 'components/shared/ButtonLink';
import CreatorProfileCard from 'components/shared/CreatorProfileCard';
import AlignedItems from 'components/shared/AlignedItems';
import { useCart } from 'components/Fans/Cart';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  applaud: {
    marginTop: '10px',
  },
  selected: {
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  padded: {
    marginBottom: '20px',
  },
  dialog: {
    width: '420px',
    height: '350px',
    padding: '30px',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      padding: '40px 20px 20px',
    },
  },
  closeIconContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  header: {
    marginBottom: '10px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      fontSize: '20px',
    },
  },
  applaudText: {
    margin: '0',
  },
  applaudMargin: {
    margin: '10px 10px 10px 0px',
    color: theme.palette.darkOrange.main,
    fontFamily: theme.fontFamily,
  },
}));

function NoTip({ author, onClick }) {
  const classes = useStyles();
  return (
    <Grid
      container
      key={author}
      className={classes.applaud}
      justify="space-between"
      alignItems="center"
    >
      <Grid item>{author.displayName}</Grid>
      <Grid>
        <ButtonLink onClick={onClick}>Applaud the author</ButtonLink>
      </Grid>
    </Grid>
  );
}

NoTip.propTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

function EditTip({
  author,
  initialTip,
  onSubmit,
  isPopup,
  callBackCancel,
  callBackConfirm,
}) {
  const [tip, setTip] = useState(initialTip);

  const classes = useStyles();

  function handleTextChange(event) {
    setTip(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(tip);
  }

  function handleCancel() {
    callBackCancel(false);
  }
  function handleConfirm() {
    onSubmit(tip);
    callBackConfirm(false);
  }

  return (
    <>
      <Box className={classes.padded}>{author.displayName}</Box>
      <form onSubmit={handleSubmit}>
        <div className={classes.padded}>
          <ButtonGroup>
            <Button
              className={tip === 2 && classes.selected}
              onClick={() => setTip(2)}
            >
              $2
            </Button>
            <Button
              className={tip === 5 && classes.selected}
              onClick={() => setTip(5)}
            >
              $5
            </Button>
            <Button
              className={tip === 10 && classes.selected}
              onClick={() => setTip(10)}
            >
              $10
            </Button>
            <Button
              className={tip === 0 && classes.selected}
              onClick={() => setTip(0)}
            >
              NO THANKS
            </Button>
          </ButtonGroup>
        </div>
        <div className={classes.padded}>
          <AlignedItems
            spacing={2}
            items={[
              <Box key="box" component="span">
                OR
              </Box>,
              <TextField
                margin="dense"
                variant="outlined"
                key="text"
                type="number"
                placeholder="Enter amount"
                value={tip}
                onChange={handleTextChange}
              />,
            ]}
          />
        </div>
        {isPopup ? (
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        ) : (
          <div>
            <Button variant="contained" color="primary" type="submit">
              SAVE
            </Button>
          </div>
        )}
      </form>
    </>
  );
}

EditTip.propTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
  }).isRequired,
  initialTip: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  isPopup: PropTypes.bool.isRequired,
  callBackCancel: PropTypes.func.isRequired,
  callBackConfirm: PropTypes.func.isRequired,
};

EditTip.defaultProps = {
  initialTip: 2,
};

function ShowTip({ author, tip, onClick }) {
  const classes = useStyles();
  return (
    <Grid
      container
      key={author.userId}
      className={classes.applaud}
      justify="space-between"
      alignItems="center"
    >
      <Grid item>{author.displayName}</Grid>
      <Grid>
        <Box component="span">Applause: </Box>
        <Box component="span" fontWeight="fontWeightBold">
          {` $${tip[author.profileId] || 0}`}
          <ButtonLink onClick={onClick}>Edit</ButtonLink>
        </Box>
      </Grid>
    </Grid>
  );
}

ShowTip.propTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
    userId: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  tip: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const applaudTextType = type => {
  switch (type) {
    case 'AUTHOR':
      return 'author';
    case 'ILLUSTRATOR':
      return 'illustrator';
    default:
      return 'author';
  }
};

function ShowPopupTip({ author, initialTip, onSubmit }) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  function handleEditClick() {
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }
  function setCancel(cancel) {
    setShowModal(cancel);
  }
  function setConfirm(confirm) {
    setShowModal(confirm);
    setIsConfirm(true);
  }

  return (
    <>
      <Grid item xs={12} md={6} className={classes.applaudText}>
        <CreatorProfileCard
          profile={author}
          forFans
          action={
            initialTip ? (
              <Box component="span" fontWeight="fontWeightBold">
                {` $${initialTip || 0}`}
                <ButtonLink onClick={handleEditClick}>Edit</ButtonLink>
              </Box>
            ) : (
              <ButtonLink
                onClick={handleEditClick}
                className={classes.applaudMargin}
              >
                Applaud the {applaudTextType(author.contributorType)}!
              </ButtonLink>
            )
          }
        />
      </Grid>

      <Dialog open={showModal} classes={{ paper: classes.dialog }}>
        <div className={classes.closeIconContainer}>
          <IconButton size="small" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          fontWeight="fontWeightBold"
          fontSize="22px"
          className={classes.header}
        >
          Applaud the author
        </Box>
        <p>
          Your one-time contribution is an impactful gesture that supports
          writers to keep creating the books you love to read and recommend. The
          amount you enter will be paid direct to the author.
        </p>
        <EditTip
          author={author}
          initialTip={initialTip}
          onSubmit={onSubmit}
          callBackCancel={setCancel}
          callBackConfirm={setConfirm}
          isPopup
        />
      </Dialog>
    </>
  );
}

ShowPopupTip.propTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    contributorType: PropTypes.string,
  }).isRequired,
  initialTip: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function Applaud({
  author,
  profileId,
  initialTip,
  bookId,
  isPopup,
}) {
  const [tip, setTip] = useState(initialTip);
  const [showEdit, setShowEdit] = useState(false);

  const { updateTip } = useCart();

  function handleSubmit(newTip) {
    updateTip(bookId, profileId, newTip);
    // setShowEdit(false);
    setTip(newTip);
  }

  if (showEdit && !isPopup)
    return <EditTip author={author} initialTip={tip} onSubmit={handleSubmit} />;

  if (tip && !isPopup)
    return (
      <ShowTip author={author} tip={tip} onClick={() => setShowEdit(true)} />
    );

  if (isPopup)
    return (
      <ShowPopupTip author={author} initialTip={tip} onSubmit={handleSubmit} />
    );

  return <NoTip author={author} onClick={() => setShowEdit(true)} />;
}

Applaud.propTypes = {
  author: PropTypes.shape({
    displayName: PropTypes.string,
  }).isRequired,
  initialTip: PropTypes.number,
  profileId: PropTypes.number.isRequired,
  bookId: PropTypes.number.isRequired,
  isPopup: PropTypes.bool.isRequired,
};

Applaud.defaultProps = {
  initialTip: undefined,
};
