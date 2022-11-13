import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  InputAdornment,
  TextField,
  Button,
} from '@material-ui/core';
import history from 'lib/history';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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
  code: {
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      fontSize: '1.3rem',
      marginLeft: 5,
      fontWeight: 'bold',
    },
  },
}));

// Future functionality to include more types
const getUserType = userType => 'Fan';

export default function PromoCodeTable({
  data,
  handleUpdate,
  handleSearch,
  search,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();

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
              <TableCell>Code</TableCell>
              <TableCell>Reward</TableCell>
              <TableCell>Redeemable by</TableCell>
              <TableCell>Redeemable dates</TableCell>
              <TableCell># of Redeems</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data
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
                    <div className={classes.code}>
                      <LocalOfferIcon
                        style={{
                          color: row.active
                            ? theme.palette.promoGreen.main
                            : theme.palette.darkGrey.main,
                          fontSize: '2rem',
                        }}
                      />
                      <span
                        style={{
                          color: row.active
                            ? theme.palette.promoGreen.main
                            : theme.palette.darkGrey.main,
                        }}
                      >
                        {row.code}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                  <TableCell align="left">
                    {getUserType(row.userType)}
                  </TableCell>
                  <TableCell align="left">
                    {moment
                      .unix(row.startDate)
                      .utc()
                      .format('DD/MM/YYYY')}{' '}
                    -{' '}
                    {row.endDate &&
                      moment
                        .unix(row.endDate)
                        .utc()
                        .format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="left">{row.usage}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      onClick={() =>
                        history.push(`/admin/promocodes/edit/${row.id}`)
                      }
                    >
                      Edit
                    </Button>
                    {row.active ? (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleUpdate({ ...row, active: false })}
                      >
                        Disable
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleUpdate({ ...row, active: true })}
                      >
                        Enable
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
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

PromoCodeTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      startDate: PropTypes.number,
      endDate: PropTypes.number,
    }),
  ).isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
