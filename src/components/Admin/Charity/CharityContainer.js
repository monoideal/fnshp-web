import React from 'react';
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useApi } from 'api/';
import CharityTable from 'components/Admin/Charity/CharityTable';
import ActionAlert from 'components/Admin/Charity/ActionAlert';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    padding: '2% 1% 1px 2%',
  },
  topItem: {
    marginBottom: '4%',
  },
  title: {
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontSize: '22px',
    fontWeight: 'bold',
  },
  addBtn: {
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '2%',
    boxShadow: 'none',
  },
  body: {
    width: '100%',
    background: theme.palette.white.main,
    padding: '2.5%',
  },
  search: {
    width: '100%',
  },
  input: {
    height: 40,
  },
  table: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
  },
  tabs: {
    background: theme.palette.grey.main,
    fontWeight: 'bold',
  },
  indicator: {
    background: theme.palette.black.main,
  },
}));

export default function CharityContainer() {
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const [actionAlert, openActionAlert] = React.useState(false);
  const [selectedCharity, setSelectedCharity] = React.useState({});
  const api = useApi();

  const [charities, setCharities] = React.useState([]);
  const [resetCharities, setResetCharities] = React.useState([]);

  React.useEffect(() => {
    async function initialize() {
      try {
        const res = await api.fetchCharities();
        setCharities(res);
        setResetCharities(res);
      } catch (err) {
        console.log(err);
      }
    }
    initialize();
  }, [api]);

  const handleSearch = searchValue => {
    const searchResult = [];
    for (let i = 0; i < resetCharities.length; i++) {
      if (
        resetCharities[i].name
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      ) {
        searchResult.push(resetCharities[i]);
      } else if (searchValue.length < 1) {
        searchResult.push(resetCharities[i]);
      }
    }
    setCharities(searchResult);
    setSearch(searchValue);
  };

  const handleMenuClick = menuClickObj => {
    setSelectedCharity(menuClickObj);
    return openActionAlert(true);
  };

  const handleUpdateUsersTable = (newStatus, charityData) => {
    for (let i = 0; i < charities.length; i++) {
      if (charities[i].id === charityData.id) {
        charities[i].isSuspended = newStatus;
      }
    }
    openActionAlert(false);
  };
  return (
    <Container maxWidth="md">
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.topItem}
          >
            <Typography className={classes.title}>Charity</Typography>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/admin/addCharity"
              className={classes.addBtn}
            >
              Add Charity
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={0} className={classes.body}>
        <CharityTable
          openAlert={object => handleMenuClick(object)}
          charitiesData={charities}
          search={search}
          handleSearch={value => handleSearch(value.target.value)}
        />

        <ActionAlert
          open={actionAlert}
          close={() => openActionAlert(false)}
          selectedCharity={selectedCharity}
          updateUsersTable={handleUpdateUsersTable}
        />
      </Grid>
    </Container>
  );
}
