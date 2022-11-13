import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, InputAdornment } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  box: {
    padding: '5%',
    fontSize: '17px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
  },
  mainTxt: {
    fontWeight: 'bold',
  },
  middleSection: {
    marginTop: '0px',
    marginBottom: '15px',
  },
  btns: {
    marginTop: '40px',
  },
  search: {
    marginTop: 30,
    width: '100%',
    height: '40px',
  },
  fanBtn: {
    marginRight: '10px',
    boxShadow: 'none',
  },
  rightholderBtn: {
    boxShadow: 'none',
  },
  input: {
    height: 40,
  },
}));

export default function UserManagement() {
  const classes = useStyles();
  const [search, setSearch] = React.useState('');

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <Grid item xs={12} md>
      <Paper className={classes.box}>
        <Grid item xs={12} sm className={classes.mainTxt}>
          User Management
        </Grid>
        <Grid item xs className={classes.middleSection}>
          <TextField
            value={search}
            onChange={handleSearch}
            variant="outlined"
            color="primary"
            className={classes.search}
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              className: classes.input,
            }}
          />
        </Grid>
        <Grid item xs className={classes.btns}>
          <Button
            color="primary"
            variant="contained"
            className={classes.fanBtn}
            component={Link}
            to="/admin/createAccount"
          >
            <b>+ ADD FAN</b>
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.rightholderBtn}
            component={Link}
            to="/admin/addRightHolders"
          >
            <b>+ ADD RIGHTHOLDERS</b>
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}
