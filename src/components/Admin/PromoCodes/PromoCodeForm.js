import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { set } from 'lodash';
import moment from 'moment';
import TextField from 'components/shared/TextField';
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Button,
} from '@material-ui/core';
import { useApi } from 'api/';
import { toast } from 'react-toastify';
import history from 'lib/history';

const useStyles = makeStyles(() => ({
  textfield: { width: '100%' },
}));

const reducer = (promoState, action) => {
  switch (action.type) {
    case 'form_edit': {
      const { path, value } = action.payload;
      const toUpdate = { ...promoState };
      set(toUpdate, ...path, value);
      return toUpdate;
    }
    case 'form_save': {
      return action.payload;
    }
    case 'fetch_promoCode': {
      return {
        ...action.payload,
        startDate: moment
          .unix(action.payload.startDate)
          .utc()
          .format('DD/MM/YYYY'),
        endDate:
          action.payload.endDate &&
          moment
            .unix(action.payload.endDate)
            .utc()
            .format('DD/MM/YYYY'),
      };
    }
    default:
      throw new Error('invalid action for dispatch');
  }
};

const PromoCodeForm = ({ id }) => {
  const api = useApi();
  const [promoCode, dispatch] = React.useReducer(reducer, {
    startDate: moment().format('DD/MM/YYYY'),
    usageLimit: 999999,
  });
  const [errors, setErrors] = useState({
    code: false,
    amount: false,
    startDate: false,
  });
  const isDisabled = promoCode.usage > 0;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        dispatch({
          type: 'fetch_promoCode',
          payload: await api.fetchPromoCode(id),
        });
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!promoCode.code || !promoCode.amount || !promoCode.startDate) {
      setErrors({
        ...errors,
        code: !promoCode.firstName,
        amount: !promoCode.lastName,
        startDate: !promoCode.bio,
      });
      return;
    }
    try {
      await api.createNewPromoCode({
        ...promoCode,
        startDate: moment.utc(promoCode.startDate, 'DD/MM/YYYY').unix(),
        endDate: moment.utc(promoCode.endDate, 'DD/MM/YYYY').unix(),
        type: 1,
        userType: 1,
        valueType: 1,
      });
      toast.success('Successfully added promo code');
    } catch (err) {
      console.log(err);
      toast.error('Failed to created promo code');
    } finally {
      history.push('/admin/promocodes');
    }
  };

  const handleUpdate = async () => {
    try {
      await api.updatePromoCode({
        ...promoCode,
        startDate: moment.utc(promoCode.startDate, 'DD/MM/YYYY').unix(),
        endDate: moment.utc(promoCode.endDate, 'DD/MM/YYYY').unix(),
      });
      toast.success('Successfully updated profile');
    } catch (err) {
      console.log(err);
      toast.error('Failed to update promocode');
    } finally {
      history.push('/admin/promocodes');
    }
  };

  const handleChange = key => evt => {
    const { value } = evt.target;
    switch (key) {
      case 'firstName':
      case 'lastName':
      case 'bio':
        setErrors({ ...errors, [key]: !value });
        break;
      case 'startDate':
      case 'endDate':
        setErrors({
          ...errors,
          [key]: value && !moment(value, 'DD/MM/YYYY', true).isValid(),
        });
        break;
      default:
        break;
    }
    dispatch({
      type: 'form_edit',
      payload: { path: [key], value },
    });
  };

  const classes = useStyles();
  return (
    <>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5">Reward Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={promoCode.code}
                  onChange={handleChange('code')}
                  className={classes.textfield}
                  helperText="Short, memorable, and unique"
                  label="Code"
                  error={errors.code}
                  disabled={isDisabled}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel style={{ marginTop: '3px' }}>Reward Type</FormLabel>
                <RadioGroup
                  aria-label="Reward Type"
                  name="Reward Type"
                  value="1"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Points"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={promoCode.amount}
                  onChange={handleChange('amount')}
                  label="Points Rewarded"
                  type="number"
                  className={classes.textfield}
                  error={errors.amount}
                  disabled={isDisabled}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Restrictions</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  value={promoCode.startDate}
                  onChange={handleChange('startDate')}
                  helperText="DD/MM/YYYY"
                  className={classes.textfield}
                  label="Start Date"
                  error={errors.startDate}
                  disabled={isDisabled}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={promoCode.endDate}
                  onChange={handleChange('endDate')}
                  className={classes.textfield}
                  helperText="DD/MM/YYYY"
                  error={errors.endDate}
                  label="End Date"
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel style={{ marginTop: '3px' }}>
                  Only Redeemable By
                </FormLabel>
                <RadioGroup aria-label="" name="Only Redeemable By" value="1">
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Fans"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={promoCode.usageLimit}
                  onChange={handleChange('usageLimit')}
                  className={classes.textfield}
                  label="Usage Limit"
                  disabled={isDisabled}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Button variant="contained" onClick={id ? handleUpdate : handleAdd}>
        {id ? 'Save Promo Code' : 'Create Promo Code'}
      </Button>
    </>
  );
};
export default PromoCodeForm;

PromoCodeForm.propTypes = {
  id: PropTypes.string,
};

PromoCodeForm.defaultProps = {
  id: null,
};
