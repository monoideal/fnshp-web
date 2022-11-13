import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import ReactGA from 'react-ga';

import { useApi } from 'api/';
import InlineLoader from 'components/shared/InlineLoader';
import ProfileForm from 'components/Profiles/Edit/ProfileForm';
import { AppContext } from 'components/AppContext';
import VerifyEmail from './components/VerifyEmail';
// import PlaidVerification from './components/PlaidVerification';
import CreatorAccount from './components/CreatorAccount';
import GettingStarted from './components/GettingStarted';

const accountNeedsUpdating = creator => {
  const needsUpdating = [];
  if (creator.address.length < 1) needsUpdating.push('address');
  if (creator.dateOfBirth === 0) needsUpdating.push('date of birth');
  if (!creator.firstName || !creator.lastName) needsUpdating.push('full name');
  if (!creator.phoneNumber) needsUpdating.push('phone number');
  return needsUpdating;
};

const OnboardingCreator = () => {
  const { fanshipUser } = React.useContext(AppContext);
  const api = useApi();
  const [profile, setProfile] = useState(fanshipUser?.creator);
  const [loading, setLoading] = useState(true);
  const [showGettingStarted, setShowGettingStarted] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const InitializeCreatorProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await api.fetchProfile();
        if (!userProfile.creator) {
          await api.createProfile({
            form: { profile: { ...profile, isVerified: `approved` } },
            role: 'creator',
          });
        } else {
          setProfile(userProfile.creator);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    InitializeCreatorProfile();
  }, [refreshFlag]);

  const handleSeenGettingStarted = () => {
    setShowGettingStarted(false);
  };

  // const handlePlaidSuccess = useCallback(
  //   async (publicToken, metadata) => {
  //     try {
  //       setLoading(true);
  //       const account = _.first(metadata.accounts);
  //       await api.verifyCreatorPlaid(publicToken, account.id);
  //     } catch (err) {
  //       console.log(err);
  //       console.log(err.response);
  //     } finally {
  //       ReactGA.event({
  //         category: 'User',
  //         action: 'Onboarding - Verified Creator Plaid',
  //       });
  //       setRefreshFlag(!refreshFlag);
  //     }
  //   },
  //   [api],
  // );

  const handleAccountCreate = async updatedProfile => {
    try {
      setLoading(true);
      await api.createProfile({
        form: { ...profile, ...updatedProfile, isVerified: `approved` },
        role: 'creator',
      });
    } catch (err) {
      console.log(err);
    } finally {
      ReactGA.event({
        category: 'User',
        action: 'Onboarding - Creator updated added information',
      });
      setRefreshFlag(!refreshFlag);
    }
  };

  const handleProfileCreate = async () => {
    try {
      setLoading(true);
      await api.updateUserOnboarded();
    } catch (err) {
      console.log(err);
    } finally {
      ReactGA.event({
        category: 'User',
        action: 'Onboarding - Creator profile updated, onboarding completed',
      });
      window.location.assign('/dashboard');
    }
  };

  if (loading) return <InlineLoader />;

  // Step 1: If your email verified?
  if (!fanshipUser.emailVerified) return <VerifyEmail />;
  // Step 2: Did you see the Getting Started Page?
  if (showGettingStarted)
    return <GettingStarted handleSubmit={handleSeenGettingStarted} />;
  // Step 3: Did you complete Plaid identification?
  // if (!profile || !profile.plaidAccessToken)
  //   return (
  //     <PlaidVerification handleSuccess={handlePlaidSuccess} loading={loading} />
  //   );
  // Step 4: Have you completed all required data?
  const whatNeedsUpdating = accountNeedsUpdating(profile);
  if (profile && whatNeedsUpdating.length)
    return (
      <React.Fragment>
        <CreatorAccount handleCreate={handleAccountCreate} profile={profile} />
      </React.Fragment>
    );
  // Step 5: Do you have a public profile?
  return (
    <ProfileForm handleSuccessCallback={handleProfileCreate} forOnboarding />
  );
};

export default OnboardingCreator;
