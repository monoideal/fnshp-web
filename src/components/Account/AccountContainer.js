import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container } from '@material-ui/core';
import PageHeader from 'components/Account/PageHeader';
import StyledButton from 'components/shared/StyledButton';
import UploadKYC from 'components/Account/UploadKYC';
import PaperHeader from 'components/Account/PaperHeader';
import StatusUpdates from 'components/Account/StatusUpdates';
import OrganizationUserProfile from 'components/Account/OrganizationUserProfile';
import CreatorUserProfile from 'components/Account/CreatorUserProfile';
import { DeactivateAccount } from 'components/Fans/AccountDetails';
import { useApi } from 'api/';
import _, { isEmpty, set, get } from 'lodash';
import { toast } from 'react-toastify';
import moment from 'moment';
import { isEmptyValues } from 'util/helpers';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '20px 30px 40px 30px',
    maxWidth: '1000px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '25px',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  containerFormSubmit: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  deactivateAccount: {
    maxWidth: '1000px',
  },
  accountId: {
    margin: '0 0 10px 5px',
  },
}));

const determineUserType = profileState => {
  if (profileState.fan) {
    return 'fan';
  }
  if (profileState.creator) {
    return 'creator';
  }
  if (profileState.organization) {
    return 'organization';
  }
  return '';
};
const reducer = (profileState, action) => {
  switch (action.type) {
    case 'form_edit': {
      const { path, value } = action.payload;
      const toUpdate = { ...profileState };
      set(toUpdate, [determineUserType(profileState), ...path], value);

      /*  if (path[0] === 'dateOfBirth') {
        const dateTochange = new Date(toUpdate.creator.dateOfBirth);
        const newDate = dateTochange.setDate(dateTochange.getDate() + 1);
        const parsedDOBVal = dateToTimestamp(newDate);
        toUpdate.creator.dateOfBirth = newDate;
        if (!_.isNaN(parsedDOBVal)) {
          toUpdate.creator.dateOfBirth = parsedDOBVal;
        }
      }
      if (path[0] === 'dateOfDeath') {
        const dateTochange = new Date(toUpdate.creator.dateOfDeath);
        const newDate = dateTochange.setDate(dateTochange.getDate() + 1);
        toUpdate.creator.dateOfDeath = newDate;
        const parsedDODVal = dateToTimestamp(toUpdate.creator.dateOfDeath);
        if (!_.isNaN(parsedDODVal)) {
          toUpdate.creator.dateOfDeath = parsedDODVal;
        }
      } */
      if (path[0] === 'dateOfBirth') {
        toUpdate.creator.dateOfBirth =
          value && value !== '' ? moment.utc(value, 'YYYY-MM-DD').unix() : 0;
      }
      if (path[0] === 'dateOfDeath') {
        toUpdate.creator.dateOfDeath =
          value && value !== '' ? moment.utc(value, 'YYYY-MM-DD').unix() : 0;
      }
      return toUpdate;
    }
    case 'form_add_section': {
      const toUpdate = { ...profileState };
      const field = get(
        toUpdate,
        [determineUserType(profileState), action.payload],
        [{}],
      );
      set(
        toUpdate,
        [determineUserType(profileState), action.payload],
        field.concat([{}]),
      );
      return toUpdate;
    }
    case 'form_delete_section': {
      const toUpdate = { ...profileState };
      let field = get(
        toUpdate,
        [determineUserType(profileState), action.payload],
        [{}],
      );
      field = _.take(field, Math.max(1, field.length - 1));
      set(toUpdate, [determineUserType(profileState), action.payload], field);
      return toUpdate;
    }
    case 'upload_file': {
      const toUpdate = { ...profileState };
      set(
        toUpdate,
        `${determineUserType(profileState)}.avatarUrlKey`,
        action.payload,
      );
      return toUpdate;
    }
    case 'delete_avatarUrl': {
      const toUpdate = { ...profileState };
      set(
        toUpdate,
        `${determineUserType(profileState)}.avatarUrlKey`,
        action.payload,
      );
      return toUpdate;
    }
    case 'fetch_profile': {
      return action.payload;
    }
    default:
      throw new Error('invalid action for dispatch');
  }
};

