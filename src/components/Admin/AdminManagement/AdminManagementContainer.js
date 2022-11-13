import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Tabs, Tab } from '@material-ui/core';
import { useApi } from 'api/';
import DeactivateAlert from 'components/Admin/AdminManagement/DeactivateAlert';
import PromoteAlert from 'components/Admin/AdminManagement/PromoteAlert';
import AdminUsersTable from 'components/Admin/AdminManagement/AdminUsersTable';
import AdminNewUsersTable from 'components/Admin/AdminManagement/AdminNewUsersTable';
import SuccessAlert from 'components/Admin/AdminManagement/SuccessAlert';
import { get, orderBy } from 'lodash';
import { AppContext } from 'components/AppContext';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    padding: '2% 1% 1px 2%',
  },
  title: {
    fontSize: '22px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  itemTwo: {
    marginTop: '4%',
  },
  body: {
    width: '100%',
    background: theme.palette.white.main,
    padding: '2.5%',
  },
  table: {
    fontSize: '14px',
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
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
}));

export default function AdminManagementContainer() {
  const classes = useStyles();
  const api = useApi();
  const { fanshipUser } = React.useContext(AppContext);

  const [loggedInUser, setLoggedInUser] = React.useState({
    email: '',
    userId: '',
  });

  const [allTabSearch, setallTabSearch] = React.useState('');
  const [resetAllTabData, setResetAllTabData] = React.useState([]);

  const [newTabSearch, setNewTabSearch] = React.useState('');
  const [resetNewTabData, setResetNewTabData] = React.useState([]);

  const [deactivateAlert, openDeactivateAlert] = React.useState(false);
  const [promoteAlert, openPromoteAlert] = React.useState(false);
  const [successAlert, openSuccess] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedUser, setSelectedUser] = React.useState({});

  const [adminUsers, setAdminUsers] = React.useState([]);
  const [adminNewUsers, setAdminNewUsers] = React.useState([]);

  const initialize = React.useCallback(async () => {
    const initialFilterResult = [];
    const newAdminUsers = [];
    try {
      await api
        .fetchAdminAllUsersAdmins()
        .then(success => {
          for (let i = 0; i < success.length; i++) {
            if (success[i].isVerified !== 'pending' || success[i].isSuspended) {
              initialFilterResult.push(success[i]);
            } else {
              newAdminUsers.push(success[i]);
            }
          }
          const sortedAllUsers = orderBy(
            initialFilterResult,
            ['isVerified'],
            ['asc'],
          );
          setAdminUsers(sortedAllUsers);
          setResetAllTabData(sortedAllUsers);

          const sortedNewUsers = orderBy(
            newAdminUsers,
            ['admin.createdAt'],
            ['desc'],
          );
          setAdminNewUsers(sortedNewUsers);
          setResetNewTabData(sortedNewUsers);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  React.useEffect(() => {
    initialize();
  }, [api]);

  React.useEffect(() => {
    const profile = fanshipUser;
    if (profile.admin) {
      const { email, userId } = profile.admin;
      setLoggedInUser({ email, userId });
    }
  }, []);

  // For now searching on the basis of name
  const handleAllTabSearch = searchValue => {
    const searchResult = [];
    if (searchValue.target.value.length > 0) {
      for (let i = 0; i < resetAllTabData.length; i++) {
        if (
          `${resetAllTabData[i].admin[0].first_name} ${resetAllTabData[i].admin[0].last_name}`
            .toLowerCase()
            .includes(searchValue.target.value.toLowerCase())
        ) {
          searchResult.push(resetAllTabData[i]);
        }
      }
      setAdminUsers(searchResult);
    } else {
      setAdminUsers(resetAllTabData);
    }
    setallTabSearch(searchValue.target.value);
  };

  // For now searching on the basis of name
  const handleNewTabSearch = searchValue => {
    const searchResult = [];
    if (searchValue.target.value.length > 0) {
      for (let i = 0; i < resetNewTabData.length; i++) {
        if (
          `${resetNewTabData[i].admin[0].first_name} ${resetNewTabData[i].admin[0].last_name}`
            .toLowerCase()
            .includes(searchValue.target.value.toLowerCase())
        ) {
          searchResult.push(resetNewTabData[i]);
        }
      }
      setAdminNewUsers(searchResult);
    } else {
      setAdminNewUsers(resetNewTabData);
    }
    setNewTabSearch(searchValue.target.value);
  };

  const handleCloseAlert = alertName => {
    if (alertName === 'deactivateAlert') {
      openDeactivateAlert(false);
    } else if (alertName === 'promoteAlert') {
      openPromoteAlert(false);
    } else {
      openSuccess(false);
      setSelectedUser({});
    }
  };

  const handleMenuClick = (userObj, alertName) => {
    setSelectedUser(userObj);
    return alertName === 'Deactivate'
      ? openDeactivateAlert(true)
      : openPromoteAlert(true);
  };

  const handleSuccessAlert = userObj => {
    setSelectedUser(userObj);
    handleCloseAlert('promoteAlert');
    openSuccess(true);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleUpdateUsersTable = () => {
    initialize();
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.title}>
          Admin Management
        </Grid>
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            className={classes.activeTab}
            classes={{ indicator: classes.indicator }}
            aria-label="simple tabs example"
          >
            <Tab label="All" className={classes.tabs} />
            <Tab label="New" className={classes.tabs} />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid container spacing={0} className={classes.body}>
        {selectedTab !== 1 ? (
          <>
            <AdminUsersTable
              openAlert={(object, alertName) =>
                handleMenuClick(object, alertName)
              }
              usersData={adminUsers}
              handleSearch={handleAllTabSearch}
              search={allTabSearch}
              loggedInUser={loggedInUser}
            />
          </>
        ) : (
          <>
            <AdminNewUsersTable
              openAlert={(object, alertName) =>
                handleMenuClick(object, alertName)
              }
              usersData={adminNewUsers}
              handleSearch={handleNewTabSearch}
              search={newTabSearch}
            />
          </>
        )}
        <>
          <DeactivateAlert
            open={deactivateAlert}
            close={() => handleCloseAlert('deactivateAlert')}
            selectedUser={selectedUser.selectedUser}
            updateUsersTable={handleUpdateUsersTable}
          />
          <PromoteAlert
            open={promoteAlert}
            close={() => handleCloseAlert('promoteAlert')}
            selectedUser={selectedUser.selectedUser}
            success={handleSuccessAlert}
            updateUsersTable={handleUpdateUsersTable}
          />
          <SuccessAlert
            open={successAlert}
            close={() => handleCloseAlert('successAlert')}
            selectedUser={selectedUser.selectedUser}
          />
        </>
      </Grid>
    </>
  );
}
