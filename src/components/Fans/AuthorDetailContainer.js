import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useApi } from 'api/';
import BookAuthorDetails from 'components/Fans/BookAuthorDetails';

function AuthorDetailContainer({ match }) {
  const api = useApi();
  const [authorDetails, setAuthorDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {
    params: { id },
  } = match;

  async function initialize() {
    try {
      setIsLoading(true);
      setAuthorDetails(await api.fetchAuthorDetails(id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  if (isLoading) return 'Loading...';

  return <BookAuthorDetails author={authorDetails} />;
}

AuthorDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default withRouter(AuthorDetailContainer);
