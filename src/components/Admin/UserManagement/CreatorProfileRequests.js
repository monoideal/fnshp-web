import React, { useEffect, useState } from 'react';
import {
  Grid,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Paper,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import FancyTable from 'components/shared/FancyTable';
import { useApi } from 'api/';
import history from 'lib/history';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    padding: theme.spacing(3, 2),
  },
  topItem: {
    marginBottom: '4%',
  },
  title: {
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontSize: '22px',
    fontWeight: 'bold',
  },
  addBtn: {
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '2%',
    boxShadow: 'none',
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
  },
  tabs: {
    background: theme.palette.grey.main,
    fontWeight: 'bold',
  },
  indicator: {
    background: theme.palette.black.main,
  },
  link: {
    color: '#003a99',
    textDecoration: 'underline',
  },
  statusApproved: {
    background: theme.palette.green.main,
    color: theme.palette.darkPurple.main,
    borderColor: theme.palette.darkPurple.main,
    borderWidth: 2,
  },
  statusOther: {
    background: theme.palette.white.main,
    color: theme.palette.darkPurple.main,
    borderColor: theme.palette.darkPurple.main,
    borderWidth: 2,
  },
  reject: {
    color: theme.palette.red.main,
  },
  hover: {
    cursor: 'pointer',
  },
  loadingPaper: {
    padding: 50,
    textAlign: 'center',
  },
}));

export default function CreatorProfileRequests() {
  const classes = useStyles();
  const api = useApi();
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState('PENDING');
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuDocument, setMenuDocument] = useState(null);
  const [allData, setAllData] = React.useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const selectedTaba = selectedTab === 'ALL' ? '' : selectedTab;
        const requests = await api.fetchAdminBookProfileRequests(selectedTaba);
        setAllData(requests);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [api, selectedTab]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleClickMenu = doc => event => {
    setMenuDocument(doc);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const updateDoc = async status => {
    const allDataWithoutUpdated = allData.filter(
      obj =>
        obj.alId !== menuDocument.alId &&
        obj.profile.id !== menuDocument.profile.id &&
        obj.book.id !== menuDocument.book.id,
    );
    setAllData(allDataWithoutUpdated);
    handleCloseMenu();
    try {
      await api.adminUpdateProfileRequestStatus(
        menuDocument.profile.id,
        menuDocument.book.id,
        menuDocument.alId,
        status,
        status === 'REJECTED' ? 'Rejected by admin.' : '',
      );
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong updating this document');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const tableColumns = [
    { title: 'Book Title', field: 'book' },
    { title: 'Name', field: 'profile' },
    { title: 'UserId', field: 'user' },
    { title: 'Contributor Type', field: 'contributorType' },
    { title: 'Status', field: 'status' },
    { title: 'Request Date', field: 'requestDate' },
    { title: 'Links', field: 'links' },
    { title: '', field: 'menu' },
  ];

  const tableData = allData.map(doc => {
    const { book, profile, contributorType, status, createdAt } = doc;

    return {
      book: book.title,
      profile: profile.displayName,
      user: profile.userId,
      contributorType,
      status,
      requestDate: createdAt ? moment.unix(createdAt).format('Y/MM/DD') : 'N/A',
      links: (
        <ul>
          <li>
            <Link
              className={classes.link}
              target="_blank"
              to={`/admin/catalog/view/${book.id}`}
            >
              Book
            </Link>
          </li>
          <li>
            <Link
              className={classes.link}
              target="_blank"
              to={`/fans/browse/authors/${profile.id}`}
            >
              Public
            </Link>
          </li>
          <li>
            <Link
              className={classes.link}
              target="_blank"
              to={`/admin/rightholder/${profile.userId}`}
            >
              User
            </Link>
          </li>
        </ul>
      ),
      menu: (
        <IconButton onClick={handleClickMenu(doc)}>
          <MoreVertIcon />
        </IconButton>
      ),
    };
  });

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.topItem}
        >
          <Typography className={classes.title}>
            Creator Profile Requests
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} style={{ textAlign: 'right' }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => history.push(`/admin/book-request`)}
            style={{ fontWeight: 'bold' }}
          >
            Add profile to book
          </Button>
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static" className={classes.appBar}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              className={classes.activeTab}
              classes={{ indicator: classes.indicator }}
            >
              <Tab value="PENDING" label="Pending" className={classes.tabs} />
              <Tab value="APPROVED" label="Approved" className={classes.tabs} />
              <Tab value="REJECTED" label="Rejected" className={classes.tabs} />
              <Tab value="ALL" label="All" className={classes.tabs} />
            </Tabs>
          </AppBar>
          {loading ? (
            <Paper className={classes.loadingPaper}>
              <CircularProgress />
            </Paper>
          ) : (
            <FancyTable
              columns={tableColumns}
              data={tableData}
              style={{ padding: theme.spacing(2) }}
              options={{
                exportButton: false,
                showTitle: false,
                pageSize: 10,
              }}
            />
          )}
        </Grid>
        <Menu
          id="action"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {menuDocument && menuDocument.status !== 'APPROVED' && (
            <MenuItem onClick={() => updateDoc('APPROVED')}>Approve</MenuItem>
          )}
          {menuDocument && menuDocument.status !== 'REJECTED' && (
            <MenuItem
              className={classes.reject}
              onClick={() => updateDoc('REJECTED')}
            >
              Reject
            </MenuItem>
          )}
        </Menu>
      </Grid>
    </Container>
  );
}
