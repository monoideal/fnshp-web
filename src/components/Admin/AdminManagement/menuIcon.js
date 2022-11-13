import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(() => ({
  deactivateLabel: {
    color: '#e02020',
  },
  options: {
    color: '#000',
  },
}));

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProps = props;
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelection = value => {
    setAnchorEl(null);
    handleProps.onClick(value);
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
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 150,
            marginTop: 50,
          },
        }}
      >
        {handleProps.list.map(option => (
          <MenuItem
            key={option}
            onClick={() => handleSelection(option)}
            className={
              option === 'Deactivate'
                ? classes.deactivateLabel
                : classes.options
            }
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
