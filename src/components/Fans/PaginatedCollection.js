import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const iconSize = '34px';

const useStyles = makeStyles(theme => ({
  title: {
    margin: '0 0 20px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  pageButtonsContainer: {
    marginTop: '55px',
  },
  pageButtons: {
    marginTop: '-26px',
  },
  icon: {
    border: `solid 1px ${theme.palette.offWhite.main}`,
    background: theme.palette.white.main,
    margin: '0 15px',
    width: iconSize,
    height: iconSize,
    color: theme.palette.darkOrange.main,
    fontSize: '20px',
    '& svg': {
      width: iconSize,
      height: iconSize,
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  hr: {
    color: theme.palette.offWhite.main,
    background: theme.palette.offWhite.main,
    height: '1px',
    border: 'none',
  },
  book: {
    minHeight: theme.fanSite.tombstoneMinHeight('book'),
  },
  author: {
    minHeight: 200,
  },
}));

function PageButtons(props) {
  function handleRightClick() {
    props.handleRightClick();
  }
  function handleLeftClick() {
    props.handleLeftClick();
  }
  const classes = useStyles();
  return (
    <div className={classes.pageButtonsContainer}>
      <hr className={classes.hr} />
      <Grid
        container
        justify="center"
        alignItems="center"
        classes={{ root: classes.pageButtons }}
      >
        <Grid item classes={{ root: classes.icon }} onClick={handleLeftClick}>
          <ChevronLeftIcon fontSize="large" />
        </Grid>
        <Grid item classes={{ root: classes.icon }} onClick={handleRightClick}>
          <ChevronRightIcon fontSize="large" />
        </Grid>
      </Grid>
    </div>
  );
}

export default function PaginatedCollection({
  title,
  collection,
  pageSize,
  isLoading,
  tombstoneType,
}) {
  const totalItems = collection.length;
  const [currentItems, setCurrentItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    setCurrentItems(collection.slice(0, pageSize));
  }, [isLoading]);

  useEffect(() => {
    setCurrentItems(collection.slice(currentIndex, currentIndex + pageSize));
  }, [currentIndex]);

  const handleRightClick = () => {
    setCurrentIndex(
      currentIndex + pageSize >= totalItems
        ? currentIndex
        : currentIndex + pageSize,
    );
  };

  const handleLeftClick = () => {
    setCurrentIndex(currentIndex - pageSize <= 0 ? 0 : currentIndex - pageSize);
  };

  return (
    <div>
      <Box
        component="div"
        fontWeight="fontWeightBold"
        fontSize="29px"
        classes={{ root: classes.title }}
      >
        {title}
      </Box>
      <Grid
        container
        justify="space-between"
        classes={{ root: classes[tombstoneType] }}
      >
        {isLoading && 'Loading...'}
        {!isLoading &&
          currentItems.map((item, key) => (
            <Grid key={key} item xs={Math.floor(12 / pageSize)}>
              {item}
            </Grid>
          ))}
      </Grid>
      <PageButtons
        handleRightClick={handleRightClick}
        handleLeftClick={handleLeftClick}
      />
    </div>
  );
}

PaginatedCollection.propTypes = {
  title: PropTypes.string.isRequired,
  collection: PropTypes.arrayOf(PropTypes.node).isRequired,
  pageSize: PropTypes.number,
  isLoading: PropTypes.bool,
  tombstoneType: PropTypes.string.isRequired,
};

PaginatedCollection.defaultProps = {
  pageSize: 6,
  isLoading: false,
};
