import React from 'react';
import PropTypes from 'prop-types';
import { List, ListSubheader, ListItemText, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

import history from 'lib/history';

const useStyles = makeStyles(theme => ({
  root: {
    width: 200,
    fontSize: 14,
  },
  item: {
    padding: '0 0 0 10px',
  },
  itemSelected: {
    padding: '0 0 0 10px',
    border: '1px solid #bbb',
    borderRadius: 5,
    '& span': {
      fontWeight: 'bold !important',
    },
  },
  itemNested: {
    padding: '0 0 0 20px',
  },
  itemParent: {
    marginBottom: 5,
    padding: '0 0 0 10px',
    borderBottom: '1px solid #ddd',
  },
  itemText: {
    '& > span': {
      fontSize: 14,
      fontFamily: 'Rubik',
    },
  },
  itemTextSelected: {
    '& > span': {
      fontSize: 14,
      fontFamily: 'Rubik',
      fontWeight: 'bold',
    },
  },
  itemAll: {
    padding: 0,
    borderBottom: '1px solid #ddd',
  },
  itemAllIcon: {
    minWidth: 25,
    marginTop: '-2px',
  },
  listSubheader: {
    padding: 0,
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
}));

const Item = ({ currentSearchString, searchString, title }) => {
  const classes = useStyles();
  const handleClick = () => {
    if (currentSearchString === searchString) {
      history.push(`/books?q=`);
    } else {
      history.push(`/books?q=${searchString}`);
    }
  };
  return (
    <ListItem
      className={
        currentSearchString === searchString
          ? classes.itemSelected
          : classes.item
      }
      button
      onClick={handleClick}
    >
      <ListItemText className={classes.itemText} primary={title} />
      <ClearIcon
        className={
          currentSearchString === searchString
            ? classes.clearIconSelected
            : classes.clearIcon
        }
      />
    </ListItem>
  );
};

Item.propTypes = {
  currentSearchString: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default function BrowseFilterDiscovery({ searchString }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            disableSticky
            component="div"
            className={classes.listSubheader}
          >
            Recommend to you by...
          </ListSubheader>
        }
        className={classes.root}
      >
        <Item
          currentSearchString={searchString}
          searchString="Discover Guernica Ed."
          title="Guernica Editions"
        />
        <Item
          currentSearchString={searchString}
          searchString="Hana Shafi Recommends"
          title="Hana Shafi"
        />
        <Item
          currentSearchString={searchString}
          searchString="Farzana Doctor Recommends"
          title="Farzana Doctor"
        />
        <Item
          currentSearchString={searchString}
          searchString="Lisa de Nikolits Recommends"
          title="Lisa de Nikolits"
        />
        <Item
          currentSearchString={searchString}
          searchString="TIFA Discovery Zone"
          title="Toronto International Festival of Authors"
        />
      </List>
    </React.Fragment>
  );
}

BrowseFilterDiscovery.propTypes = {
  searchString: PropTypes.string.isRequired,
};
