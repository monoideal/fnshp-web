import React from 'react';
import { IconButton, Menu, MenuItem, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  menuProp: {
    maxHeight: 48 * 4.5,
    width: 150,
    marginTop: 50,
  },
  reject: {
    color: theme.palette.red.main,
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '14px',
  },
  approve: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.lightGrey.main,
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '14px',
  },
  update: {
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '14px',
  },
}));

export default function MenuIcon({ onClick, fansData, listMenuOption }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelection = value => {
    setAnchorEl(null);
    onClick(value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      {listMenuOption.length > 1 && (
        <Menu
          id="long-menu"
          className={classes.menu}
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            className: classes.menuProp,
          }}
        >
          {/* Passing userId as backend expects userId instead of id */}
          <MenuItem
            className={classes.update}
            component={Link}
            to={`/admin/editCharity/${fansData.userId}`}
            fontStyle="'Rubik','sans-serif'"
          >
            {listMenuOption[0]}
          </MenuItem>
          <MenuItem
            className={classes.reject}
            onClick={() => handleSelection(listMenuOption[1])}
          >
            {listMenuOption[1]}
          </MenuItem>
        </Menu>
      )}
      {listMenuOption.length === 1 && (
        <Menu
          id="long-menu"
          className={classes.menu}
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            className: classes.menuProp,
          }}
        >
          <MenuItem
            className={classes.reject}
            onClick={() => handleSelection(listMenuOption[0])}
          >
            {listMenuOption[0]}
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}

MenuIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  fansData: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    isSuspended: PropTypes.bool,
  }).isRequired,
  listMenuOption: PropTypes.arrayOf(PropTypes.string).isRequired,
};
