import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import history from 'lib/history';
import ButtonLink from 'components/shared/ButtonLink';
import { AppContext } from './AppContext';

const PrivateRoute = ({ component: Component, path, permission, ...rest }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const { fanshipUser, initUsers } = React.useContext(AppContext);
  // Route-level authorization requires that a user must have been onboarded before allowing access.
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const fn = async () => {
      setIsAuthorized(false);
      if (!fanshipUser) {
        try {
          await initUsers();
        } catch (err) {
          console.log(err);
        }
      } else {
        if (isAuthenticated === false) {
          await loginWithRedirect({
            appState: { targetUrl: path },
          });
          return;
        }

        if (!fanshipUser?.isOnboarded) history.replace('/onboarding');
        if (fanshipUser?.organization && fanshipUser?.isVerified !== 'approved') {
          history.replace('/onboarding/organization');
        }
        const isSuperuser = fanshipUser?.isSuperuser;

        if (
          !fanshipUser ||
          !fanshipUser?.isOnboarded ||
          fanshipUser?.isSuspended
        ) {
          setIsAuthorized(false);
          return;
        }

        if (!permission) {
          setIsAuthorized(
            fanshipUser.creator ||
              fanshipUser.admin ||
              fanshipUser.organization,
          );
        } else {
          switch (permission) {
            case 'fan': {
              setIsAuthorized(!!fanshipUser.fan || isSuperuser);
              break;
            }
            case 'creator': {
              setIsAuthorized(fanshipUser.creator || fanshipUser.organization);
              break;
            }
            case 'admin': {
              setIsAuthorized(!!fanshipUser.admin);
              break;
            }
            default: {
              break;
            }
          }
        }
        setIsLoading(false);
      }
    };
    fn();
  }, [isAuthenticated, path, loginWithRedirect, isLoading, fanshipUser]);

  const render = props => <Component {...props} />;

  /* eslint-disable no-nested-ternary */
  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : isAuthorized ? (
        <Route path={path} render={render} {...rest} />
      ) : (
        <>
          <p>Not Authorized</p>
          <ButtonLink onClick={() => history.goBack()}>Go Back</ButtonLink>
        </>
      )}
    </>
  );
  /* eslint-enable no-nested-ternary */
};

PrivateRoute.propTypes = {
  component: PropTypes.node,
  render: PropTypes.func,
  path: PropTypes.string,
  permission: PropTypes.string,
};

PrivateRoute.defaultProps = {
  component: null,
  render: null,
  path: null,
  permission: null,
};

export default PrivateRoute;
