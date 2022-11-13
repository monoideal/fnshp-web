import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import AlignedItems from 'components/shared/AlignedItems';

const useStyles = makeStyles({
  root: {
    padding: '45px 30px 30px',
  },
});

export default function Pagination() {
  const { root } = useStyles();
  return (
    <Box fontSize={12}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
        classes={{ root }}
      >
        <Grid item xs={6} />
        <Grid item>
          <AlignedItems
            items={[
              'Rows per page',
              <ExpandMoreIcon key="expand-more-icon" fontSize="small" />,
            ]}
          />
        </Grid>
        <Grid item>1-10 of 100</Grid>
        <Grid item>
          <AlignedItems
            items={[
              <KeyboardArrowLeftIcon key="left" />,
              <KeyboardArrowRightIcon key="right " />,
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
