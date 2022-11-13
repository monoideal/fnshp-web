import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { useApi } from 'api/';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  listTitle: {
    margin: '15px 0',
    color: theme.palette.darkGrey.main,
    fontSize: '14px',
    fontWeight: 'bold',
  },
  listItem: {
    width: '100%',
    margin: '3px 0 0 0',
    padding: '0px 15px 2px 10px',
    textAlign: 'left',
    justifyContent: 'left',
    border: '1px solid transparent',
    color: theme.palette.black.main,
    fontSize: '14px',
    fontWeight: 400,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  listItemSelected: {
    margin: '3px 0 0 0px',
    padding: '0px 15px 2px 10px',
    border: '1px solid #000000',
    textAlign: 'left',
    justifyContent: 'left',
    color: theme.palette.black.main,
    fontSize: '14px',
    textTransform: 'none',
  },
  clearIcon: {
    position: 'absolute',
    top: '4px',
    right: '6px',
    color: 'transparent',
    marginleft: '3px',
    fontSize: '18px',
  },
  clearIconSelected: {
    position: 'absolute',
    top: '4px',
    right: '6px',
    color: theme.palette.black.main,
    marginleft: '3px',
    fontSize: '18px',
  },
  moreButton: {
    display: 'block',
    width: '100%',
    fontSize: '12px',
    borderTop: '1px solid #ddd',
    marginTop: 5,
  },
}));

export default function BrowseFilterPublishers({
  selectedPublisher,
  onSelectPublisher,
}) {
  const classes = useStyles();

  const { fetchPublishers } = useApi();
  const [publishers, setPublishers] = useState([]);
  const [morePublishers, setMorePublishers] = useState({
    show: false,
    limit: 5,
  });

  useEffect(() => {
    async function initialize() {
      const [fetchedPublishers] = await Promise.all([fetchPublishers()]);
      setPublishers(fetchedPublishers);
    }
    initialize();
  }, []);

  return (
    <div>
      <div className={classes.listTitle}>Publisher</div>
      {publishers.slice(0, morePublishers.limit).map(publisher => (
        <Button
          key={publisher}
          color="primary"
          className={
            publisher.toLowerCase() === selectedPublisher.toLowerCase()
              ? classes.listItemSelected
              : classes.listItem
          }
          onClick={() => onSelectPublisher(publisher)}
        >
          {publisher}{' '}
          <ClearIcon
            className={
              publisher.toLowerCase() === selectedPublisher.toLowerCase()
                ? classes.clearIconSelected
                : classes.clearIcon
            }
          />
        </Button>
      ))}
      <div>
        {!morePublishers.show ? (
          <Button
            className={classes.moreButton}
            onClick={() =>
              setMorePublishers({ show: true, limit: publishers.length })
            }
          >
            +more
          </Button>
        ) : (
          <Button
            className={classes.moreButton}
            onClick={() => setMorePublishers({ show: false, limit: 5 })}
          >
            -less
          </Button>
        )}
      </div>
    </div>
  );
}

BrowseFilterPublishers.propTypes = {
  onSelectPublisher: PropTypes.func.isRequired,
  selectedPublisher: PropTypes.string.isRequired,
};
