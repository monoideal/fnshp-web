import React, { useCallback, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

import { ProfileTextField } from 'components/shared/StyledTextField';
import ButtonLink from 'components/shared/ButtonLink';
import StyledTable from 'components/shared/StyledTable';
import StyledButton from 'components/shared/StyledButton';
import { createDebouncedStore } from 'util/helpers';
import { useApi } from 'api/';

const useStyles = makeStyles(() => ({
  containerFormChkBox: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px',
    flexFlow: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  containerFormSubmit: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px',
  },
  hidden: {
    visibility: 'hidden',
  },
  error: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'red',
    minWidth: '200px',
  },
  result: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'green',
    minWidth: '200px',
  },
}));

const newRow = () => ({
  name: '',
  type: '',
  data: '',
  filename: '',
  isLoading: false,
  error: null,
  fileUrl: '',
});

const initialState = () => ({
  kyc: [newRow()],
  isSubmitting: false,
  error: null,
  result: null,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'edit_field': {
      const { idx, key, value } = action.payload;
      const toUpdate = _.clone(state.kyc);
      toUpdate[idx] = { ...toUpdate[idx], [key]: value };
      return { ...state, kyc: toUpdate };
    }
    case 'add_section': {
      return { ...state, kyc: [...state.kyc, newRow()] };
    }
    case 'start_upload': {
      const { idx } = action.payload;
      const toUpdate = _.clone(state.kyc);
      toUpdate[idx] = { ...toUpdate[idx], isLoading: true, error: null };
      return { ...state, kyc: toUpdate };
    }
    case 'upload_complete': {
      const { idx, filename, fileUrl } = action.payload;
      const toUpdate = _.clone(state.kyc);
      toUpdate[idx] = {
        ...toUpdate[idx],
        filename,
        fileUrl,
        data: fileUrl,
        isLoading: false,
      };
      return { ...state, kyc: toUpdate };
    }
    case 'clear_upload': {
      const { idx } = action.payload;
      const toUpdate = _.clone(state.kyc);
      toUpdate[idx] = { ...toUpdate[idx], filename: '', data: '' };
      return { ...state, kyc: toUpdate };
    }
    case 'upload_error': {
      const { idx, error } = action.payload;
      const toUpdate = _.clone(state.kyc);
      toUpdate[idx] = {
        ...toUpdate[idx],
        error,
        isLoading: false,
      };
      return { ...state, kyc: toUpdate };
    }
    case 'start_submit': {
      return {
        ...state,
        isSubmitting: true,
        result: null,
        error: null,
      };
    }
    case 'submit_complete': {
      const { result } = action.payload;
      return { ...state, isSubmitting: false, result };
    }
    case 'submit_error': {
      const { error } = action.payload;
      return { ...state, isSubmitting: false, error };
    }
    case 'restore': {
      return action.payload;
    }
    case 'clear': {
      return {
        ...initialState(),
        kyc: _.times(state.kyc.length, () => newRow()),
      };
    }
    default: {
      throw new Error('invalid action for dispatch');
    }
  }
};

