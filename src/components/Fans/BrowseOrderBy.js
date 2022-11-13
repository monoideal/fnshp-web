import React from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Drawer,
  IconButton,
  Button,
  Box,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    right: '10px',
    marginTop: '20px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      paddingLeft: '22px',
      position: 'static',
    },
  },
  drawer: {
    padding: '0 20px 20px',
    '& button': {
      display: 'block',
      textTransform: 'none',
    },
  },
  closeIconContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  title: {
    margin: '15px 0 15px',
    color: theme.palette.darkGrey.main,
    fontSize: '16px',
  },
}));

export default function BrowseOrderBy({
  open,
  setOpen,
  onOrderby,
  selectedOrderBy,
}) {
  const classes = useStyles();
  const themeMedia = useTheme();
  const desktopView = useMediaQuery(themeMedia.breakpoints.up('md'));

  return (
    <div className={classes.root}>
      {desktopView ? (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Order by</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedOrderBy}
            onChange={onOrderby}
          >
            <MenuItem value="datePublished desc">Latest Releases</MenuItem>
            <MenuItem value="id desc">New on Fanship</MenuItem>
            {/* MenuItem value="price asc">Price lowest to highest</MenuItem>
            <MenuItem value="price desc">Price highest to lowest</MenuItem> */}
            <MenuItem value="author_name asc">Author&apos;s Last Name</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <React.Fragment>
          <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
            <div className={classes.drawer}>
              <div className={classes.closeIconContainer}>
                <IconButton size="small" onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </div>
              <Box className={classes.title}>Order by</Box>
              <Button
                onClick={() => {
                  onOrderby('datePublished desc');
                  setOpen(false);
                }}
              >
                Latest Releases
              </Button>
              <Button
                onClick={() => {
                  onOrderby('id desc');
                  setOpen(false);
                }}
              >
                New on Fanship
              </Button>
              {/* <Button
                onClick={() => {
                  setOpen(false);
                  onOrderby('price asc');
                }}
              >
                Price lowest to highest
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  onOrderby('price desc');
                }}
              > 
                Price highest to lowest
              </Button> */}
              <Button
                onClick={() => {
                  setOpen(false);
                  onOrderby('author_name asc');
                }}
              >
                Author&apos;s Last Name
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      )}
    </div>
  );
}

BrowseOrderBy.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onOrderby: PropTypes.func.isRequired,
  selectedOrderBy: PropTypes.string.isRequired,
};
