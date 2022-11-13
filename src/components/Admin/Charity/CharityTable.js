import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import MenuIcon from 'components/Admin/Charity/menuIcon';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    '& td, th': {
      fontFamily: "'Rubik','sans-serif'",
      color: '#202f35',
    },
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  search: {
    width: '100%',
    marginBottom: '15px',
  },
  input: {
    height: 40,
  },
  link: {
    color: '#003a99',
    textDecoration: 'underline',
  },
  tableRows: {
    cursor: 'pointer',
  },
  active: {
    background: theme.palette.green.main,
    fontsize: '11px',
    borderRadius: '20px',
    padding: '5px 27px',
    fontWeight: 'bold',
  },
  suspended: {
    background: theme.palette.white.main,
    fontsize: '11px',
    borderRadius: '20px',
    border: '1px solid',
    borderColor: theme.palette.grey.main,
    padding: '5px 10px',
    fontWeight: 'bold',
  },
  tableHeader: {
    background: theme.palette.lightGrey.main,
    '& th': {
      fontWeight: 'bold',
    },
  },
}));

export default function AllfansTable({
  openAlert,
  charitiesData,
  handleSearch,
  search,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const suspendList = ['Update Info', 'Deactivate Charity'];
  const restoreList = ['Restore Account'];

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  return (
    <div className={classes.root}>
      <div className={classes.tableWrapper}>
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
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell width="40px" />
              <TableCell>NAME</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>AMOUNT</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {charitiesData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  className={classes.tableRows}
                >
                  <TableCell align="left">
                    <img
                      src={row.logoUrl}
                      width="50px"
                      height="30px"
                      alt="Book"
                    />
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.url}</TableCell>
                  <TableCell align="left">
                    {row.balance.amount} Points
                  </TableCell>
                  <TableCell align="left">
                    <span
                      className={
                        row.isSuspended ? classes.suspended : classes.active
                      }
                    >
                      {row.isSuspended ? 'Suspended' : 'Active'}
                    </span>
                  </TableCell>
                  <TableCell align="right" padding="none">
                    <MenuIcon
                      labelColor="#e02020"
                      listMenuOption={
                        row.isSuspended ? restoreList : suspendList
                      }
                      fansData={row}
                      onClick={value =>
                        openAlert({
                          charityData: row,
                          charityIndex: index,
                          actionName: value,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={charitiesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

AllfansTable.propTypes = {
  openAlert: PropTypes.func.isRequired,
  charitiesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isSuspended: PropTypes.bool,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
