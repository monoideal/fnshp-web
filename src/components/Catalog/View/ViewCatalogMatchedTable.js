import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  TableSortLabel,
  Paper,
  Grid,
  TableFooter,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getResizedImage } from 'util/helpers';
import { useApi } from 'api/';
import SearchBar from 'components/Catalog/View/SearchBar';
import MoreDetails from 'components/Catalog/View/MoreDetails';
import moment from 'moment';
import history from 'lib/history';
import { get, isNil } from 'lodash';
import InlineLoader from 'components/shared/InlineLoader';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  paperInfo: {
    width: '100%',
    margin: '20px 12px',
    padding: theme.spacing(3, 2),
    '& h2': {
      marginTop: 0,
    },
  },
  hidden: {
    display: 'none',
    visibility: 'hidden',
  },
  img: {
    width: '45px',
    paddingBottom: '2px',
    paddingTop: '2px',
    paddingLeft: '5px',
    marginRight: '2%',
  },
  icon: {
    marginTop: '4px',
    objectFit: 'scale-down',
    marginRight: '25px',
  },
  table: {
    minWidth: 750,
    '& th': {
      fontFamily: "'Rubik','sans-serif'",
      color: '#202f35',
      fontSize: '12px',
      fontWeight: 'bold',
      paddingLeft: '15px',
    },
    '& td': {
      fontFamily: "'Rubik','sans-serif'",
      color: '#202f35',
      fontSize: '14px',
    },
  },
  tableHead: {
    background: '#f9f9f9',
  },
  tableRowHover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  unlockButton: {
    padding: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  green: {
    color: `#7ed321`,
  },
  red: {
    color: `#e02020`,
  },
}));

export default function ViewCatalogMatchedTable() {
  const api = useApi();
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedBook, setState] = React.useState({});
  const [bookDetails, setBookDetails] = useState({});
  const [search, setSearch] = useState({
    search: '',
    select: 'none',
  });
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState('title');
  const [order, setOrder] = React.useState('asc');

  const getBooks = async pageNum => {
    const res = await api.fetchBooksByMatchingProfile(
      pageNum,
      rowsPerPage,
      orderBy,
      order,
      search.search,
      search.select,
    );
    setBooks(res.books);
    setTotal(res.total);
    setIsLoading(false);
  };

  useEffect(() => {
    getBooks(page);
  }, [api, page]);

  useEffect(() => {
    setPage(0);
    getBooks(0);
  }, [rowsPerPage, orderBy, order, search]);

  const handleSearch = (name, event) => {
    setSearch(oldValues => ({
      ...oldValues,
      [name]: event,
    }));
  };

  useEffect(() => {
    async function loadBookStats() {
      const result = await api.fetchOneCreatorBook(selectedBook.bookId);
      setBookDetails(result);
    }
    const isBookSelected =
      !isNil(get(selectedBook, 'selectedBook')) &&
      get(selectedBook, 'selectedBook') !== '';

    const isBookIdPresent =
      !isNil(get(selectedBook, 'bookId')) && get(selectedBook, 'bookId') !== '';

    if (isBookSelected && isBookIdPresent) {
      loadBookStats();
    }
  }, [selectedBook]);

  function handleChangePage(event, newPage) {
    // close the expansion panel
    setState({
      selectedBook: '',
      bookId: '',
    });
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  const hasAccess = claims =>
    claims.filter(claim => claim.status === 'APPROVED').length > 0;

  const handleClick = row => {
    if (hasAccess(row.claims)) history.push(`/catalog/view/${row.id}`);
  };
  const updateUsersTable = index => {
    if (index === selectedBook.selectedBook) {
      setState({
        selectedBook: '',
      });
    } else {
      setState({
        selectedBook: index,
      });
    }
  };

  const onRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const fields = [
    { label: 'TITLE', name: `title`, sortable: true },
    { label: `AUTHOR(S)` },
    { label: `DATE OF PUBLICATION`, name: `datePublished`, sortable: true },
    { label: `STATUS` },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <SearchBar
            handleSearch={(name, value) =>
              handleSearch(name, value.target.value)
            }
            search={search}
          />
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell />
                {fields.map((field, key) => (
                  <TableCell
                    sortDirection={orderBy === field.name ? order : false}
                    key={key}
                  >
                    {field.sortable ? (
                      <TableSortLabel
                        active={orderBy === field.name}
                        direction={orderBy === field.name ? order : 'asc'}
                        onClick={createSortHandler(field.name)}
                      >
                        {field.label}
                        {orderBy === field.name ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      field.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <InlineLoader />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              books.map((row, index) => (
                <TableBody key={index}>
                  <TableRow className={classes.tableRowHover}>
                    <TableCell align="center">
                      <img
                        src={getResizedImage(row.coverUrl, 250)}
                        width="23px"
                        height="30px"
                        alt="Book"
                      />
                    </TableCell>
                    <TableCell onClick={() => handleClick(row)} align="left">
                      {row.title}
                    </TableCell>
                    <TableCell onClick={() => handleClick(row)} align="left">
                      {row.claims.map(a => a.displayName).join(', ')}
                    </TableCell>
                    <TableCell onClick={() => handleClick(row)} align="left">
                      {moment.utc(row.datePublished).format('YYYY/MM/DD')}
                    </TableCell>
                    <TableCell onClick={() => handleClick(row)} align="left">
                      {row.claims.map((a, key) => (
                        <div key={key}>
                          <img
                            alt="status"
                            src={
                              isNil(a.status)
                                ? ''
                                : `/${a.status.toLowerCase()}.svg`
                            }
                          />
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={row.id}
                    className={
                      selectedBook.selectedBook === index
                        ? classes.expansion
                        : classes.hidden
                    }
                  >
                    <MoreDetails
                      booksDetails={bookDetails}
                      updateUsersTable={updateUsersTable}
                    />
                  </TableRow>
                </TableBody>
              ))
            )}
            {!isLoading && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={5}
                    count={total}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}
