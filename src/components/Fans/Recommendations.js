/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from 'lib/history';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import { useApi } from 'api/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TreeDraw from 'components/Fans/TreeDraw';
import PropTypes from 'prop-types';
import { Typography, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RecommendBook from 'components/Fans/RecommendBook';

const tableStyles = makeStyles(theme => ({
  header: {
    fontSize: '12px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
    fontWeight: '500',
  },
  hidden: {
    display: 'none',
    visibility: 'hidden',
  },
  bookCover: {
    height: 75,
  },
  title: {
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  bookAuthor: {
    maxWidth: 200,
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& span:after': { content: '", "' },
    '& span:last-child:after': { content: '""' },
    '& a': {
      textDecoration: 'underline',
    },
  },
  graphButton: {
    width: '100%',
    padding: '8px 6px',
    color: theme.palette.darkPurple.main,
    borderColor: theme.palette.black.main,
    letterSpacing: 0,
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'none',
    whiteSpace: 'nowrap',
    '& img': {
      width: 20,
      paddingLeft: 10,
    },
  },
  noResultsButton: {
    marginBottom: 20,
    color: theme.palette.darkPurple.main,
    borderColor: theme.palette.black.main,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    '& svg': {
      paddingLeft: 10,
    },
  },
  recommendButton: {
    width: '100%',
    color: theme.palette.darkPurple.main,
    fontWeight: 'bold',
    fontSize: 12,
  },
  noResults: {
    marginTop: 40,
    '& .MuiTableCell-root': {
      fontSize: 16,
    },
  },
}));

export default function Recommendations() {
  const classes = tableStyles();
  const [page, setPage] = React.useState(0);
  const [selectedBook, setState] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [myRecommendations, setMyRecommendations] = React.useState([]);
  const api = useApi();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const [isLoading, setIsLoading] = React.useState(false);
  const [openModalRec, setOpenModalRec] = React.useState(undefined);
  const [showRecommendBook, setShowRecommendBook] = React.useState(false);
  const [recommendedBook, setRecommendedBook] = React.useState({});

  React.useEffect(() => {
    async function initialize() {
      setIsLoading(true);
      try {
        setMyRecommendations(await api.fetchMyRecommendations());
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, [api]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleCloseModal = () => {
    setOpenModalRec(undefined);
  };

  const showRecommendationLink = recommendation => {
    setRecommendedBook(recommendation.book);
    setShowRecommendBook(true);
  };

  return (
    <div className={classes.tableWrapper}>
      {myRecommendations.length === 0 && !isLoading ? (
        <div className={classes.noResults}>
          <p>
            <strong>Recommend books and start earning rewards.</strong>
          </p>
          <p>Populate this space by making your first recommendation today!</p>
          <Button
            variant="outlined"
            className={classes.noResultsButton}
            href="#"
            onClick={() => history.push('/books/all')}
          >
            Browse Popular Books <ArrowForwardIcon />
          </Button>
        </div>
      ) : (
        <>
          <Table>
            {desktopView && (
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell padding="none" className={classes.header}>
                    <Box fontWeight="fontWeightBold" fontSize={12}>
                      TITLE
                    </Box>
                  </TableCell>
                  <TableCell
                    padding="none"
                    className={classes.header}
                    align="left"
                  >
                    <Box fontWeight="fontWeightBold" fontSize={12}>
                      AUTHOR
                    </Box>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
            )}
            {isLoading && (
              <TableBody>
                <TableCell padding="20" align="center" colSpan={5}>
                  <CircularProgress />
                </TableCell>
              </TableBody>
            )}
            {myRecommendations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableBody key={row.id}>
                  <TableRow className={classes.body}>
                    <TableCell align="center">
                      <Link to={`/book/${row.book.id}`}>
                        <img
                          src={row.book.coverUrl}
                          alt="Book"
                          className={classes.bookCover}
                        />
                      </Link>
                    </TableCell>
                    {desktopView ? (
                      <>
                        <TableCell
                          align="left"
                          className={classes.title}
                          padding="none"
                        >
                          <Link to={`/book/${row.book.id}`}>
                            {row.book.title}
                          </Link>
                        </TableCell>
                        <TableCell align="left" padding="none">
                          <Box className={classes.bookAuthor}>
                            {row.book.contributors
                              .filter(a => a.contributorType === 'AUTHOR')
                              .map(a => (
                                <span>
                                  {a.profileId ? (
                                    <Link
                                      to={`/fans/browse/authors/${a.profileId}`}
                                    >
                                      {a.displayName}
                                    </Link>
                                  ) : (
                                    a.displayName
                                  )}
                                </span>
                              ))}
                          </Box>
                        </TableCell>
                        <TableCell align="center" className={classes.viewBook}>
                          <Button
                            variant="outlined"
                            className={classes.graphButton}
                            href="#"
                            onClick={() => setOpenModalRec(row)}
                          >
                            See who clicked my link{' '}
                            <img
                              src="/img/icon-recommend.svg"
                              alt="See who clicked my link"
                            />
                          </Button>
                        </TableCell>
                        <TableCell align="center" className={classes.viewBook}>
                          <Button
                            className={classes.recommendButton}
                            href="#"
                            onClick={() => showRecommendationLink(row)}
                          >
                            Recommend Again
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell
                          colSpan={2}
                          align="left"
                          className={classes.text}
                          style={{ paddingLeft: 0 }}
                        >
                          <Box fontWeight="bold">{row.book.title}</Box>
                          <Box
                            style={{ marginBottom: 5 }}
                            className={classes.bookAuthor}
                          >
                            {row.book.contributors
                              .filter(a => a.contributorType === 'AUTHOR')
                              .map(a => (
                                <span className={classes.bookAuthorItem}>
                                  {a.profileId ? (
                                    <Link
                                      to={`/fans/browse/authors/${a.profileId}`}
                                    >
                                      {a.displayName}
                                    </Link>
                                  ) : (
                                    a.displayName
                                  )}
                                </span>
                              ))}
                          </Box>
                          <Button
                            variant="outlined"
                            className={classes.graphButton}
                            href="#"
                            onClick={() => setOpenModalRec(row)}
                          >
                            See who clicked my link{' '}
                            <img
                              src="/img/icon-recommend.svg"
                              alt="See who clicked my link"
                            />
                          </Button>
                          <Button
                            className={classes.recommendButton}
                            href="#"
                            onClick={() => showRecommendationLink(row)}
                          >
                            Recommend Again
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                  {selectedBook.id === row.book.id && (
                    <TableRow
                      key={row.id}
                      className={
                        selectedBook.id === row.book.id
                          ? classes.expansion
                          : classes.hidden
                      }
                    >
                      <ExpansionBox
                        rec={openModalRec}
                        myRecommendations={row}
                      />
                    </TableRow>
                  )}
                </TableBody>
              ))}
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={5}
                  count={myRecommendations.length}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage={desktopView ? 'Books per page' : 'Per page'}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>

          <RecommendBook
            book={recommendedBook}
            show={showRecommendBook}
            onCloseModal={() => setShowRecommendBook(false)}
          />
          {openModalRec && (
            <ExpansionBox rec={openModalRec} handleClose={handleCloseModal} />
          )}
        </>
      )}
    </div>
  );
}

const ExpansionBoxStyles = makeStyles(theme => ({
  dialog: {
    width: '824px',
    height: ' 620px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      margin: 10,
      padding: 20,
      width: '100%',
      height: 'auto',
      textAlign: 'center',
    },
  },
  expansionImage: {
    height: '447px',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
    },
  },
  TopText: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    lineHeight: '2',
    color: '#000000',
    fontStyle: 'italic',
    marginBottom: '2%',
  },
  userName: {
    fontSize: '16px',
    fontFamily: "'Rubik','sans-serif'",
    lineHeight: '1',
    color: '#000000',
  },
  rightBox: {
    marginLeft: '3%',
    marginRight: '5%',
  },
  username: {
    fontSize: '16px',
    fontFamily: "'Rubik','sans-serif'",
    lineHeight: '1',
    color: '#000000',
  },
  userWrap: {
    [theme.breakpoints.down('md')]: {
      flexFlow: 'row-reverse',
    },
  },
  userInfo: {
    [theme.breakpoints.down('md')]: {
      '&.MuiGrid-item': {
        position: 'relative',
        padding: '10px',
      },
    },
  },
  anonymous: {
    fontSize: '16px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
    fontWeight: '700',
  },
  anonymousMsg: {
    fontSize: '13px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      bottom: 4,
    },
  },
  box: {
    background: 'white',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 2px 0 rgba(0, 0, 0, 0.08)',
    borderRadius: '2px',
    borderColor: '#dcdd5c',
    marginTop: '3%',
    padding: '10px',
  },
  bottomText: {
    fontSize: '12px',
    fontFamily: "'Rubik','sans-serif'",
    lineHeight: '2',
    marginLeft: '2%',
    marginRight: '2%',
  },
  legendWrapper: {
    display: `flex`,
    marginTop: `5px`,
  },
  legendCircle: {
    border: `1px solid #999`,
    borderRadius: `50%`,
    height: `24px`,
    width: `24px`,
    marginRight: `8px`,
  },
  legendText: {
    fontSize: '16px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
    paddingTop: `4px`,
  },
  legendNumber: {
    fontSize: '18px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
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
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 0,
    minWidth: 0,
    [theme.breakpoints.up('md')]: {
      right: 15,
      top: 15,
    },
  },
}));

function ExpansionBox({ rec, handleClose }) {
  const classes = ExpansionBoxStyles();
  const api = useApi();
  const [treeData, setTreeData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
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

  useEffect(() => {
    async function fetchTreeData() {
      setIsLoading(true);
      try {
        const res = await api.fetchTreeViewForFan(rec.id);
        setTreeData(res);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTreeData();
  }, [rec]);

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={!!rec}
      onClose={handleClose}
    >
      <div>
        <Button className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </Button>
        <Grid item xs={12}>
          <Box fontSize={17}>
            {'Showing analytics for '}
            <Box component="span" fontWeight="bold">
              {rec.book.title}
            </Box>
          </Box>
          <Grid item xs={12} className={classes.userInfo}>
            <span className={classes.userName}>User Name: </span>
            <span className={classes.anonymous}>{treeData.username}</span>
            {treeData.username !== 'Anonymous' ? (
              ''
            ) : (
              <Box className={classes.anonymousMsg}>
                The user has opted to be anonymous
              </Box>
            )}
          </Grid>
          <Box className={classes.TopText}>
            The analytics data is as of {currentTime}. It might take up to 24
            hours to update the data.
          </Box>
        </Grid>
        {Object.keys(treeData).length > 0 && (
          <Grid container spacing={2}>
            <Grid container>
              <TreeDraw shape={treeData} />
            </Grid>
            <Grid container>
              <Grid item sm={6} lg={6}>
                <Box className={classes.legendWrapper}>
                  <Box
                    className={classes.legendCircle}
                    style={{ background: '#FF9900' }}
                  />
                  <Typography className={classes.legendText}>You</Typography>
                  <Tooltip title="This is you" placement="right">
                    <InfoIcon className={classes.iconInfo} />
                  </Tooltip>
                </Box>
                <Box className={classes.legendWrapper}>
                  <Box
                    className={classes.legendCircle}
                    style={{ background: 'blue' }}
                  />
                  <Typography className={classes.legendText}>
                    Purchase
                  </Typography>
                  <Tooltip
                    title="Someone has bought the book based on your recommendation"
                    placement="right"
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
                    title="Someone has viewed the book details based on your recommendation but did not buy the book"
                    placement="right"
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
                    title="Number of people who are recommending the book based on your recommendation"
                    placement="right"
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
                    title="Number of purchases resulting from your recommendation"
                    placement="right"
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
                    title="Number of users who viewed the book details based on your recommendation"
                    placement="right"
                  >
                    <InfoIcon className={classes.iconInfo} />
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </Dialog>
  );
}

ExpansionBox.propTypes = {
  treeData: PropTypes.objectOf(PropTypes.any).isRequired,
  myRecommendations: PropTypes.objectOf(PropTypes.any).isRequired,
};
