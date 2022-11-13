import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import history from 'lib/history';
import { isEmpty, set, get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Input,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import { useApi } from 'api/';
import { useAuth0 } from "@auth0/auth0-react";
import ProfileImage from 'components/Profiles/Edit/ProfileImage';
import { TextMaskISNI } from 'components/shared/TextMasks';
import { isValidUrl } from 'util/helpers';
import { FACEBOOK_URL, TWITTER_URL, INSTAGRAM_URL } from 'util/constants';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    '& > div': {
      flexBasis: '30%',
      margin: theme.spacing(1),
    },
  },
  biography: {
    flexBasis: '100% !important',
  },
  input: {
    width: '100%',
    fontFamily: '"Courier New", Courier, monospace',
  },
  websiteTextField: {
    flexBasis: '100% !important',
  },
  socialMediaLinks: {
    flexBasis: '100% !important',
    marginLeft: 12,
    '& > h3': {
      margin: 0,
    },
  },
  socialRow: {
    marginTop: 10,
  },
  socialTextField: {
    width: 150,
    fontSize: '0.875rem',
    border: '1px solid #ddd',
    borderRadius: 4,
  },
  isniLabel: {
    padding: '0 5px',
    background: 'white',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      padding: '10px 30px',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
}));

const reducer = (profileState, action) => {
  switch (action.type) {
    case 'form_edit': {
      const { path, value } = action.payload;
      const toUpdate = { ...profileState };
      set(toUpdate, ...path, value);
      return toUpdate;
    }
    case 'form_save': {
      return action.payload;
    }
    case 'upload_file': {
      const toUpdate = { ...profileState };
      set(toUpdate, 'avatar', action.payload);
      return toUpdate;
    }
    case 'delete_avatarUrl': {
      const toUpdate = { ...profileState };
      set(toUpdate, 'avatar', action.payload);
      return toUpdate;
    }
    case 'fetch_profile': {
      return action.payload;
    }
    default:
      throw new Error('invalid action for dispatch');
  }
};

const hasAnError = errors => Object.keys(errors).some(k => errors[k]);
const formatIsni = isni =>
  isni === undefined || isni.includes('_') ? '' : isni.replace(/ /g, '');

