import React, { useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import StyledTextField from 'components/shared/StyledTextField';
import RightsholderRow from 'components/Catalog/RoyaltyContract/RightsholderRow';
import { ExpansionPanelSummary } from 'components/Catalog/RoyaltyContract/ExpansionPanel';
import { useApi } from 'api/';

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
    marginBottom: '60px',
  },
  alertMessage: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    marginLeft: '10px',
    color: theme.palette.primary.main,
    fontWeight: '550',
  },
}));

export default function DetailsManual(props) {
  const classes = useStyles();
  const handleProps = props;
  const api = useApi();
  const { handleInputs, contractValues, mainHolder } = handleProps;
  const [creatorList, setCreatorList] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        // const creators = await api.fetchCreatorsForSearch();
        const creators = await api.fetchRightholdersForSearch(props.bookId);
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
                Rightsholder
              </Box>
            </Grid>

            <Grid item xs={12}>
              <RightsholderRow
                key={0}
                index={0}
                handleInputs={handleProps}
                mainHolder={mainHolder}
                readOnly
                creatorList={creatorList}
              />
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
                  handleInputs('onSaleDate', value.target.value, 'expiryDate')
                }
                type="date"
                shrink
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
}
