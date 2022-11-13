import React, { useEffect, useState, useReducer } from 'react';
import _, { set, get } from 'lodash';
import { Grid } from '@material-ui/core';
import ReactGA from 'react-ga';

import InlineLoader from 'components/shared/InlineLoader';
import { useApi } from 'api/';
import OrganizationUserProfile from 'components/Account/OrganizationUserProfile';
import StyledButton from 'components/shared/StyledButton';
import UploadKYC from 'components/Account/UploadKYC';
import VerifyEmail from './components/VerifyEmail';
import AccessGate from './components/AccessGate';
import PendingApproval from './components/PendingApproval';
import { AppContext } from 'components/AppContext';

const OnboardingOrganization = () => {
  const { fanshipUser } = React.useContext(AppContext);
  const api = useApi();
  const [hasPassedGate, setHasPassedGate] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [profile, setProfile] = useState(fanshipUser.organization);
  const [hasKycDocs, setHasKycDocs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'form_edit': {
        const { path, value } = action.payload;
        const toUpdate = { ...state };
        set(toUpdate, [...path], value);
        return toUpdate;
      }
      case 'form_add_section': {
        const toUpdate = { ...state };
        const field = get(toUpdate, [action.payload], [{}]);
        set(toUpdate, [action.payload], field.concat([{}]));
        return toUpdate;
      }
      case 'form_delete_section': {
        const toUpdate = { ...state };
        let field = get(toUpdate, [action.payload], [{}]);
        field = _.take(field, Math.max(1, field.length - 1)); // Always leave a minimum of one
        set(toUpdate, [action.payload], field);
        return toUpdate;
      }
      case 'restore':
        return action.payload;
      default:
        throw new Error('invalid action for dispatch');
    }
  };

  const baseOrg = {
    name: '',
    url: '',
    phoneNumber: '',
    parentCompany: '',
    subsidiaryCompany: [],
    address: [],
    contactPerson: [],
  };

  const [updatedProfile, dispatchProfile] = useReducer(
    reducer,
    profile || baseOrg,
  );

  const handleAccessGate = value => {
    setHasPassedGate(value);
  };

  const handleAccountCreate = async () => {
    try {
      setLoading(true);
      await api.createProfile({
        form: { ...updatedProfile },
        role: 'organization',
      });
    } catch (err) {
      console.log(err);
    } finally {
      ReactGA.event({
        category: 'User',
        action: 'Onboarding - Organization added user information',
      });
      setRefreshFlag(!refreshFlag);
    }
  };

  const handleDocsUpload = () => {
    setRefreshFlag(!refreshFlag);
  };

  const handleOrgComplete = async () => {
    try {
      setLoading(true);
      await api.updateUserOnboarded();
    } catch (err) {
      console.log(err);
    } finally {
      ReactGA.event({
        category: 'User',
        action: 'Onboarding - Organization onboarding complete',
      });
      setRefreshFlag(!refreshFlag);
      setHasFinished(true);
    }
  };

  useEffect(() => {
    const InitializeOrgProfile = async () => {
      try {
        const userProfile = await api.fetchProfile();
        if (!userProfile.organization) {
          const initializeCreatorProfile = { form: {}, role: 'organization' };
          await api.createProfile(initializeCreatorProfile);
          setProfile(initializeCreatorProfile);
        } else {
          const docs = await api.fetchKycForOrg();
          setProfile(userProfile.organization);
          setHasKycDocs(!_.isEmpty(docs));
        }
        // if they have have set a name, we know they passed the gate
        handleAccessGate(
          userProfile.organization && !!userProfile.organization.name,
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    InitializeOrgProfile();
  }, [refreshFlag]);

  if (loading) return <InlineLoader />;

  // Step 1: Have they added the Access Key?
  if (!hasPassedGate)
    return <AccessGate profile={profile} handleAccessGate={handleAccessGate} />;
  // Step 2: Have you added org information?
  if (!profile.name)
    return (
      <React.Fragment>
        <OrganizationUserProfile
          formId="org-profile"
          formState={updatedProfile}
          dispatch={dispatchProfile}
          handleSubmit={handleAccountCreate}
        />
        <Grid container item md={2}>
          <StyledButton form="org-profile" type="submit">
            Continue
          </StyledButton>
        </Grid>
      </React.Fragment>
    );
  // Step 3: Have you added KYC docs?
  if (!hasKycDocs) return <UploadKYC handleSubmit={handleDocsUpload} />;
  // Step 4: Have you Verfied Email?
  if (!fanshipUser.emailVerified) return <VerifyEmail />;
  // Step 5: All done! update their onboarding status
  if (!fanshipUser.isOnboarded && !hasFinished) handleOrgComplete();
  // Step 6: Put them in a box until approved
  if (fanshipUser.isVerified !== 'approved') return <PendingApproval />;
  // Approved? Go to dashboard
  window.location.assign('/dashboard');
  return '';
};

export default OnboardingOrganization;
