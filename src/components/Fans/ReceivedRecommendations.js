import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Grid, Button } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import Popover from '@material-ui/core/Popover';
import { useApi } from 'api/';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import RecommendBook from 'components/Fans/RecommendBook';

const useStyles = makeStyles(theme => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  header: {
    fontSize: '12px',
    fontFamily: "'Rubik','sans-serif'",
    color: '#000000',
    fontWeight: '500',
  },
  icon: {
    width: '20px',
    height: '20px',
    objectFit: 'scale-down',
    paddingRight: '5px',
    verticalAlign: 'middle',
  },
  text: {
    fontWeight: 'bold',
    '& a:hover': {
      textDecoration: 'underline',
    },
  },
  popover: {
    fontSize: '13px',
    fontFamily: "'Rubik','sans-serif'",
    lineHeight: '1',
    color: '#2a3d46',
    padding: '20px',
    width: '250px',
  },
  recommendButton: {
    width: '100%',
    padding: '8px 6px',
    color: theme.palette.darkPurple.main,
    borderColor: theme.palette.black.main,
    letterSpacing: 0,
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'none',
  },
  noResults: {
    '& .MuiTableCell-root': {
      fontSize: 16,
    },
  },
  socialLinks: {
    '& img': {
      paddingRight: 12,
    },
    '& div': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5,
    },
  },
  bookAuthor: {
    '& span:after': { content: '", "' },
    '& span:last-child:after': { content: '""' },
    '& a': {
      textDecoration: 'underline',
    },
  },
}));

export default function ReceivedRecommendations() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [message, setPopOverMsg] = React.useState({});
  const open = Boolean(anchorEl);
  const [recommendations, setRecommendations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showRecommendBook, setShowRecommendBook] = React.useState(false);
  const [recommendedBook, setRecommendedBook] = React.useState({});

  const api = useApi();

  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  React.useEffect(() => {
    async function initialize() {
      setIsLoading(true);
      try {
        setRecommendations(await api.fetchReceivedRecommendations());
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
    setPage(0);
  };

  const handlePopoverOpen = (event, msg) => {
    setAnchorEl(event.currentTarget);
    setPopOverMsg({
      popOverMsg: msg,
    });
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const showRecommendationLink = recommendation => {
    setRecommendedBook(recommendation);
    setShowRecommendBook(true);
  };

  return (
    <div className={classes.tableWrapper}>
      {recommendations.length === 0 && !isLoading ? (
        <div className={classes.noResults}>
          <p>
            <strong>
              Start discovering great books you might not hear about elsewhere.
            </strong>
          </p>
          <p>
            Invite your friends and followers to join Fanship and recommend
            their favourites to you!
          </p>
          <div className={classes.socialLinks}>
            <a href="https://twitter.com/FanshipCA">
              <div>
                <img
                  width="30"
                  src="/img/social_media/twitter.png"
                  alt="Twitter"
                />
                @FanshipCA
              </div>
            </a>
            <a href="https://www.facebook.com/FanshipCA">
              <div>
                <img
                  width="30"
                  src="/img/social_media/facebook.png"
                  alt="Facebook"
                />
                FanshipCA
              </div>
            </a>
            <a href="https://www.instagram.com/fanshipca/?hl=en">
              <div>
                <img
                  width="30"
                  src="/img/social_media/instagram.png"
                  alt="Instagram"
                />
                fanshipca
              </div>
            </a>
          </div>
        </div>
      ) : (
        <Table>
          {desktopView ? (
            <>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell padding="0 16px" className={classes.header}>
                    <Box fontWeight="fontWeightBold" fontSize={12}>
                      TITLE
                    </Box>
                  </TableCell>
                  <TableCell
                    padding="0 16px"
                    className={classes.header}
                    align="left"
                  >
                    <Box fontWeight="fontWeightBold" fontSize={12}>
                      AUTHOR
                    </Box>
                  </TableCell>
                  <TableCell
                    padding="0 16px"
                    className={classes.header}
                    align="left"
                  >
                    <Box fontWeight="fontWeightBold" fontSize={12}>
                      RECOMMENDED BY
                    </Box>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
            </>
          ) : (
            ''
          )}
          {isLoading && (
            <TableBody>
              <TableCell padding="20" align="center" colSpan={5}>
                <CircularProgress />
              </TableCell>
            </TableBody>
          )}
          <TableBody>
            {recommendations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const icon = row.didPurchase
                  ? '/img/recommendations/flag.png'
                  : '/img/recommendations/book.png';
                const popoverMessage = row.didPurchase
                  ? 'The user has purchased the book from Fanship.'
                  : 'The user has read the book.';
                return desktopView ? (
                  <TableRow key={index} className={classes.body}>
                    <TableCell align="center" className={classes.img}>
                      <Link
                        to={`/book/${row.id}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <img src={row.coverUrl} height="75px" alt="Book" />
                      </Link>
                    </TableCell>
                    <TableCell align="left" className={classes.text}>
                      <Link
                        to={`/book/${row.id}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {row.title}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <Box className={classes.bookAuthor}>
                        {row.contributors
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
                    <TableCell align="left" onClick={handlePopoverClose}>
                      <img
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={event =>
                          handlePopoverOpen(event, popoverMessage)
                        }
                        className={classes.icon}
                        src={icon}
                        alt="recommended icon"
                      />
                      {row.recommenderUsername}
                    </TableCell>
                    <TableCell align="left" className={classes.viewBook}>
                      <Button
                        className={classes.recommendButton}
                        variant="outlined"
                        href="#"
                        onClick={() => showRecommendationLink(row)}
                      >
                        Recommend
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    <TableRow key={index} className={classes.body}>
                      <TableCell
                        align="left"
                        colSpan="2"
                        style={{ paddingBottom: 0, border: 'none' }}
                      >
                        <Box
                          fontSize="14px"
                          style={{
                            color: '#555',
                            fontSize: '0.8rem',
                            marginBottom: '-5px',
                          }}
                        >
                          <img
                            className={classes.icon}
                            src={icon}
                            style={{ marginTop: '-5px' }}
                            alt="recommended icon"
                          />
                          <strong>{row.recommenderUsername}</strong> recommended
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow key={index} className={classes.body}>
                      <TableCell align="center" width="75">
                        <Link
                          to={`/book/${row.id}`}
                          style={{ cursor: 'pointer' }}
                        >
                          <img src={row.coverUrl} height="75px" alt="Book" />
                        </Link>
                      </TableCell>
                      <TableCell align="left" style={{ paddingLeft: 0 }}>
                        <Grid
                          container
                          direction="column"
                          justify="space-between"
                        >
                          <Grid item>
                            <Box fontSize="14px" fontWeight="bold">
                              <Link
                                to={`/book/${row.id}`}
                                style={{ cursor: 'pointer' }}
                              >
                                {row.title}
                              </Link>
                            </Box>
                            <Box
                              fontSize="14px"
                              style={{ marginBottom: 5 }}
                              className={classes.bookAuthor}
                            >
                              by{' '}
                              {row.contributors
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
                            <Button
                              className={classes.recommendButton}
                              variant="outlined"
                              href="#"
                              onClick={() => showRecommendationLink(row)}
                            >
                              Recommend
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={5}
                count={recommendations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
          <RecommendBook
            book={recommendedBook}
            show={showRecommendBook}
            onCloseModal={() => setShowRecommendBook(false)}
          />

          <Popover
            id="mouse-over-popover"
            open={open}
            elevation={1}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <div className={classes.popover}>{message.popOverMsg}</div>
          </Popover>
        </Table>
      )}
    </div>
  );
}
