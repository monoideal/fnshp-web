import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useAuth0 } from "@auth0/auth0-react";

import Button from 'components/shared/Button';
import { AppContext } from 'components/AppContext';

export default function Header() {
  const { user } = useAuth0();
  const { fanshipUser } = React.useContext(AppContext);
  return (
    <Grid container justify="space-between">
      <Grid item>
        <h1>My Catalogue</h1>
      </Grid>
      {!fanshipUser.limitedAccess ? (
        <Grid item>
          <Link to="/catalog/new/monetize">
            <Button variant="contained" color="primary">
              Add New Book
            </Button>
          </Link>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
}
