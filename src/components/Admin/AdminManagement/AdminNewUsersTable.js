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
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from 'components/Admin/AdminManagement/menuIcon';
import Moment from 'react-moment';

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
  tableRows: {
    cursor: 'pointer',
  },
  tableHeader: {
    background: theme.palette.lightGrey.main,
  },
}));

export default function AdminNewUsersTable({
  openAlert,
  usersData,
  search,
  handleSearch,
}) {
  const classes = useStyles();
  const options = ['Promote', 'Deactivate'];
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const rows = [];
  const rowsPerPage = 10;

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  const handleAdminSearch = event => {
    setPage(0);
    handleSearch(event);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tableWrapper}>
        <TextField
          value={search}
          onChange={handleAdminSearch}
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
              <TableCell padding="checkbox" className="check" />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Account Creation Date</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.length > 0 &&
              usersData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    className={classes.tableRows}
                  >
                    <TableCell />
                    <TableCell align="left">
                      {`${row.admin.firstName} ${row.admin.lastName}`}
                    </TableCell>
                    <TableCell align="left">{row.admin.email}</TableCell>
                    <TableCell align="left">
                      <Moment date={row.admin.createdAt} format="YYYY/MM/DD" />
                    </TableCell>
                    <TableCell align="right" padding="none">
                      <MenuIcon
                        list={options}
                        onClick={option =>
                          openAlert(
                            {
                              selectedUser: row,
                              userIndex: index,
                            },
                            option,
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        labelRowsPerPage=""
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
      />
    </div>
  );
}

AdminNewUsersTable.propTypes = {
  openAlert: PropTypes.func.isRequired,
  usersData: PropTypes.arrayOf(PropTypes.any).isRequired,
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
