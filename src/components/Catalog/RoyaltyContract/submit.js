import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import { useApi } from 'api/';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import history from 'lib/history';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: '8%',
  },
  title: {
    fontSize: '22px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontWeight: '700',
    marginBottom: '4%',
  },
  text: {
    fontSize: '17px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    marginBottom: '4%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  head: {
    color: '#f9f9f9',
  },
  header: {
    fontSize: '12px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontWeight: '700',
  },
  email: {
    fontSize: '12px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontWeight: '700',
    width: '300px',
  },
  body: {
    fontSize: '17px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    paddingLeft: '0px',
  },
  btns: {
    marginTop: '10%',
  },
  editBtn: {
    marginRight: '20px',
    background: theme.palette.white.main,
    borderColor: theme.palette.primary.main,
    border: '2px solid',
    boxShadow: 'none',
  },
  response: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '15px',
  },
}));

export default function SubmitModal({
  close,
  open,
  option,
  bookID,
  mainHolder,
  contractValues,
  royaltyHolders,
  update,
}) {
  const classes = useStyles();
  const api = useApi();

  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const royaltyHoldersToSubmit =
    option === 'manual'
      ? Object.values(mainHolder)
      : Object.values(royaltyHolders);

  const handleClose = () => {
    setResponse('');
    close(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const royaltyContractToSave = {
        ...contractValues,
        effectiveDate: moment(contractValues.effectiveDate).unix(),
        expiryDate: moment(contractValues.expiryDate).unix(),
        onSaleDate: moment(contractValues.onSaleDate).unix(),
        rightsholder: _(royaltyHoldersToSubmit)
          .filter(rh => rh.name && rh.percentage)
          .map(({ name, percentage }) => {
            return {
              beneficiaryId: name.userId,
              royaltyPercentage: percentage,
            };
          }),
      };
      if (update) {
        await api
          .disableBookForSale(bookID)
          .then(success => {
            console.log(success);
          })
          .catch(error => {
            console.log(error);
          });
      }
      await api
        .createRoyaltyContract(bookID, royaltyContractToSave)
        .then(success => {
          console.log(success);
          toast.success('Royalty Contract Created Successfully');
          history.replace(`/catalog/view/${bookID}`);
          // handleClose();
        });
    } catch (err) {
      console.log(err.response);
      setResponse(
        _.get(err, 'response.data.error', 'Error occurred on submit.'),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <DialogContent dividers className={classes.dialog}>
          <Typography gutterBottom className={classes.title}>
            Verify Rightholder(s)
          </Typography>
          <Typography gutterBottom className={classes.text}>
            The following rightsholders will be notified with their proposed
            percentage share. Please verify the details and make sure everything
            below is correct, or go back and make adjustments as necessary.
          </Typography>
          <Table>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell padding="none" className={classes.header}>
                  NAME
                </TableCell>
                <TableCell padding="none" className={classes.email}>
                  USER ID
                </TableCell>
                <TableCell padding="none" className={classes.header}>
                  % ROYALTY
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {royaltyHoldersToSubmit.map((row, index) => (
                <TableRow className={classes.body} key={index}>
                  <TableCell align="left" className={classes.body}>
                    {row.name && row.name.name}
                  </TableCell>
                  <TableCell align="left" className={classes.body}>
                    {row.name && row.name.userId}
                  </TableCell>
                  <TableCell align="left" className={classes.body}>
                    {row.percentage}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            className={classes.btns}
          >
            <Button
              className={classes.editBtn}
              variant="contained"
              onClick={handleClose}
            >
              <b>GO BACK</b>
            </Button>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              <b>CONFIRM</b>
            </Button>
            {loading && <CircularProgress />}
          </Grid>
          <Grid item component="div" className={classes.response}>
            {response}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

SubmitModal.propTypes = {
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  option: PropTypes.string.isRequired,
  mainHolder: PropTypes.shape({}).isRequired,
  royaltyHolders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contractValues: PropTypes.objectOf(PropTypes.string).isRequired,
  bookID: PropTypes.number.isRequired,
  update: PropTypes.bool.isRequired,
};