export default function ProfileEditPage({
  id,
  destination,
  handleSuccessCallback,
}) {
  const classes = useStyles();
  const api = useApi();
  const [profile, dispatch] = React.useReducer(reducer, {});
  const [errors, setErrors] = useState({
    avatar: false,
    firstName: false,
    lastName: false,
    bio: false,
    isni: false,
    website: false,
  });
  const { user } = useAuth0();
  const userId = get(user, 'fanship.id');

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        dispatch({
          type: 'fetch_profile',
          payload: await api.fetchCreatorProfile(id),
        });
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (
      !profile.avatar ||
      !profile.firstName ||
      !profile.lastName ||
      !profile.bio
    ) {
      setErrors({
        ...errors,
        avatar: !profile.avatar,
        firstName: !profile.firstName,
        lastName: !profile.lastName,
        bio: !profile.bio,
      });
      return;
    }
    try {
      await api.createCreatorProfile({
        userId,
        ...profile,
        isni: formatIsni(profile.isni),
      });
      toast.success('Successfully created profile');
    } catch (err) {
      console.log(err);
      toast.error('Failed to created profile');
    } finally {
      if (destination) history.push(destination);
      if (handleSuccessCallback) handleSuccessCallback();
    }
  };

  const handleUpdate = async () => {
    try {
      await api.updateProfile({
        ...profile,
        isni: formatIsni(profile.isni),
      });
      toast.success('Successfully updated profile');
      history.push(destination);
    } catch (err) {
      console.log(err);
      toast.error('Failed to update profile');
    }
  };

  const handleAvatarError = error => {
    setErrors({ ...errors, avatar: error });
  };

  const handleChange = key => evt => {
    const { value } = evt.target;
    switch (key) {
      case 'firstName':
      case 'lastName':
      case 'bio':
        setErrors({ ...errors, [key]: !value });
        break;
      case 'isni':
        setErrors({
          ...errors,
          isni: !value.includes('____ ____ ____ ____') && value.includes('_'),
        });
        break;
      case 'socialMedia.website':
        setErrors({
          ...errors,
          [key.replace('socialMedia.', '')]: !isValidUrl(value),
        });
        break;
      default:
        break;
    }
    dispatch({
      type: 'form_edit',
      payload: { path: [key], value },
    });
  };

  function handleDeleteAvatar() {
    dispatch({
      type: 'delete_avatarUrl',
      payload: null,
    });
  }

  return (
    <Grid container spacing={3}>
      {isEmpty(profile) && !isEmpty(id) ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Grid item xs={12}>
            <strong>Add your profile picture</strong>
            <ProfileImage
              dispatch={dispatch}
              avatarUrlKey={profile.avatar}
              handleDeleteAvatar={handleDeleteAvatar}
              handleError={handleAvatarError}
              error={errors.avatar}
            />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <TextField
              label="First name"
              defaultValue={profile.firstName}
              helperText="Required"
              variant="outlined"
              onChange={handleChange('firstName')}
              error={errors.firstName}
            />
            <TextField
              label="Middle name"
              defaultValue={profile.middleName}
              variant="outlined"
              onChange={handleChange('middleName')}
            />
            <TextField
              label="Last name"
              defaultValue={profile.lastName}
              helperText="Required"
              variant="outlined"
              onChange={handleChange('lastName')}
              error={errors.lastName}
            />
            <FormControl variant="outlined" error={errors.isni}>
              <InputLabel htmlFor="isni" className={classes.isniLabel}>
                ISNI
              </InputLabel>
              <OutlinedInput
                id="isni"
                className={classes.input}
                defaultValue={profile.isni}
                inputComponent={TextMaskISNI}
                onChange={handleChange('isni')}
              />
              <FormHelperText>
                (optional: to find out more go to www.isni.org)
              </FormHelperText>
            </FormControl>
            <TextField
              label="Biography"
              defaultValue={profile.bio}
              helperText="Required. Max. 4000 characters."
              variant="outlined"
              multiline
              rows={6}
              className={classes.biography}
              onChange={handleChange('bio')}
              error={errors.bio}
              inputProps={{ maxLength: 4000 }}
            />
            <TextField
              label="Personal Website"
              defaultValue={profile.socialMedia && profile.socialMedia.website}
              helperText="https://example.com"
              variant="outlined"
              onChange={handleChange('socialMedia.website')}
              className={classes.websiteTextField}
              error={errors.website}
            />
          </Grid>
          <Grid item xs={12} className={classes.socialMediaLinks}>
            <h3>Social Media Links</h3>
            <Grid
              container
              justify="flex-start"
              alignItems="baseline"
              className={classes.socialRow}
            >
              <div>{FACEBOOK_URL}</div>
              <Input
                label="Facebook username"
                defaultValue={
                  profile.socialMedia && profile.socialMedia.facebook
                }
                variant="outlined"
                onChange={handleChange('socialMedia.facebook')}
                className={classes.socialTextField}
              />
            </Grid>
            <Grid
              container
              justify="flex-start"
              alignItems="baseline"
              className={classes.socialRow}
            >
              <div>{TWITTER_URL}</div>
              <Input
                label="Twitter URL"
                defaultValue={
                  profile.socialMedia && profile.socialMedia.twitter
                }
                variant="outlined"
                onChange={handleChange('socialMedia.twitter')}
                className={classes.socialTextField}
              />
            </Grid>
            <Grid
              container
              justify="flex-start"
              alignItems="baseline"
              className={classes.socialRow}
            >
              <div>{INSTAGRAM_URL}</div>
              <Input
                label="Instagram URL"
                defaultValue={
                  profile.socialMedia && profile.socialMedia.instagram
                }
                variant="outlined"
                onChange={handleChange('socialMedia.instagram')}
                className={classes.socialTextField}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      <Grid item xs={12} className={classes.buttons}>
        {!isEmpty(id) ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={hasAnError(errors)}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            disabled={hasAnError(errors)}
          >
            Create Profile
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

ProfileEditPage.propTypes = {
  id: PropTypes.string,
  destination: PropTypes.string,
  handleSuccessCallback: PropTypes.func,
};

ProfileEditPage.defaultProps = {
  id: null,
  destination: undefined,
  handleSuccessCallback: undefined,
};
