import React, { useState, useEffect } from 'react';
import { Box, InputAdornment, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useApi } from 'api/';
import TextField from 'components/shared/TextField';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const useStyles = makeStyles(theme => ({
  container: props => ({
    background: theme.palette[props.color].light,
    padding: theme.spacing(2),
  }),
  textField: {
    width: '100%',
    '& .MuiInputBase-root': {
      borderWidth: 2,
    },
  },
  button: {
    padding: '2px 0 0 0',
    textTransform: 'none',
    color: '#6B996C',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  normal: {
    textDecoration: 'underline',
  },
  verified: {
    fontWeight: 'bold',
  },
  error: {
    fontWeight: 'bold',
    color: 'red',
  },
}));

const PromoCodeAdd = ({ value, handleChange }) => {
  const classes = useStyles({ color: 'promoGreen' });
  const [verifyText, setVerifyText] = useState({
    label: 'Verify code',
    status: 'normal',
  });

  const api = useApi();
  const theme = useTheme();

  useEffect(() => {
    const resetVerifyText = async () => {
      if (verifyText.label !== 'Verify code')
        setVerifyText({ label: 'Verify code', status: 'normal' });
    };
    resetVerifyText();
  }, [value]);

  const handleVerify = async () => {
    setVerifyText({ label: 'Verifying...', status: 'normal' });
    try {
      const response = await api.applyPromoCode(value);
      setVerifyText({
        label: `Verified for ${response.amount} points!`,
        status: 'verified',
      });
    } catch (error) {
      const response = error?.response?.data?.error?.message;
      switch (response) {
        case 'Promo code does not exist.':
        case 'Promo code reached usage limit.':
          setVerifyText({
            label: `"${value}" is not a valid code`,
            status: 'error',
          });
          break;
        case 'Promo code has already been used.':
          setVerifyText({
            label: `"${value}" has already been redeemed`,
            status: 'error',
          });
          break;
        // Hacky, we need to make this not return positive for error
        case 'Promo code does not apply to user type.':
          setVerifyText({
            label: `Verified!`,
            status: 'verified',
          });
          break;

        default:
          // Should never be reached
          setVerifyText({
            label: `"${value}" could not be validated`,
            status: 'error',
          });
          break;
      }
    }
  };

  return (
    <Box className={classes.container}>
      <TextField
        label="Promo Code"
        value={value}
        className={classes.textField}
        onChange={handleChange}
        color="promoGreen"
        endAdornment={
          <InputAdornment position="end" style={{ marginRight: 12 }}>
            <LocalOfferIcon
              style={{
                color: theme.palette.promoGreen.main,
                fontSize: '2rem',
              }}
            />
          </InputAdornment>
        }
      />
      <Button className={classes.button} onClick={handleVerify}>
        <span className={classes[verifyText.status]}>{verifyText.label}</span>
      </Button>
    </Box>
  );
};

export default PromoCodeAdd;
