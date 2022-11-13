import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Button from 'components/shared/Button';
import { ExpansionPanelSummary } from 'components/Catalog/RoyaltyContract/ExpansionPanel';

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: '15px',
  },
  textField: {
    borderColor: theme.palette.grey.main,
  },
  formControl: {
    marginLeft: '20px',
  },
  buttonContainer: {
    marginTop: '30px',
    textAlign: 'center',
  },
  button: {
    borderWidth: '2px',
    color: theme.palette.black.main,
    '&:hover': {
      borderWidth: '2px',
    },
  },
  distributionOption: {
    marginLeft: '16px',
  },
  expansionColor: {
    background: '#fff2d8',
  },
  panelSummary: {
    fontSize: '17px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
  },
  alertMessage: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    marginLeft: '10px',
    color: theme.palette.primary.main,
    fontWeight: '550',
  },
}));

export default function Content(props) {
  const handleProps = props;
  const classes = useStyles();
  const [value, setValue] = useState('auto');
  const [label, setLabel] = useState('');
  const [submit, setSubmit] = useState(false);
  const [expands, setExpands] = useState(false);

  const handleChange = event => {
    event.persist();
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSubmit(true);
    setExpands(false);
    if (value === 'manual') {
      setLabel('I will manage the royalty distribution to rightsholders.');
    } else {
      setLabel(
        'I will let the system split and send royalties to rightsholders.',
      );
    }
    handleProps.handleInputs('distributionOption', value, 'distributionOption');
  };

  const handleExpansion = () => {
    if (expands) {
      setExpands(false);
    } else {
      setExpands(true);
    }
  };

  return (
    <Box fontSize={16} classes={{ root: classes.box }}>
      <ExpansionPanel
        className={submit ? classes.expansionColor : ''}
        expanded={expands}
      >
        <ExpansionPanelSummary
          expandIcon={<ArrowDropDownIcon />}
          onClick={handleExpansion}
        >
          <Grid container>
            <Grid item xs={12} className={classes.panelSummary}>
              2. Royalty Distribution Options
              <span className={classes.alertMessage}>
                {handleProps.optionValidation ? 'Required Section!' : ''}
              </span>
              <div className={classes.distributionOption}>
                {submit ? label : ''}
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  aria-label="book-upload-type"
                  name="book-upload-type"
                  className={classes.group}
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="manual"
                    control={<Radio color="primary" />}
                    label="I will manage the royalty distribution to rightsholders."
                  />
                  <FormHelperText classes={{ root: classes.formHelperText }}>
                    We will send all royalty payments to you.
                  </FormHelperText>
                  <FormControlLabel
                    value="auto"
                    control={<Radio color="primary" />}
                    label="I will let the system split and send royalties to rightsholders."
                  />
                  <FormHelperText classes={{ root: classes.formHelperText }}>
                    We will distribute royalty payments to rightsholders on your
                    behalf.
                  </FormHelperText>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.buttonContainer }}>
              <Button
                color="primary"
                onClick={handleSubmit}
                variant="outlined"
                classes={{ root: classes.button }}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
}
