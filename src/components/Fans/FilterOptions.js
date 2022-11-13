import React, { useState } from 'react';
import { Grid, Select, Input, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  expandMoreIcon: {
    color: theme.palette.red.main,
  },
  select: {
    fontWeight: 'bold',
    paddingRight: '30px',
  },
  selectMenu: {
    '&:focus': {
      background: theme.palette.white.main,
    },
  },
  menuList: {
    padding: 0,
  },
  menuPaper: {
    borderRadius: 0,
    boxShadow: 'none',
    border: `solid 1px ${theme.palette.grey.main}`,
  },
  filterOption: {
    marginLeft: '35px',
  },
}));

function SortBy() {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState('none');
  return (
    <Select
      value={sortBy}
      onChange={e => setSortBy(e.target.value)}
      name="sort-by"
      classes={{
        select: classes.select,
        icon: classes.expandMoreIcon,
        selectMenu: classes.selectMenu,
      }}
      input={<Input disableUnderline />}
      IconComponent={props => <ExpandMoreIcon {...props} />}
      MenuProps={{
        classes: { paper: classes.menuPaper, list: classes.menuList },
      }}
    >
      <MenuItem value="none">Sort By</MenuItem>
      <MenuItem value="price">Price</MenuItem>
      <MenuItem value="date">Date</MenuItem>
    </Select>
  );
}

function PageSize() {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState(20);
  return (
    <Select
      value={pageSize}
      onChange={e => setPageSize(e.target.value)}
      name="page-size"
      classes={{
        select: classes.select,
        icon: classes.expandMoreIcon,
        selectMenu: classes.selectMenu,
      }}
      input={<Input disableUnderline />}
      IconComponent={props => <ExpandMoreIcon {...props} />}
      MenuProps={{
        classes: { paper: classes.menuPaper, list: classes.menuList },
      }}
    >
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={20}>20</MenuItem>
      <MenuItem value={30}>30</MenuItem>
    </Select>
  );
}

export default function FilterOptions() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item className={classes.filterOption}>
        <SortBy />
      </Grid>
      <Grid item className={classes.filterOption}>
        <PageSize />
      </Grid>
    </Grid>
  );
}
