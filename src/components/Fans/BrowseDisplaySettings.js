import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TwoGridIcon from 'components/shared/Icons/TwoGrid';
import ThreeGridIcon from 'components/shared/Icons/ThreeGrid';
import FourGridIcon from 'components/shared/Icons/FourGrid';
import FormatListBulletedSharpIcon from '@material-ui/icons/FormatListBulletedSharp';

import FilterOptions from 'components/Fans/FilterOptions';

const useStyles = makeStyles(theme => ({
  buttonGroup: {
    border: 'none',
  },
  unselected: {
    fill: theme.palette.grey.main,
  },
  selected: {
    fill: theme.palette.black.main,
  },
  columnFilterWrap: {
    [theme.breakpoints.down('md')]: {
      marginBottom: 20,
    },
  },
}));

export default function BrowseHeader({
  numColumns,
  setNumColumns,
  desktopView,
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify={desktopView ? 'flex-end' : 'center'}
      className={classes.columnFilterWrap}
    >
      <Grid item>
        <ButtonGroup
          size="small"
          classes={{ groupedOutlined: classes.buttonGroup }}
        >
          {desktopView ? (
            <>
              <Button onClick={() => setNumColumns(2)}>
                <TwoGridIcon
                  className={
                    numColumns === 2 ? classes.selected : classes.unselected
                  }
                />
              </Button>
              <Button key={3} onClick={() => setNumColumns(3)}>
                <ThreeGridIcon
                  className={
                    numColumns === 3 ? classes.selected : classes.unselected
                  }
                />
              </Button>
              <Button key={4} onClick={() => setNumColumns(4)}>
                <FourGridIcon
                  className={
                    numColumns === 4 ? classes.selected : classes.unselected
                  }
                />
              </Button>
            </>
          ) : (
            <>
              <Button key={1} onClick={() => setNumColumns(1)}>
                <FormatListBulletedSharpIcon
                  className={
                    numColumns === 1 ? classes.selected : classes.unselected
                  }
                />
              </Button>
              <Button key={2} onClick={() => setNumColumns(2)}>
                <TwoGridIcon
                  className={
                    numColumns === 2 ? classes.selected : classes.unselected
                  }
                />
              </Button>
            </>
          )}
        </ButtonGroup>
      </Grid>
      <Grid item>
        <FilterOptions />
      </Grid>
    </Grid>
  );
}

BrowseHeader.propTypes = {
  numColumns: PropTypes.number.isRequired,
  setNumColumns: PropTypes.func.isRequired,
  desktopView: PropTypes.bool.isRequired,
};
