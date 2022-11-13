import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Typography,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  ErrorChip,
  UnconfirmedChip,
  ActiveChip,
} from 'components/shared/StyledChips';
import StyledTable from 'components/shared/StyledTable';
import { isEmpty, get } from 'lodash';
import history from 'lib/history';
import { formatCurrency, formatContractPercent } from 'util/helpers';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '20px 30px 40px 30px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    fontFamily: 'Rubik',
    fontWeight: 'normal',
    fontSize: '17px',
    color: '#000000',
    lineHeight: 1.24,
  },
  heading: {
    fontFamily: 'Rubik',
    fontWeight: 'bold',
    fontSize: '17px',
    color: '#000000',
    marginBottom: '24px',
  },
  chip: {
    display: 'inline-flex',
    float: 'right',
  },
  royaltyContractHeader: {
    fontWeight: 400,
    borderRadius: '4px',
    textAlign: 'center',
    padding: '4px 12px',
  },
  retailPriceChip: {
    background: theme.palette.grey.main,
    marginLeft: '16px',
  },
  onSale: {
    border: 'solid 2px #4fdbc0',
  },
  notOnSale: {
    border: `solid 2px ${theme.palette.grey.main}`,
  },
  active: {
    borderColor: theme.palette.green.main,
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

  tableRoot: {
    marginTop: theme.spacing(3),
    '& td': {
      borderBottom: '1px solid rgba(131, 126, 152, 0.2)',
      padding: '10px 20px',
      textAlign: 'left',
    },

    '& th': {
      textAlign: 'left',
    },
  },
  chipCompact: {
    margin: 0,
  },
  content: {
    marginTop: theme.spacing(2),
  },
  footer: {
    marginTop: theme.spacing(3),
    fontStyle: 'italic',
    fontSize: '13px',
  },
  newContractContainer: {
    width: '100%',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.palette.black.main,
    borderWidth: 2,
    '&:hover': {
      background: theme.palette.white.main,
      borderWidth: 2,
    },
  },
}));

function ContractStatus({ contractDetails }) {
  const classes = useStyles();

  const showContractAcceptanceStatus = status => {
    switch (status) {
      case 'approved':
        return <ActiveChip label="Active" className={classes.chipCompact} />;
      case 'pending':
        return (
          <UnconfirmedChip
            label="Unconfirmed"
            className={classes.chipCompact}
          />
        );
      case 'denied':
        return <ErrorChip label="Rejected" className={classes.chipCompact} />;
      default:
        return null;
    }
  };

  return (
    <StyledTable className={classes.tableRoot}>
      <TableHead>
        <TableRow>
          <TableCell>NAME</TableCell>
          <TableCell>EMAIL</TableCell>
          <TableCell>% ROYALTY</TableCell>
          <TableCell>STATUS</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {contractDetails &&
          contractDetails.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.displayName}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>
                {formatContractPercent(data.royaltyPercentage)}
              </TableCell>
              <TableCell>{showContractAcceptanceStatus(data.status)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </StyledTable>
  );
}

ContractStatus.propTypes = {
  contractDetails: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

function RoyaltyContract({ contract, status }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid container>
        <Grid item xs={5}>
          <Typography className={classes.heading}>Royalty Contract</Typography>
        </Grid>
        <Grid item xs={7}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={12}>
              <div className={classes.chip}>
                <div
                  className={clsx(
                    classes.royaltyContractHeader,
                    get(contract, ['status', 'canSell'])
                      ? classes.onSale
                      : classes.notOnSale,
                  )}
                >
                  {get(contract, ['status', 'canSell'])
                    ? 'On Sale'
                    : 'Not-On Sale'}
                </div>
                <div
                  className={clsx(
                    classes.royaltyContractHeader,
                    classes.retailPriceChip,
                  )}
                >
                  Retail Price: {formatCurrency(contract.retailPrice)} CAD
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.content}>
          Royalty will be distributed to the following rightsholders:
          <ContractStatus contractDetails={contract.details} />
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          Until all parties confirm their royalty contract percentage, the book
          will not go on-sale on the platform.
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.updateButton}
            disabled={status === 'Rejected'}
            onClick={() =>
              history.push(`/catalog/${contract.bookId}/royalty-contract/${contract.id}`, {
                type: 'update',
              })
            }
          >
            Update Royalty Contract
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

RoyaltyContract.propTypes = {
  status: PropTypes.string.isRequired,
  contract: PropTypes.shape({
    bookId: PropTypes.number.isRequired,
    retailPrice: PropTypes.number.isRequired,
    status: PropTypes.shape({
      canSell: PropTypes.bool.isRequired,
    }),
    details: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

function NoRoyaltyContract({ bookId, status }) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.heading}>Royalty Contract</Typography>
      </Grid>
      <Grid item xs={12} className={classes.newContractContainer}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <img alt="New Contract" src="/img/contract.png" />
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              disabled={status === 'Pending' || status === 'Rejected'}
              className={classes.updateButton}
              onClick={() => 
                history.push(`/catalog/${bookId}/royalty-contract`)
              }
            >
              Create Royalty Contract
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

NoRoyaltyContract.propTypes = {
  bookId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

// TODO: Need to confirm whether all the contracts need to be shown or the latest one
export default function RoyaltyContractViewContainer({ data, bookId, status }) {
  return (
    <div>
      {!isEmpty(data) && status !== 'Pending' ? (
        <RoyaltyContract contract={data} status={status} />
      ) : (
        <NoRoyaltyContract bookId={bookId} status={status} />
      )}
    </div>
  );
}

RoyaltyContractViewContainer.propTypes = {
  data: PropTypes.shape({}).isRequired,
  bookId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};
