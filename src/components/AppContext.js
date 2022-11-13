import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApi } from 'api/';
import { stringToUrl } from 'util/helpers';

const initialState = {
  categories: [],
  countries: [],
};

export const AppContext = React.createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const api = useApi();
  const [categories, setCategories] = useState();
  const [countries, setCountries] = useState();
  const [fanshipUser, setFanshipUser] = useState()

  const initCategories = async () => {
    const [originalCategories] = await Promise.all([api.fetchCategories()]);
    const categoriesWithUrls = originalCategories.map(c => {
      const subCategoriesWithUrls = c.subCategories.map(sc => {
        return { url: stringToUrl(sc.name), ...sc };
      });
      return {
        url: stringToUrl(c.name),
        ...c,
        subCategories: subCategoriesWithUrls,
      };
    });
    setCategories(categoriesWithUrls);
  };

  const initCountries = async () => {
    setCountries(await api.fetchCountries());
  };

  const initUsers = async () => {
    setFanshipUser(await api.fetchProfile());
  }

  useEffect(() => {
    async function initialize() {
      try {
        initCategories();
        initCountries();
      } catch (err) {
        console.log(err);
      }
    }
    initialize();
  }, []);

  return (
    <AppContext.Provider value={{ categories, countries, fanshipUser, initUsers }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppContextProvider;
