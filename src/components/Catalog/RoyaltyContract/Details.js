import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CalendarIcon from '@material-ui/icons/CalendarToday';

import { useApi } from 'api/';
import ButtonLink from 'components/shared/ButtonLink';
import StyledTextField from 'components/shared/StyledTextField';
import RightsholderRow from 'components/Catalog/RoyaltyContract/RightsholderRow';
import { ExpansionPanelSummary } from 'components/Catalog/RoyaltyContract/ExpansionPanel';

const useStyles = makeStyles(theme => ({
  panel: {
    marginTop: '15px',
  },
  adornment: {
    color: theme.palette.darkGrey.main,
  },
  textField: {
    marginRight: '15px',
  },
  label: {
    color: theme.palette.darkGrey.main,
  },
  description: {
    marginTop: '30px',
  },
  subDescription: {
    marginTop: '12px',
  },
  onSaleDate: {
    marginTop: '30px',
    marginBottom: '1%',
  },
  alertMessage: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    marginLeft: '5px',
    color: theme.palette.primary.main,
    fontWeight: '520',
  },
}));

export default function Content(props) {
  const classes = useStyles();
  const api = useApi();

  const handleProps = props;
  const {
    updateParentHolders,
    handleInputs,
    contractValues,
    bookId,
    royaltyHolders,
    setRoyaltyHolders
  } = handleProps;
  const [percentage, setPercentage] = useState();
  const [creatorList, setCreatorList] = useState([]);

  const handleRightHolders = (index, data) => {
    const updateValue = royaltyHolders;
    let percentageToCompare = 0;
    updateValue[index] = data;
    setRoyaltyHolders(updateValue);
    updateParentHolders(updateValue);
    Object.keys(updateValue).forEach(key => {
      Object.keys(updateValue[key]).forEach(holder => {
        if (holder === 'percentage') {
          percentageToCompare += parseInt(updateValue[key][holder], 10);
        }
      });
    });
    if (percentageToCompare > 100) {
      setPercentage('*Royalty Percentage cannot exced 100%');
    } else {
      setPercentage('');
    }
  };

  const [rightsholders, setRightsholders] = useState(2);

  const addRightsholder = () => {
    setRightsholders(prev => prev + 1);
  };

  const removeRightsholder = () => {
    const index = rightsholders;
    const updateValue = royaltyHolders;
    delete updateValue[index.toString()];
    setRoyaltyHolders(updateValue);
    updateParentHolders(updateValue);
    setRightsholders(prev => prev - 1);
  };

  useEffect(() => {
    const init = async () => {
      try {
        // const creators = await api.fetchCreatorsForSearch();
        const creators = await api.fetchRightholdersForSearch(bookId);
        setCreatorList(creators);
      } catch (err) {
        console.log(err, err.response);
      }
    };
    init();
  }, [api, setCreatorList]);

  return (
    <Box fontSize={16} classes={{ root: classes.panel }}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ArrowDropDownIcon />}>
          3. Royalty Details
          <span className={classes.alertMessage}>
            {handleProps.royaltyValidation ? 'Required Section!' : ''}
          </span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <StyledTextField
                label="Effective date"
                isRequired
                InputProps={{
                  endAdornment: <CalendarIcon className={classes.adornment} />,
                }}
                classes={{ root: classes.textField }}
                className={classes.label}
                value={contractValues.values.effectiveDate}
                error={
                  contractValues.errors.effectiveDate === ''
                    ? false
                    : contractValues.errors.effectiveDate
                }
                helperText={contractValues.messages.effectiveDate}
                onChange={value =>
                  handleInputs(
                    'effectiveDate',
                    value.target.value,
                    'effectiveDate',
                  )
                }
                type="date"
                shrink
              />
              <StyledTextField
                label="Expiry date"
                isRequired
                InputProps={{
                  endAdornment: <CalendarIcon className={classes.adornment} />,
                }}
                classes={{ root: classes.textField }}
                value={contractValues.values.expiryDate}
                error={
                  contractValues.errors.expiryDate === ''
                    ? false
                    : contractValues.errors.expiryDate
                }
                helperText={contractValues.messages.expiryDate}
                onChange={value =>
                  handleInputs('expiryDate', value.target.value, 'expiryDate')
                }
                type="date"
                shrink
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                component="div"
                fontSize={14}
                classes={{ root: classes.description }}
              >
                Rightsholder(s)
              </Box>
              <Box
                component="div"
                fontStyle="italic"
                fontSize={14}
                classes={{ root: classes.subDescription }}
              >
                A confirmation email will be sent to the provided email
                addresses.
                <span
                  className={
                    handleProps.royaltyValidation ? classes.alertMessage : ''
                  }
                >
                  {' '}
                  All percentages must add up to 100%.
                </span>
                <span className={classes.alertMessage}>{percentage}</span>
              </Box>
            </Grid>

            <Grid item xs={12}>
              {_.times(rightsholders, i => (
                <RightsholderRow
                  key={i}
                  index={i}
                  checkPercentage={percentage}
                  handleRightHolders={handleRightHolders}
                  readOnly={false}
                  royaltyHolder={royaltyHolders[i]}
                  creatorList={creatorList}
                />
              ))}
            </Grid>

            <Grid item xs={12}>
              <ButtonLink onClick={addRightsholder}>
                + Add rightsholder
              </ButtonLink>
              {rightsholders > 2 ? (
                <ButtonLink onClick={removeRightsholder}>
                  - Remove rightsholder
                </ButtonLink>
              ) : (
                ''
              )}
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                label="Book On-Sale Date"
                InputProps={{
                  endAdornment: <CalendarIcon className={classes.adornment} />,
                }}
                classes={{ root: clsx(classes.textField, classes.onSaleDate) }}
                className={classes.label}
                value={contractValues.values.onSaleDate}
                error={
                  contractValues.errors.onSaleDate === ''
                    ? false
                    : contractValues.errors.onSaleDate
                }
                helperText={contractValues.messages.onSaleDate}
                onChange={value =>
                  handleInputs('onSaleDate', value.target.value, 'onSaleDate')
                }
                type="date"
                shrink
              />
              <Box
                component="div"
                fontStyle="italic"
                fontSize={14}
                classes={{ root: classes.subDescription }}
              >
              </Box>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
}
