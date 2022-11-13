import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  Typography,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Moment from 'react-moment';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
  root: {
    padding: '6%',
    fontFamily: "'Rubik','sans-serif'",
    minWidth: 750,
  },
  title: {
    fontSize: '20px',
    color: theme.palette.black.main,
    fontWeight: '700',
  },
  closeIcon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    // minWidth: 750,
    '& td': {
      fontFamily: "'Rubik','sans-serif'",
      color: '#333333',
      fontSize: '15px',
    },
    '& th': {
      fontFamily: "'Rubik','sans-serif'",
      color: theme.palette.black.main,
      fontSize: '12px',
      fontWeight: 'bold',
    },
  },
  tableRows: {
    cursor: 'pointer',
  },
}));

export default function AuditHistory({ open, close, booksDetails }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
        <DialogContent dividers className={classes.root}>
          <Typography gutterBottom className={classes.title}>
            {booksDetails.title} Audit History
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ACTION</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booksDetails.eventLog &&
                booksDetails.eventLog
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      className={classes.tableRows}
                    >
                      <TableCell align="left">{row.action}</TableCell>
                      <TableCell align="left">
                        <Moment date={row.createdDate} format="LLL" />
                      </TableCell>
                      <TableCell align="left">
                        <img
                          alt="approved"
                          src={`/${row.status.toLowerCase()}.svg`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <TablePagination
            labelRowsPerPage=""
            rowsPerPageOptions={[]}
            component="div"
            count={booksDetails.eventLog ? booksDetails.eventLog.length : 0}
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

          <CloseIcon
            className={classes.closeIcon}
            onClick={() => close(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

AuditHistory.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  booksDetails: PropTypes.shape({
    title: PropTypes.string,
    eventLog: PropTypes.arrayOf(
      PropTypes.shape({
        action: PropTypes.string.isRequired,
        createdDate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};
