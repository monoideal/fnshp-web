import React from 'react';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';
import PromoCodeForm from 'components/Admin/PromoCodes/PromoCodeForm';
import BreadcrumbLink from 'components/shared/BreadcrumbLink';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  textfield: { width: '100%' },
}));

const Add = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <BreadcrumbLink text="Promocodes" to="/admin/promocodes" />
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="h1">Add Promo Code</Typography>
          </Grid>
        </Grid>
      </Grid>
      <PromoCodeForm />
    </Container>
  );
};
export default Add;
