import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Button from 'components/shared/Button';
import { ExpansionPanelSummary } from 'components/Catalog/RoyaltyContract/ExpansionPanel';

const useStyles = makeStyles(theme => ({
  textField: {
    borderColor: theme.palette.grey.main,
    marginTop: '10px',
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
  form: {
    width: '100%',
  },
  price: {
    marginLeft: '15px',
  },
  expansionColor: {
    background: '#fff2d8',
  },
  panelSummary: {
    fontSize: '17px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    lineHeight: '1',
  },
  alertMessage: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    marginLeft: '10px',
    color: theme.palette.primary.main,
    fontWeight: '550',
  },
}));

export default function RetailPrice(props) {
  const classes = useStyles();
  const handleProps = props;
  const { contractValues } = handleProps;
  const [submit, setSubmit] = useState(false);
  const [expands, setExpands] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (
      contractValues.errors.retailPrice === true ||
      contractValues.errors.retailPrice === ''
    ) {
      handleProps.handleInputs(
        'retailPrice',
        contractValues.values.retailPrice,
        'price',
      );
    } else {
      setSubmit(true);
      setExpands(false);
    }
  };

  const handleExpansion = () => {
    if (expands) {
      setExpands(false);
    } else {
      setExpands(true);
    }
  };

  return (
    <Box fontSize={16}>
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
              1. Retail Price
              <span className={classes.alertMessage}>
                {handleProps.priceValidation ? 'Required Section!' : ''}
              </span>
              <div className={classes.price}>
                {submit ? `$${contractValues.values.retailPrice} CAD` : ''}
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container>
              <Grid item xs={12}>
                Please note that Fanship will charge 40% of the retail price as
                a transaction fee.
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    contractValues.errors.retailPrice === ''
                      ? false
                      : contractValues.errors.retailPrice
                  }
                  helperText={contractValues.messages.retailPrice}
                  variant="outlined"
                  type="number"
                  value={contractValues.values.retailPrice}
                  onChange={value =>
                    handleProps.handleInputs(
                      'retailPrice',
                      value.target.value,
                      'price',
                    )
                  }
                  classes={{ root: classes.textField }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        classes={{ root: classes.inputAdornment }}
                      >
                        $
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} classes={{ root: classes.buttonContainer }}>
                <Button
                  type="submit"
                  color="primary"
                  classes={{ root: classes.button }}
                  variant="outlined"
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
}
