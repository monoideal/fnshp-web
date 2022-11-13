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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import _ from 'lodash';

import FancyTable from 'components/shared/FancyTable';
import { useApi } from 'api/';

const [ACTIVE, SUSPENDED, ALL] = [0, 1, 2];

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
  statusActive: {
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
  suspend: {
    color: theme.palette.red.main,
  },
}));

export default function RightHoldersContainer() {
  const classes = useStyles();
  const api = useApi();
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(ACTIVE);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuFan, setMenuFan] = useState(null);

  const [allData, setAllData] = React.useState([]);
  const [activeData, setActiveData] = React.useState([]);
  const [suspendedData, setSuspendedData] = React.useState([]);

  useEffect(() => {
    (async () => {
      try {
        const initialFilterResult = await api.fetchAdminAllUsersFans();
        setAllData(initialFilterResult);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [api]);

  useEffect(() => {
    setActiveData(allData.filter(d => !d.isSuspended));
    setSuspendedData(allData.filter(d => d.isSuspended));
  }, [allData]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleClickMenu = fan => event => {
    setMenuFan(fan);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const updateFanSuspension = async isSuspended => {
    const data = _.keyBy(allData, 'id');
    data[menuFan.id].isSuspended = isSuspended;
    setAllData(Object.values(data));
    handleCloseMenu();
    try {
      await api.updateFanStatus(menuFan.id, isSuspended);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong updating this fan');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const tableColumns = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Username', field: 'username' },
    { title: 'Last Active', field: 'lastActive' },
    { title: '', field: 'menu' },
  ];

  if (selectedTab === ALL) {
    tableColumns.splice(tableColumns.length - 1, 0, {
      title: 'Status',
      field: 'status',
    });
  }

  const tableData = {
    [ACTIVE]: activeData,
    [SUSPENDED]: suspendedData,
    [ALL]: allData,
  }[selectedTab].map(user => {
    const { fan, isSuspended } = user;
    const { id, lastActive } = user;
    const firstName = fan[0].first_name;
    const lastName = fan[0].last_name;
    const { username } = fan[0];
    const status = isSuspended ? 'suspended' : 'active';
    return {
      id,
      name: `${firstName} ${lastName}`,
      username,
      lastActive: moment.unix(lastActive).format('YYYY/MM/DD'),
      status: (
        <Chip
          label={status}
          size="small"
          color="primary"
          variant={isSuspended ? 'outlined' : 'default'}
          className={isSuspended ? classes.statusOther : classes.statusActive}
        />
      ),
      menu: (
        <IconButton onClick={handleClickMenu(user)}>
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
          <Typography className={classes.title}>Fans</Typography>
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
              <Tab label="Active" className={classes.tabs} />
              <Tab label="Suspended" className={classes.tabs} />
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
          {menuFan && !menuFan.isSuspended && (
            <MenuItem
              onClick={() => updateFanSuspension(true)}
              className={classes.suspend}
            >
              Suspend Account
            </MenuItem>
          )}
          {menuFan && !!menuFan.isSuspended && (
            <MenuItem onClick={() => updateFanSuspension(false)}>
              Restore Account
            </MenuItem>
          )}
        </Menu>
      </Grid>
    </Container>
  );
}
