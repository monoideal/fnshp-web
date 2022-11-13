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
import PromoCodeTable from 'components/Admin/PromoCodes/Table';
import { toast } from 'react-toastify';

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

export default function Promocodes() {
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const api = useApi();

  const [promoCodes, setPromoCodes] = React.useState([]);
  const [promoCodesDuplicate, setPromoCodesDuplicate] = React.useState([]);

  React.useEffect(() => {
    async function initialize() {
      try {
        const res = await api.fetchPromoCodes();
        setPromoCodes(res);
        setPromoCodesDuplicate(res);
      } catch (err) {
        console.log(err);
      }
    }
    initialize();
  }, [api]);

  React.useEffect(() => {
    async function initialize() {
      setPromoCodesDuplicate(promoCodes);
    }
    initialize();
  }, [promoCodes]);

  //   const handleSearch = searchValue => {};
  const handleSearch = searchValue => {
    const searchResult = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < promoCodes.length; i++) {
      if (
        promoCodes[i].code
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      ) {
        searchResult.push(promoCodes[i]);
      } else if (searchValue.length < 1) {
        searchResult.push(promoCodes[i]);
      }
    }
    setPromoCodesDuplicate(searchResult);
    setSearch(searchValue);
  };

  const handleUpdate = async promoCode => {
    try {
      await api.updatePromoCode(promoCode);
      toast.success('Successfully updated profile');
    } catch (err) {
      console.log(err);
      toast.error('Failed to update promocode');
    } finally {
      const promoCodesUpdated = promoCodes.map(pc =>
        promoCode.id === pc.id ? promoCode : pc,
      );
      console.log(promoCodesUpdated);
      setPromoCodes(promoCodesUpdated);
    }
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
            <Typography className={classes.title}>Promo Codes</Typography>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/admin/promocodes/add"
              className={classes.addBtn}
            >
              Add Promo Code
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={0} className={classes.body}>
        <PromoCodeTable
          data={promoCodesDuplicate}
          search={search}
          handleSearch={value => handleSearch(value.target.value)}
          handleUpdate={handleUpdate}
        />
      </Grid>
    </Container>
  );
}
