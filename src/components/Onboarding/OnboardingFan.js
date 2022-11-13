import React, { useEffect, useState, useReducer } from 'react';
import { set } from 'lodash';
import ReactGA from 'react-ga';
import { useApi } from 'api/';

import InlineLoader from 'components/shared/InlineLoader';
import { AppContext } from 'components/AppContext';
import VerifyEmail from './components/VerifyEmail';
import FanAccount from './components/FanAccount';
import IntroduceRecommendStep1 from './components/IntroduceRecommendStep1';
import IntroduceRecommendStep2 from './components/IntroduceRecommendStep2';

const OnboardingFan = ({ fanshipUser }) => {
  const api = useApi();
  const [profile, setProfile] = useState({ ...fanshipUser, promoCode: '' });
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [introduceRecommendStep1, setIntroduceRecommendStep1] = useState(false);
  const [introduceRecommendStep2, setIntroduceRecommendStep2] = useState(false);
  const { initUsers } = React.useContext(AppContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'form_edit': {
        const { path, value } = action.payload;
        const toUpdate = { ...state };
        set(toUpdate, ['form', ...path], value);
        return toUpdate;
      }
      default:
        throw new Error('invalid action for dispatch');
    }
  };

  const [updatedProfile, dispatchProfile] = useReducer(reducer, {
    form: { ...profile.fan },
    role: 'fan',
  });

  const handleAccountCreate = async () => {
    try {
      setLoading(true);
      await api.createProfile(updatedProfile);
    } catch (err) {
      console.log(err);
    } finally {
      ReactGA.event({
        category: 'User',
        action: 'Onboarding - Fan added user information',
      });
      setRefreshFlag(!refreshFlag);
    }
  };

  const handleFanComplete = async () => {
    try {
      await api.updateUserOnboarded();
      await initUsers();
    } catch (err) {
      console.log(err);
    } finally {
      ReactGA.event({
        category: 'User',
        action: 'Onboarding - Fan onboarding completed',
      });
    }
  };

  useEffect(() => {
    const redirectIfOnboarded = async () => {
      try {
        const userProfile = await api.fetchProfile();
        setProfile(userProfile);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    redirectIfOnboarded();
  }, [refreshFlag]);

  if (loading) return <InlineLoader />;

  // Step 1: Have they added all the account information?
  if (!profile.fan || !profile.fan.username)
    return (
      <FanAccount
        formState={updatedProfile}
        dispatch={dispatchProfile}
        handleSubmit={handleAccountCreate}
      />
    );
  // Step 2: If your email verified?
  if (!profile.emailVerified) return <VerifyEmail />;
  // Step 3: Introduce Recommend functionality
  if (!introduceRecommendStep1)
    return (
      <IntroduceRecommendStep1 handleSubmit={setIntroduceRecommendStep1} />
    );
  return <IntroduceRecommendStep2 callBack={handleFanComplete} />;
  // Step 4: All done! Step 2 will update context when it's done
};

export default OnboardingFan;
