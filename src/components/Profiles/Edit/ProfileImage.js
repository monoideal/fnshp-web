import React, { useState, useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { RowBreak } from 'components/shared/StyledInputForm';
import Cropper from 'react-easy-crop';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Button, Typography, Slider } from '@material-ui/core';
import { useApi } from 'api/';
import getCroppedImg from 'lib/cropImage';
import UploadFileReducer from 'reducers/UploadFileReducer';
import FullPageLoader from 'components/shared/FullPageLoader';

const useStyles = makeStyles(theme => ({
  avatarCont: {
    margin: '20px 0',
  },
  avatar: {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.orange.main,
    fontWeight: 'bold',
    marginRight: '20px',
  },
  avatarButton: {
    borderColor: theme.palette.darkGrey.main,
    backgroundColor: theme.palette.grey.main,
    fontSize: '10px',
    height: '100%',
    marginRight: '20px',
  },
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
  },
  sliderLabel: {
    padding: '0 16px',
    [theme.breakpoints.down('xs')]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: '22px 0px',
    marginLeft: 16,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
  warning: {
    width: '100%',
    margin: '20px 0',
    padding: 20,
    background: '#FFF9F2',
    border: '2px solid #ffc555',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  error: {
    width: '100%',
    margin: '20px 0',
    padding: 20,
    boxSizing: 'border-box',
    background: '#FFF3F3',
    border: '2px solid #FFBBBB',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
}));

export default function CreatorUserProfile({
  dispatch,
  handleDeleteAvatar,
  handleError,
  avatarUrlKey,
  error,
}) {
  const classes = useStyles();
  const api = useApi();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [{ percentage }, loaderDispatch] = useReducer(UploadFileReducer, {
    percentage: 0,
  });

  // eslint-disable-next-line no-shadow
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    const resetCropper = () => {
      setZoom(1);
      setRotation(0);
    };
    resetCropper();
    handleError(!avatarUrlKey);
  }, [avatarUrlKey]);

  const saveImage = async file => {
    dispatch({
      type: 'upload_file',
      payload: await api.uploadFile(file, 'avatar', null, loaderDispatch),
    });
  };

  const cropImage = useCallback(async () => {
    try {
      let fileName = `cropped.jpg`;
      if (avatarUrlKey) {
        const keyParts = avatarUrlKey.split(`/`);
        fileName = keyParts[keyParts.length - 1];
      }
      setUpdated(true);
      await getCroppedImg(
        avatarUrlKey,
        croppedAreaPixels,
        rotation,
        saveImage,
        fileName,
      );
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const handleImageChange = async e => {
    setIsLoading(true);
    const file = _.first(e.target.files);
    await saveImage(file);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <FullPageLoader withPercentage percentage={percentage} />
      ) : null}
      <Grid container className={classes.avatarCont}>
        <Grid item>
          <Avatar className={classes.avatar} src={avatarUrlKey} />
        </Grid>
        <Grid item>
          <Button
            component="label"
            className={classes.avatarButton}
            variant="outlined"
          >
            <input
              onChange={handleImageChange}
              type="file"
              style={{ display: 'none' }}
            />
            CHOOSE FILE
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={handleDeleteAvatar}
            className={classes.avatarButton}
            variant="outlined"
          >
            DELETE PHOTO
          </Button>
        </Grid>
      </Grid>
      <RowBreak />
      <div className={classes.cropContainer}>
        <Cropper
          image={avatarUrlKey}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onRotationChange={setRotation}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <div className={classes.sliderContainer}>
          <Typography variant="overline" className={classes.sliderLabel}>
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            className={classes.slider}
            onChange={(e, z) => setZoom(z)}
          />
        </div>
        <div className={classes.sliderContainer}>
          <Typography variant="overline" className={classes.sliderLabel}>
            Rotation
          </Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            className={classes.slider}
            onChange={(e, r) => setRotation(r)}
          />
        </div>
        <Button
          onClick={cropImage}
          variant="contained"
          color="primary"
          className={classes.cropButton}
        >
          Crop Image
        </Button>
      </div>
      <RowBreak />
      {updated && (
        <div className={classes.warning}>
          Changes to your profile image will not appear until you save your
          profile below.
        </div>
      )}
      {error && (
        <div className={classes.error}>
          An image is required for your profile.
        </div>
      )}
      <RowBreak />
    </React.Fragment>
  );
}

CreatorUserProfile.propTypes = {
  avatarUrlKey: PropTypes.string,
  handleDeleteAvatar: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

CreatorUserProfile.defaultProps = {
  avatarUrlKey: '',
  error: false,
};
