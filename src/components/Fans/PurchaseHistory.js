import React, { useState, useEffect } from 'react';
import { useApi } from 'api/';
import Orders from 'components/Fans/Orders';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box, Grid } from '@material-ui/core';
import PurchaseViewHistory from 'components/Fans/PurchaseViewHistory';

export default function PurchaseHistory() {
  const api = useApi();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [header, setHeader] = useState('Purchase History');

  function setHeaderMessage(message) {
    setHeader(message);
  }

  useEffect(() => {
    async function initialize() {
      try {
        setPurchaseHistory(await api.fetchOrders());
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, [api]);

  return (
    <>
      <Grid container justify="space-between">
        <Grid item>
          <Box
            component="div"
            fontWeight="fontWeightBold"
            fontSize="22px"
            color="#241f63"
            marginBottom="24px"
          >
            {header}
          </Box>
        </Grid>
      </Grid>
      {purchaseHistory.length !== 0 ? (
        <>
          <PurchaseViewHistory
            orderHistory={purchaseHistory}
            callbackHeader={setHeaderMessage}
            isLoading={isLoading}
          />
        </>
      ) : (
        'Purchase history is not present'
      )}
    </>
  );
}