export default function UploadKYC({ handleSubmit }) {
  const classes = useStyles();
  const api = useApi();
  const [kycDocs, setKycDocs] = useState({});

  const [state, dispatch] = useReducer(reducer, initialState());

  const persistState = useCallback(createDebouncedStore('profile_kyc'), []);

  const fetchKYCDocs = async () => {
    const docs = await api.fetchKycForOrg();
    if (!_.isEmpty(docs)) {
      const mappedDocs = _.map(docs, doc => {
        const initDoc = _.get(initialState(), 'kyc');
        if (!_.isEmpty(initDoc)) {
          const newDoc = _.assign(...initDoc, doc);
          newDoc.data = _.get(doc, 'urlKey');
          return newDoc;
        }
        return null;
      });
      setKycDocs({ kyc: mappedDocs });
      dispatch({ type: 'restore', payload: { kyc: mappedDocs } });
    }
  };

  // checkbox
  const [chk, chkState] = React.useState({
    certify: false,
  });

  const { certify } = chk;

  const handleChange = name => event => {
    chkState({ ...chk, [name]: event.target.checked });
  };

  useEffect(() => {
    fetchKYCDocs();
  }, []);

  useEffect(() => {
    // Try to hydrate from storage
    const oldState = persistState.get();
    // if (oldState) dispatch({ type: 'restore', payload: oldState });
  }, [persistState]);

  useEffect(() => {
    persistState.set(state);
  }, [state, persistState]);

  const handleCancel = () => {
    if (!_.isEmpty(kycDocs) && !_.isEmpty(_.get(kycDocs, 'kyc'))) {
      dispatch({ type: 'restore', payload: kycDocs });
      return;
    }
    dispatch({ type: 'clear' });
  };

  /*
Upload -> replace the button, have X to re-upload
Submit, POST to backend (and then dispatch clear)
*/

  return (
    <>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell>ACTION</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {state.kyc.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <ProfileTextField
                  label="Document Name"
                  md={12}
                  value={row.name}
                  onChange={evt =>
                    dispatch({
                      type: 'edit_field',
                      payload: {
                        idx,
                        key: 'name',
                        value: evt.target.value,
                      },
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <input
                  style={{ display: 'none' }}
                  id={`upload-${idx}`}
                  type="file"
                  onChange={async evt => {
                    const file = _.first(evt.target.files);
                    dispatch({
                      type: 'start_upload',
                      payload: { idx },
                    });

                    try {
                      const fileUrl = await api.uploadFile(file, 'kyc', true);
                      dispatch({
                        type: 'upload_complete',
                        payload: { idx, filename: file.name, fileUrl },
                      });
                    } catch (err) {
                      console.log(err);
                      dispatch({
                        type: 'upload_error',
                        payload: { idx, error: 'Upload failed, try again' },
                      });
                    }
                  }}
                  onClick={evt => {
                    // Wipe the selection so that we can upload the same file twice
                    // eslint-disable-next-line no-param-reassign
                    evt.target.value = null;
                  }}
                />
                {row.filename ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {row.filename}
                    <CloseIcon
                      style={{ margin: '2px', fontSize: '25px' }}
                      onClick={() =>
                        dispatch({ type: 'clear_upload', payload: { idx } })
                      }
                    />
                  </div>
                ) : (
                  <label htmlFor={`upload-${idx}`}>
                    <StyledButton component="span">UPLOAD</StyledButton>
                  </label>
                )}
                <div
                  className={clsx({
                    [classes.hidden]: !row.error,
                    [classes.error]: true,
                  })}
                >
                  {row.error}
                </div>
              </TableCell>
              <TableCell>
                <CircularProgress
                  className={clsx({ [classes.hidden]: !row.isLoading })}
                />
              </TableCell>
            </TableRow>
          ))}

          {state.kyc.length < 3 ? (
            <TableRow>
              <TableCell style={{ textAlign: 'left' }}>
                <ButtonLink onClick={() => dispatch({ type: 'add_section' })}>
                  + Add a New Document
                </ButtonLink>
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </StyledTable>
      <div className={classes.containerFormChkBox}>
        <FormControlLabel
          className={classes.checkbox}
          control={
            <Checkbox
              color="primary"
              checked={certify}
              onChange={handleChange('certify')}
              value="certify"
            />
          }
          label="I certify that the information given is correct and complete."
        />
        <Grid xs={8}>
          <Typography>
            If incorporated, provide (a) certificate of corporate status, or (b)
            annual government filing, or (c) notice of assessment, or (d)
            published annual report.
          </Typography>
          <Typography>
            If trust or partnership, provide (a) trust agreement, or (b)
            partnership agreement, respectively. If unincorporated, please
            provide your articles of association.
          </Typography>
        </Grid>
      </div>
      <div className={classes.containerFormSubmit}>
        <StyledButton onClick={handleCancel}>CANCEL</StyledButton>
        <StyledButton
          disabled={
            _.some(state.kyc, row => row.isLoading) || certify === false
          }
          onClick={async () => {
            dispatch({ type: 'start_submit' });
            try {
              const data = _(state.kyc)
                .map(row => {
                  const fields = _.pick(row, ['name', 'data', 'filename']);
                  if (
                    _(fields)
                      .values()
                      .every(_.isEmpty)
                  ) {
                    return null;
                  }

                  // All fields must be filled out
                  if (
                    _(fields)
                      .values()
                      .some(_.isEmpty)
                  ) {
                    throw new Error(
                      'Please fill in all fields for a row or leave it blank',
                    );
                  }

                  return fields;
                })
                .compact()
                .value();

              // Must have at least one valid entry
              if (_.isEmpty(data)) {
                throw new Error('Must provide at least one document.');
              }

              const newData = _.compact(state.kyc
                .map(
                  file => {
                    if(!_(file)
                      .values()
                      .every(_.isEmpty)) {
                        return _.pick(file, ['name', 'data', 'filename', 'id', 'fileUrl']);
                      }
                  }
                ));

              await api.uploadKyc(newData);
              await fetchKYCDocs();
              dispatch({
                type: 'submit_complete',
                payload: { result: 'Submit done!' },
              });
              handleSubmit();
            } catch (err) {
              console.log(err);
              dispatch({
                type: 'submit_error',
                payload: {
                  error: err.message || 'Failed to submit, please try again.',
                },
              });
            }
          }}
        >
          SUBMIT
        </StyledButton>
        <CircularProgress
          className={clsx({ [classes.hidden]: !state.isSubmitting })}
        />
      </div>
      <div
        style={{ minWidth: 'fit-content', minHeight: '25px' }}
        className={clsx({
          [classes.result]: !!state.result,
          [classes.error]: !!state.error,
          [classes.hidden]: !state.result && !state.error,
        })}
      >
        {state.result}
        {state.error}
      </div>
    </>
  );
}

UploadKYC.propTypes = {
  handleSubmit: PropTypes.func,
};

UploadKYC.defaultProps = {
  handleSubmit: _.identity,
};
