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
import { capitalize } from 'lodash';

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

export default function AdminUsersTable({
  openAlert,
  usersData,
  search,
  handleSearch,
  loggedInUser,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  const changeDisplayStatus = status => {
    switch (status) {
      case 'approved':
        return 'active';
      case 'denied':
        return 'deactivated';
      default:
        return status;
    }
  };

  const handleAdminSearch = event => {
    setPage(0);
    handleSearch(event);
  };

  const isLoggedInUser = email => {
    return loggedInUser.email === email;
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
        <Table className={classes.table}>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Account Type</TableCell>
              <TableCell>Account Status</TableCell>
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
                    <TableCell align="left">
                      {`${row.admin[0].first_name} ${row.admin[0].last_name}`}
                      {isLoggedInUser(row.admin.email) ? ' (you)' : ''}
                    </TableCell>
                    <TableCell align="left">{row.admin.email}</TableCell>
                    <TableCell align="left">
                      {row.admin.isOwner ? 'Owner' : 'Admin'}
                    </TableCell>
                    <TableCell align="left">
                      {row.isVerified
                        ? capitalize(changeDisplayStatus(row.isVerified))
                        : ''}
                    </TableCell>
                    <TableCell align="right" padding="none">
                      {!isLoggedInUser(row.admin.email) &&
                      row.isVerified !== 'denied' ? (
                        <MenuIcon
                          labelColor="#e02020"
                          list={
                            row.admin.isOwner
                              ? ['Deactivate']
                              : ['Promote', 'Deactivate']
                          }
                          onClick={option =>
                            openAlert(
                              { selectedUser: row, userIndex: index },
                              option,
                            )
                          }
                        />
                      ) : (
                        ''
                      )}
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
        count={usersData.length}
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

AdminUsersTable.propTypes = {
  openAlert: PropTypes.func.isRequired,
  usersData: PropTypes.arrayOf(PropTypes.any).isRequired,
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loggedInUser: PropTypes.objectOf(PropTypes.any).isRequired,
};
