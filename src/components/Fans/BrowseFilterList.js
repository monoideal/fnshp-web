import React from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BrowseFilterCategories from 'components/Fans/BrowseFilterCategories';
import BrowseFilterDiscovery from 'components/Fans/BrowseFilterDiscovery';
// import BrowseFilterPublishers from 'components/Fans/BrowseFilterPublishers';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '0px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '22px',
      marginTop: 0,
      overflow: 'scroll',
    },
  },
  drawerPaper: {
    position: 'relative',
    wordBreak: 'break-word',
    width: theme.drawerWidth,
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    overflowY: 'initial',
  },
  title: {
    margin: '15px 0 0',
    color: theme.palette.darkGrey.main,
    fontSize: '16px',
  },
  closeIconContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 100,
  },
}));

export default function BrowseFilterList({
  varient,
  setOpen,
  open,
  searchString,
  // onSelectPublisher,
  // selectedPublisher,
}) {
  const themeMedia = useTheme();
  const desktopView = useMediaQuery(themeMedia.breakpoints.up('md'));
  const classes = useStyles();

  return (
    <React.Fragment>
      <Drawer
        variant={varient}
        classes={{ paper: classes.drawerPaper }}
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        {!desktopView ? (
          <div className={classes.closeIconContainer}>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          ''
        )}
        <div className={classes.root}>
          <Box className={classes.title}>Browse by</Box>
          <BrowseFilterCategories />
          <BrowseFilterDiscovery searchString={searchString} />
          {/* <BrowseFilterPublishers
            onSelectPublisher={onSelectPublisher}
            selectedPublisher={selectedPublisher}
          /> */}
        </div>
      </Drawer>
    </React.Fragment>
  );
}

// BrowseFilterList.defaultProps = {
//   selectedPublisher: '',
// };

BrowseFilterList.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  varient: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  // onSelectPublisher: PropTypes.func.isRequired,
  // selectedPublisher: PropTypes.string,
};
