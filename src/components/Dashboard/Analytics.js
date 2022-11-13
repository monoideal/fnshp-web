import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Paper,
  Tabs as MuiTabs,
  Tab as MuiTab,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import TotalSales from 'components/Dashboard/TotalSales';
import Conversions from 'components/Dashboard/Conversions';
import { useApi } from 'api/';

const TOTAL_SALES = 'totalSales';
const CONVERSIONS = 'conversions';

const Tab = withStyles(theme => ({
  root: {
    fontSize: 14,
  },
  selected: {
    color: theme.palette.darkPurple.main,
    fontWeight: 'bold',
  },
}))(MuiTab);

const Tabs = withStyles(theme => ({
  indicator: {
    background: theme.palette.darkPurple.main,
  },
}))(MuiTabs);

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
  selected: {
    color: theme.palette.darkPurple.main,
  },
  searchBar: {
    margin: theme.spacing(2, 1),
  },
  loader: {
    color: theme.palette.darkPurple.main,
  },
}));

function SearchBar({ onSubmit, ...rest }) {
  const api = useApi();
  const [options, setOptions] = React.useState([]);
  let timer;
  const doSearch = async value => {
    setOptions(await api.fetchCreatorDashboardBooksByTitle(value));
  };
  useEffect(() => {
    doSearch('');
  }, []);
  const onInputChange = (e, value) => {
    clearTimeout(timer);
    // Debounce to call API less when searching
    timer = setTimeout(() => {
      doSearch(value);
    }, 500);
  };
  return (
    <Autocomplete
      id="analytics-search-books"
      clearOnEscape
      options={options}
      onInputChange={onInputChange}
      getOptionLabel={option => option.title}
      onChange={onSubmit}
      noOptionsText="Type to start search"
      renderInput={params => (
        <TextField
          {...params}
          label="Search your book"
          variant="outlined"
          margin="dense"
          fullWidth
        />
      )}
      {...rest}
    />
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default function Analytics() {
  const classes = useStyles();
  const api = useApi();

  const [selectedTab, setSelectedTab] = useState(TOTAL_SALES);
  const [selectedBook, setSelectedBook] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [treeData, setTreeData] = useState({});

  function handleSelectTab(event, value) {
    setSelectedTab(value);
  }

  function handleSelectBook(event, value) {
    setSelectedBook(value);
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        if (selectedBook) {
          setTotalSales(
            await api.fetchCreatorDashboardAnalytics(selectedBook.id),
          );
          setTreeData(await api.fetchTreeViewForCreator(selectedBook.id));
        } else {
          setTotalSales(await api.fetchCreatorDashboardAnalytics());
        }
      } catch (err) {
        console.log('ERR', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedBook]);

  return (
    <Paper className={clsx(classes.container, classes.paper)}>
      <Tabs value={selectedTab} onChange={handleSelectTab}>
        <Tab label="Total Sales" value={TOTAL_SALES} />
        <Tab label="Conversions" value={CONVERSIONS} />
      </Tabs>
      <SearchBar className={classes.searchBar} onSubmit={handleSelectBook} />
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress size={80} className={classes.loader} />
        </div>
      ) : (
        <>
          <TotalSales
            selected={selectedTab === TOTAL_SALES}
            book={selectedBook}
            data={totalSales}
          />
          <Conversions
            selected={selectedTab === CONVERSIONS}
            book={selectedBook}
            treeData={treeData}
          />
        </>
      )}
    </Paper>
  );
}
