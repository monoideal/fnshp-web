import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';
import {
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  DialogTitle,
  Box,
} from '@material-ui/core';

const options = ['User Activity', 'Content'];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    '& > span': {
      marginTop: 10,
    },
  },
  buttons: {
    justifyContent: 'center',
  },
  button: {
    color: theme.palette.black.main,
    borderWidth: '2px',
    fontWeight: 'bold',
    '&:hover': {
      background: 'inherit',
      borderWidth: '2px',
    },
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
  dialog: {
    width: '340px',
    height: ' 265px',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  reportTitle: {
    paddingBottom: 10,
    '& h2': {
      fontSize: 22,
      fontWeight: 'bold',
    },
  },
  reportButton: {
    color: '#c04800',
    textDecoration: 'underline',
    textTransform: 'capitalize',
    fontSize: '1rem',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  },
  reportRadioButton: {
    color: '#c04800',
    '&.Mui-checked': {
      color: '#c04800',
    },
  },
  closeIconContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
}));

function ReportDialog(props) {
  const { onClose, value: valueProp, open, ...other } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const [isDisable, setIsDisable] = React.useState(true);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = event => {
    setValue(event.target.value);
    setIsDisable(false);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="report-dialog"
      open={open}
      classes={{ paper: classes.dialog }}
      {...other}
    >
      <div className={classes.closeIconContainer}>
        <IconButton size="small" onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogTitle id="report-dialog" className={classes.reportTitle}>
        Report
      </DialogTitle>
      <DialogContent>
        <Box fontWeight="bold" marginBottom={1}>
          What did you find inappropriate?
        </Box>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="report-type"
          name="report-type"
          value={value}
          onChange={handleChange}
        >
          {options.map(option => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio classes={{ root: classes.reportRadioButton }} />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions className={classes.buttons}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleOk}
          disabled={isDisable}
        >
          {value === 'Content' ? (
            <a href="mailto:info@fanship.fan?subject=Report Content">
              CONTINUE
            </a>
          ) : (
            <a href="mailto:info@fanship.fan?subject=Report User Activity">
              CONTINUE
            </a>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ReportDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function Report() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('User');
  const classes = useStyles();

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = newValue => {
    setOpen(false);
    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      <Button
        onClick={handleClickListItem}
        role="listitem"
        fullWidth
        className={classes.reportButton}
      >
        Report
      </Button>
      <ReportDialog
        id="report-option"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </>
  );
}
