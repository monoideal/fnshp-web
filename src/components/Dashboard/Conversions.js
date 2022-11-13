import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import TreeDraw from 'components/Fans/TreeDraw';

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none',
  },
  topText: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    lineHeight: '2',
    color: theme.palette.black.main,
    fontStyle: 'italic',
    marginBottom: '2%',
    marginLeft: '22px',
    textAlign: 'left',
  },
  header: {
    marginTop: 10,
    textAlign: 'left',
    marginLeft: '22px',
  },
  legendWrapper: {
    display: `flex`,
    marginTop: `5px`,
  },
  legendCircle: {
    border: `1px solid ${theme.palette.darkGrey.main}`,
    borderRadius: `50%`,
    height: `24px`,
    width: `24px`,
    marginRight: `8px`,
  },
  legendText: {
    fontSize: '16px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    paddingTop: `4px`,
  },
  legendNumber: {
    fontSize: '18px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontWeight: '700',
    marginRight: '8px',
    paddingTop: `4px`,
  },
  iconInfo: {
    color: '#999',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function Conversions({ selected, book, treeData }) {
  const classes = useStyles();

  const currentDate = new Date();
  const month =
    currentDate.getMonth() + 1 < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;

  const date =
    currentDate.getDate() < 10
      ? `0${currentDate.getDate()}`
      : currentDate.getDate();

  const currentTime = `${currentDate.getFullYear()}/${month}/${date}`;

  return (
    <div className={!selected ? classes.hidden : undefined}>
      <Box fontSize={20} textAlign="center">
        {book ? (
          <>
            <Grid item className={classes.header}>
              <Box fontSize={17}>
                {'Showing analytics for '}
                <Box component="span" fontWeight="bold">
                  {book ? book.title : ''}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} className={classes.topText}>
              The analytics data is as of {currentTime}. It might take up to 24
              hours to update the data.
            </Grid>
            {Object.keys(treeData).length > 0 ? (
              <Grid container spacing={2}>
                <Grid container>
                  <TreeDraw shape={treeData} />
                </Grid>
                <Grid container style={{ margin: `0 60px` }}>
                  <Grid item sm={6} lg={6}>
                    <Box className={classes.legendWrapper}>
                      <Box
                        className={classes.legendCircle}
                        style={{ background: '#FF9900' }}
                      />
                      <Typography className={classes.legendText}>
                        Your Book
                      </Typography>
                      <Tooltip
                        title="This is your book"
                        placement="right"
                        fontSize="small"
                      >
                        <InfoIcon className={classes.iconInfo} />
                      </Tooltip>
                    </Box>
                    <Box className={classes.legendWrapper}>
                      <Box
                        className={classes.legendCircle}
                        style={{ background: 'blue' }}
                      />
                      <Typography className={classes.legendText}>
                        Purchased
                      </Typography>
                      <Tooltip
                        title="A fan has bought your book and recommended it to others or received a recommendation and bought the book"
                        placement="right"
                        fontSize="small"
                      >
                        <InfoIcon className={classes.iconInfo} />
                      </Tooltip>
                    </Box>
                    <Box className={classes.legendWrapper}>
                      <Box
                        className={classes.legendCircle}
                        style={{ background: 'yellow' }}
                      />
                      <Typography className={classes.legendText}>
                        Not Purchased
                      </Typography>
                      <Tooltip
                        title="A fan did not buy your book but recommended it to others or received a recommendation and did not buy the book"
                        placement="right"
                        fontSize="small"
                      >
                        <InfoIcon className={classes.iconInfo} />
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item sm={6} lg={6}>
                    <Box className={classes.legendWrapper}>
                      <span className={classes.legendNumber}>
                        {treeData.recommendations}
                      </span>
                      <Typography className={classes.legendText}>
                        Fans Recommending
                      </Typography>
                      <Tooltip
                        title="Number of people recommending your book"
                        placement="right"
                        fontSize="small"
                      >
                        <InfoIcon className={classes.iconInfo} />
                      </Tooltip>
                    </Box>
                    <Box className={classes.legendWrapper}>
                      <span className={classes.legendNumber}>
                        {treeData.purchases}
                      </span>
                      <Typography className={classes.legendText}>
                        Purchases
                      </Typography>
                      <Tooltip
                        title="Number of purchases from fans who bought the book and recommended it to others or have received a recommendation and bought the book"
                        placement="right"
                        fontSize="small"
                      >
                        <InfoIcon className={classes.iconInfo} />
                      </Tooltip>
                    </Box>
                    <Box className={classes.legendWrapper}>
                      <span className={classes.legendNumber}>
                        {treeData.clicks}
                      </span>
                      <Typography className={classes.legendText}>
                        Click-Throughs
                      </Typography>
                      <Tooltip
                        title="Number of users who viewed the book details based on a recommendation"
                        placement="right"
                        fontSize="small"
                      >
                        <InfoIcon className={classes.iconInfo} />
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ''
            )}
          </>
        ) : (
          <React.Fragment>
            <p>Please make a book selection to view conversions breakdown.</p>
            <p>
              When a Fanship user recommends your book(s) or clicks on a
              recommendation link from somebody else, you’ll see that data here.
            </p>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}

Conversions.propTypes = {
  selected: PropTypes.bool.isRequired,
  book: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
  }),
  treeData: PropTypes.objectOf(PropTypes.any),
};

Conversions.defaultProps = {
  book: null,
  treeData: null,
};
