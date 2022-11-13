import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import initializeAxios from 'lib/axios';
import initializeFanshipApi from 'api/fanship';
import { useAuth0 } from "@auth0/auth0-react";
import initializeFilestore from 'api/filestore';

export const ApiContext = React.createContext();

export const useApi = () => useContext(ApiContext);

// Exposes backend API calls for the rest of the application to use
const ApiProvider = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const axios = initializeAxios();
  const [fanship, setFanship] = useState(initializeFanshipApi({ axios, getTokenSilently: () => getAccessTokenSilently({
    audience: config.AUTH0_AUDIENCE,
    scope: "read:current_user",
  })}));
  const [filestore, setFilestore] = useState(initializeFilestore({ axios, getTokenSilently: () => getAccessTokenSilently({
    audience: config.AUTH0_AUDIENCE,
    scope: "read:current_user",
  }) }));

  useEffect(() => {
    setFanship(initializeFanshipApi({ axios, getTokenSilently: () => getAccessTokenSilently({
			audience: config.AUTH0_AUDIENCE,
			scope: "read:current_user",
		}) }));
    setFilestore(initializeFilestore({ axios, getTokenSilently: () => getAccessTokenSilently({
			audience: config.AUTH0_AUDIENCE,
			scope: "read:current_user",
		}) }));  
  }, isAuthenticated)
  return (
    <ApiContext.Provider
      value={{
        ...filestore,
        ...fanship,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};

export default ApiProvider;
