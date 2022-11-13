import React, { useEffect, useState } from 'react';
import {
  Grid,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Container,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import _ from 'lodash';
import FancyTable from 'components/shared/FancyTable';
import { useApi } from 'api/';
import history from 'lib/history';

const [PENDING, APPROVED, REJECTED, ALL] = [0, 1, 2, 3];

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
}));

export default function RightHoldersContainer() {
  const classes = useStyles();
  const api = useApi();
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(PENDING);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuDocument, setMenuDocument] = useState(null);

  const [allData, setAllData] = React.useState([]);
  const [pendingData, setPendingData] = React.useState([]);
  const [approvedData, setApprovedData] = React.useState([]);
  const [rejectedData, setRejectedData] = React.useState([]);

  useEffect(() => {
    (async () => {
      try {
        const documents = await api.fetchKyc();
        setAllData(documents);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [api]);

  useEffect(() => {
    setPendingData(allData.filter(d => d.status === 'pending'));
    setApprovedData(allData.filter(d => d.status === 'approved'));
    setRejectedData(allData.filter(d => d.status === 'denied'));
  }, [allData]);

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
    const data = _.keyBy(allData, 'userId');
    data[menuDocument.userId].status = status;
    setAllData(Object.values(data));
    handleCloseMenu();
    try {
      await api.updateUserVerification(menuDocument.userId, status);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong updating this document');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const tableColumns = [
    { title: 'ID', field: 'userId' },
    { title: 'Name', field: 'name' },
    { title: 'Request Date', field: 'requestDate' },
    { title: 'Request Type', field: 'requestType' },
    { title: 'Document', field: 'document' },
    { title: 'Links', field: 'links' },
    { title: '', field: 'menu' },
  ];

  if (selectedTab === ALL) {
    tableColumns.splice(tableColumns.length - 1, 0, {
      title: 'Status',
      field: 'status',
    });
  }

  const tableData = {
    [PENDING]: pendingData,
    [APPROVED]: approvedData,
    [REJECTED]: rejectedData,
    [ALL]: allData,
  }[selectedTab].map(doc => {
    const {
      userId,
      isOrganization,
      limitedAccess,
      name,
      createdAt,
      type,
      kycDocs,
      status,
    } = doc;

    //get the actual created date
    let kycCreatedAt;
    // check if there were documents uploaded
    if (kycDocs.length > 0) {
      kycCreatedAt = kycDocs[0].createdAt;
    }

    return {
      userId,
      name: `${name} ${limitedAccess ? '(Limited)' : ''}`,
      requestDate: kycCreatedAt
        ? moment.unix(kycCreatedAt).format('Y/MM/DD')
        : 'N/A',
      requestType: _.capitalize(type),
      links: (
        <ul>
          <li>
            <Link
              className={classes.link}
              target="_blank"
              to={`/admin/rightholder/${userId}`}
            >
              User
            </Link>
          </li>
        </ul>
      ),
      status: (
        <Chip
          label={status}
          size="small"
          color="primary"
          variant={status === 'approved' ? 'default' : 'outlined'}
          className={
            status === 'approved' ? classes.statusApproved : classes.statusOther
          }
          onClick={() => history.push(`/admin/rightholder/${userId}`)}
        />
      ),
      document:
        kycDocs &&
        kycDocs.map((kyc, key) => (
          <Grid item xs={12} key={key}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={kyc.url}
              className={classes.link}
            >
              {_.startCase(kyc.name)}
            </a>
          </Grid>
        )),
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
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.topItem}
        >
          <Typography className={classes.title}>Rightsholders</Typography>
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static" className={classes.appBar}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              className={classes.activeTab}
              classes={{ indicator: classes.indicator }}
              aria-label="simple tabs example"
            >
              <Tab label="Pending" className={classes.tabs} />
              <Tab label="Approved" className={classes.tabs} />
              <Tab label="Rejected" className={classes.tabs} />
              <Tab label="All" className={classes.tabs} />
            </Tabs>
          </AppBar>
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
        </Grid>
        <Menu
          id="action"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {menuDocument && menuDocument.status !== 'approved' && (
            <MenuItem onClick={() => updateDoc('approved')}>Approve</MenuItem>
          )}
          {menuDocument && menuDocument.status !== 'denied' && (
            <MenuItem
              className={classes.reject}
              onClick={() => updateDoc('denied')}
            >
              Reject
            </MenuItem>
          )}
        </Menu>
      </Grid>
    </Container>
  );
}
