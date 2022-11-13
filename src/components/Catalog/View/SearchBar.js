import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => {
  const {
    borderRadius: { default: borderRadius },
  } = theme;
  return {
    container: {
      padding: '20px 30px 15px',
      display: 'flex',
    },
    select: {
      background: theme.palette.grey.main,
      borderColor: theme.palette.grey.main,
      marginTop: theme.spacing(1),
      borderRadius: `${borderRadius} 0 0 ${borderRadius}`,
      paddingLeft: '15px',
    },
    textField: {
      flex: 1,
      borderColor: theme.palette.grey.main,
      marginTop: theme.spacing(1),
      height: '100%',
      '& fieldset': {
        borderRadius: `0 ${borderRadius} ${borderRadius} 0`,
      },
      '& input': {
        padding: '12px',
      },
    },
  };
});

export default function SearchBar({ handleSearch, search }) {
  const classes = useStyles();

  return (
    <form className={classes.container}>
      <Select
        value={search.select}
        onChange={value => handleSearch('select', value)}
        input={<InputBase classes={{ root: classes.select }} />}
      >
        <MenuItem value="none">Filter</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="OnSale">On Sale</MenuItem>
        <MenuItem value="NotOnSale">Not-On Sale</MenuItem>
      </Select>
      <TextField
        classes={{ root: classes.textField }}
        onChange={value => handleSearch('search', value)}
        variant="outlined"
        value={search.search}
      />
    </form>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.shape({
    select: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};
