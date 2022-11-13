import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Charity from 'components/Admin/Charity/AddCharity';
import { useApi } from 'api/';
import FullPageLoader from 'components/shared/FullPageLoader';
import { get } from 'lodash';

function EditCharity() {
  const api = useApi();
  const { userId } = useParams();
  const [state, setState] = useState({
    isLoading: true,
    error: false,
    charity: {},
  });

  useEffect(() => {
    async function initialize() {
      try {
        const result = await api.fetchCharity(userId);

        // Show error for suspended charities
        if (get(result, 'isSuspended')) {
          throw new Error('User is suspended');
        }
        setState({
          charity: result,
          isLoading: false,
          error: false,
        });
      } catch (err) {
        console.log(err);
        setState({
          charity: {},
          isLoading: false,
          error: true,
        });
      }
    }
    initialize();
  }, [userId, api]);

  if (state.isLoading) return <FullPageLoader />;

  if (state.error) return 'An error has occurred retrieving data';

  return <Charity edit data={state.charity} />;
}
export default EditCharity;
