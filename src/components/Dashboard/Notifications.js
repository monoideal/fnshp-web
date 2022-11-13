import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';

import FancyTable from 'components/shared/FancyTable';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 20,
  },
  link: {
    color: theme.palette.orange.main,
    textDecoration: 'underline',
  },
}));

export default function Notifications({ data }) {
  const classes = useStyles();
  const theme = useTheme();
  if (!data || !data.length) return <></>;

  const columns = [
    { title: 'Message', field: 'message' },
    { title: 'Date', field: 'date' },
    { title: '', field: 'link', sorting: false },
  ];

  const tableData = data.map(d => ({
    message: d.message,
    date: moment.unix(d.createdAt).format('MMM DD, YYYY'),
    link: (
      <Link className={classes.link} href={d.linkDestination}>
        {d.linkText}
      </Link>
    ),
  }));

  return (
    <FancyTable
      style={{ marginTop: 20 }}
      title="Notifications"
      columns={columns}
      data={tableData}
      options={{
        exportButton: false,
        search: false,
        rowStyle: {
          background: theme.palette.backgroundYellow.main,
        },
      }}
    />
  );
}

Notifications.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      message: PropTypes.string,
      createdAt: PropTypes.number,
      linkText: PropTypes.string,
      linkDestination: PropTypes.string,
    }),
  ).isRequired,
};