export default function AccountContainer() {
  const classes = useStyles();
  const api = useApi();
  const [profileState, dispatch] = React.useReducer(reducer, {});
  const { fanshipUser } = React.useContext(AppContext);

  React.useEffect(() => {
    async function initialize() {
      try {
        dispatch({ type: 'fetch_profile', payload: await api.fetchProfile() });
      } catch (err) {
        console.log(err);
      }
    }
    initialize();
  }, [api]);

  async function handleSubmit() {
    try {
      const creatorData = _.pick(profileState, 'creator');
      const finaObj = _.assign(
        {},
        { form: { ...creatorData.creator, ...profileState } },
      );
      await api.createProfile(finaObj);
      dispatch({ type: 'fetch_profile', payload: await api.fetchProfile() });
      toast.success('Successfully updated profile');
    } catch (err) {
      console.log(err);
      toast.error('Failed to update profile');
    }
  }
  async function handleCancel() {
    try {
      dispatch({ type: 'fetch_profile', payload: await api.fetchProfile() });
      toast.success('Restored the profile');
    } catch (err) {
      console.log(err);
    }
  }
  const isDisabled = () => {
    const profile = profileState.creator;
    if (
      isEmptyValues(profile.firstName) ||
      isEmptyValues(profile.lastName) ||
      isEmptyValues(profile.email) ||
      isEmptyValues(profile.paymentEmail) ||
      isEmptyValues(profile.phoneNumber) ||
      profile.dateOfBirth === 0
    ) {
      return true;
    }
    return false;
  };
  async function handleOrgFormEdit() {
    try {
      const orgData = _.pick(profileState, 'organization');
      const finaObj = { ...orgData.organization, ...profileState };
      await api.updateFanProfile(finaObj);
      toast.success('Successfully updated the profile');
    } catch (err) {
      console.log(err);
      toast.error('Failed to update the profile');
    }
  }
  const profileType = determineUserType(profileState);
  const [chkBox, setChkBox] = React.useState(false);
  const [chkBoxArr, setChkBoxArr] = React.useState([]);

  function handleChkBox(value, index) {
    const chkItem = chkBoxArr;
    chkItem[index] = value;
    setChkBoxArr(chkItem);

    // check if at least one checkbox was checked
    if (chkItem.length > 1) {
      const checked = chkItem.some(c => c === true);
      setChkBox(checked);
    } else {
      setChkBox(value);
    }
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <PageHeader label="My Account" status={profileState.isVerified || ''} />
      <div className={classes.accountId}>
        Your account ID: {fanshipUser && fanshipUser.id}
      </div>
      {profileType === 'organization' ? (
        <>
          <Paper className={classes.paper}>
            <OrganizationUserProfile
              formId="org-profile"
              formState={profileState.organization || {}}
              dispatch={dispatch}
              handleSubmit={handleOrgFormEdit}
              handleChkBox={handleChkBox}
            />
            <div className={classes.containerFormSubmit}>
              <StyledButton onClick={handleCancel}>CANCEL</StyledButton>
              <StyledButton onClick={handleOrgFormEdit}>SAVE</StyledButton>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <PaperHeader label="Organization Status Update" />
            {/* <SuccessChip label="Approved" style={{ alignSelf: 'flex-end' }} /> */}
            <UploadKYC />
          </Paper>

          <Paper className={classes.paper}>
            <PaperHeader label="Status Updates" />
            <StatusUpdates />
          </Paper>
        </>
      ) : (
        !isEmpty(profileState) && (
          <>
            <Paper className={classes.paper}>
              <CreatorUserProfile
                showProfilePic
                formState={profileState.creator}
                dispatch={dispatch}
              />
              <div className={classes.containerFormSubmit}>
                <StyledButton onClick={handleCancel}>CANCEL</StyledButton>
                <StyledButton onClick={handleSubmit} disabled={isDisabled()}>
                  SAVE
                </StyledButton>
              </div>
            </Paper>
            <Paper className={classes.paper}>
              <PaperHeader label="Status Updates" />
              <StatusUpdates
                userHistory={profileState.userHistory}
                isVerified={profileState.isVerified}
              />
            </Paper>
          </>
        )
      )}
      <Paper className={classes.deactivateAccount}>
        <DeactivateAccount type={determineUserType(profileState)} />
      </Paper>
    </Container>
  );
}
