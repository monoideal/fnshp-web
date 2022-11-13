import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useApi } from 'api/';
import { Grid, Paper, Avatar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import UnarchiveIcon from '@material-ui/icons/UnarchiveOutlined';
import VerifiedIcon from '@material-ui/icons/PlaylistAddCheck';
import PendingIcon from '@material-ui/icons/HourglassEmpty';
import RejectedIcon from '@material-ui/icons/Block';
import moment from 'moment';

import { getResizedImage } from 'util/helpers';
import FancyTable from 'components/shared/FancyTable';

const ON_SALE = 'onsale';
const SUBMITTED = 'submitted';
const VERIFIED = 'verified';
const PENDING = 'pending';
const REJECTED = 'rejected';

const booksMetaStyles = makeStyles(theme => ({
  container: {
    marginTop: 10,
  },
  item: {
    width: '18%',
    '&hover': {
      cursor: 'pointer',
    },
  },
  selectedItem: {
    paddingBottom: '10px',
    background: theme.palette.navy.main,
    color: '#fff',
    borderRadius: '3px 3px 0 0',
  },
  paper: {
    padding: theme.spacing(3, 2),
    textAlign: 'center',
  },
  selectedPaper: {
    background: theme.palette.navy.main,
    color: theme.palette.white.main,
  },
  avatar: {
    margin: 'auto',
  },
  number: {
    margin: theme.spacing(1, 0),
  },
  totalSales: {
    background: theme.palette.grey.main,
    color: theme.palette.black.main,
  },
  submitted: {
    background: theme.palette.plum.light,
    color: theme.palette.plum.main,
  },
  verified: {
    background: theme.palette.blue.light,
    color: theme.palette.blue.main,
  },
  pending: {
    background: theme.palette.yellow.light,
    color: theme.palette.yellow.main,
  },
  rejected: {
    background: theme.palette.red.light,
    color: theme.palette.red.main,
  },
}));

function DisplayCard({ icon, value, colorClass, label, selected, onClick }) {
  const classes = booksMetaStyles();
  return (
    <Grid
      onClick={onClick}
      item
      className={clsx(classes.item, selected && classes.selectedItem)}
    >
      <Paper
        style={{ cursor: 'pointer' }}
        className={clsx(classes.paper, selected && classes.selectedPaper)}
      >
        <Box>
          <Avatar className={clsx(classes.avatar, colorClass)}>{icon}</Avatar>
        </Box>
        <Box fontWeight="bold" fontSize={24} className={classes.number}>
          {value}
        </Box>
        <Box fontSize={14}>{label}</Box>
      </Paper>
    </Grid>
  );
}

DisplayCard.propTypes = {
  value: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
  colorClass: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

DisplayCard.defaultProps = {
  selected: false,
};

function Table({ type, tabName }) {
  const api = useApi();
  let timer;
  const columns = [
    {
      field: 'coverUrl',
      sorting: false,
      render: rowData => (
        <img
          style={{ widht: '27px', height: '36px' }}
          alt="cover-url"
          src={getResizedImage(rowData.coverUrl, 250)}
        />
      ),
    },
    { title: 'Title', field: 'title', sorting: false },
    {
      title: 'Creator',
      sorting: false,
      render: rowData => (
        <span>
          {rowData.contributors
            .map(a => (a.displayName ? a.displayName : a.name))
            .join(', ')}
        </span>
      ),
    },
    {
      date: 'Last Name',
      sorting: false,
      render: rowData => (
        <span>{moment(rowData.datePublished).format('YYYY/MM/DD')}</span>
      ),
    },
  ];

  const style = {
    borderTop: 'solid #171331 2px',
    borderRadius: '0 0 4px 4px',
  };

  return (
    <FancyTable
      style={style}
      title={`${tabName} Books`}
      columns={columns}
      data={query =>
        new Promise(resolve => {
          // Debounce to call API less when searching
          clearTimeout(timer);
          timer = setTimeout(
            () => {
              api
                .fetchCreatorDashboardBooksByType(
                  type,
                  query.page,
                  query.pageSize,
                  query.search,
                )
                .then(result => {
                  resolve({
                    data: result.books,
                    page: query.page,
                    totalCount: result.total,
                  });
                });
            },
            query.search ? 500 : 0,
          );
        })
      }
      options={{
        exportButton: false,
      }}
    />
  );
}

Table.propTypes = {
  tabName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default function BooksMeta({ data }) {
  const classes = booksMetaStyles();
  const { onsale, submitted, verified, pending, rejected } = data;
  const [selected, setSelected] = useState('');

  async function handleClick(type) {
    if (type === selected.type) {
      setSelected('');
    } else {
      setSelected(type);
    }
  }

  return (
    <>
      <Grid
        container
        alignItems="stretch"
        justify="space-between"
        className={classes.container}
      >
        <DisplayCard
          onClick={() => handleClick(ON_SALE)}
          selected={selected === ON_SALE}
          value={onsale}
          icon={<ShoppingCartIcon />}
          colorClass={classes.totalSales}
          label="On-Sale"
        />
        <DisplayCard
          onClick={() => handleClick(SUBMITTED)}
          selected={selected === SUBMITTED}
          value={submitted}
          icon={<UnarchiveIcon />}
          colorClass={classes.submitted}
          label="Submitted"
        />
        <DisplayCard
          onClick={() => handleClick(VERIFIED)}
          selected={selected === VERIFIED}
          value={verified}
          icon={<VerifiedIcon />}
          colorClass={classes.verified}
          label="Verified"
        />
        <DisplayCard
          onClick={() => handleClick(PENDING)}
          selected={selected === PENDING}
          value={pending}
          icon={<PendingIcon />}
          colorClass={classes.pending}
          label="Pending"
        />
        <DisplayCard
          onClick={() => handleClick(REJECTED)}
          selected={selected === REJECTED}
          value={rejected}
          icon={<RejectedIcon />}
          colorClass={classes.rejected}
          label="Rejected"
        />
      </Grid>

      {selected === ON_SALE && <Table type={selected} tabName="On-Sale" />}
      {selected === SUBMITTED && <Table type={selected} tabName="Submitted" />}
      {selected === VERIFIED && <Table type={selected} tabName="Verified" />}
      {selected === PENDING && <Table type={selected} tabName="Pending" />}
      {selected === REJECTED && <Table type={selected} tabName="Rejected" />}
    </>
  );
}

BooksMeta.propTypes = {
  data: PropTypes.shape({
    onsale: PropTypes.number.isRequired,
    submitted: PropTypes.number.isRequired,
    verified: PropTypes.number.isRequired,
    pending: PropTypes.number.isRequired,
    rejected: PropTypes.number.isRequired,
  }),
};

BooksMeta.defaultProps = {
  data: null,
};
