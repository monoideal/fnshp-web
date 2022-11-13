import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  List,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  ListItem,
} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'qs';

import { AppContext } from 'components/AppContext';
import history from 'lib/history';
import { findCategory } from 'util/helpers';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 14,
  },
  item: {
    padding: '0 0 0 10px',
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
}));

const buildSearchQuery = (categoryUrl, query) =>
  `/books${categoryUrl && `/${categoryUrl}`}${
    query !== undefined ? `?q=${query}` : ``
  }`;

export default function BrowseFilterCategories() {
  const classes = useStyles();
  const { categories } = React.useContext(AppContext);
  const { parent, child } = useParams();
  const selectedParentCategory = findCategory(categories, parent, null);
  const selectedChildCategory = findCategory(categories, parent, child);
  const location = useLocation();
  const { q: searchString } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

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
            Category
          </ListSubheader>
        }
        className={classes.root}
      >
        {selectedParentCategory && (
          <ListItem
            className={classes.itemAll}
            button
            onClick={() => history.push(buildSearchQuery('', searchString))}
          >
            <ListItemIcon className={classes.itemAllIcon}>
              <ChevronLeft />
            </ListItemIcon>
            <ListItemText
              className={classes.itemText}
              primary="All Categories"
            />
          </ListItem>
        )}
        {selectedParentCategory && (
          <ListItem
            button
            className={classes.itemParent}
            onClick={() =>
              history.push(
                buildSearchQuery(`${selectedParentCategory.url}`, searchString),
              )
            }
          >
            <ListItemText
              className={
                selectedParentCategory !== selectedChildCategory
                  ? classes.itemText
                  : classes.itemTextSelected
              }
              primary={selectedParentCategory.name}
            />
          </ListItem>
        )}
        {selectedParentCategory && selectedParentCategory.subCategories
          ? selectedParentCategory.subCategories.map(category => (
              <ListItem
                button
                key={category.id}
                className={classes.itemNested}
                onClick={() =>
                  history.push(
                    buildSearchQuery(
                      `${selectedParentCategory.url}/${category.url}`,
                      searchString,
                    ),
                  )
                }
              >
                <ListItemText
                  className={
                    selectedChildCategory.id === category.id
                      ? classes.itemTextSelected
                      : classes.itemText
                  }
                  primary={category.name}
                />
              </ListItem>
            ))
          : categories &&
            categories.map(category => (
              <ListItem button key={category.id} className={classes.item}>
                <ListItemText
                  className={classes.itemText}
                  onClick={() =>
                    history.push(
                      buildSearchQuery(`${category.url}`, searchString),
                    )
                  }
                  primary={category.name}
                />
              </ListItem>
            ))}
      </List>
    </React.Fragment>
  );
}
