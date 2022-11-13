import React, { useState } from 'react';
import {
  Container,
  Grid,
  Button,
  Typography,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useApi } from 'api/';
import { Link } from 'react-router-dom';
import history from 'lib/history';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import FullPageLoader from 'components/shared/FullPageLoader';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    padding: '2% 1% 1px 2%',
  },
  topItem: {
    marginBottom: '4%',
  },
  title: {
    fontFamily: "'Rubik','sans-serif'",
    color: theme.palette.black.main,
    fontSize: '22px',
    fontWeight: 'bold',
  },
  body: {
    background: theme.palette.white.main,
    padding: '2.5%',
    margin: '2%px',
  },
  cancelBtn: {
    width: '115px',
    marginRight: '20px',
    background: theme.palette.white.main,
    borderColor: theme.palette.grey.main,
    color: theme.palette.black.main,
    border: '1px solid',
    boxShadow: 'none',
    padding: '10px 30px ',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    '&:hover': {
      background: theme.palette.lightGrey.main,
      borderColor: theme.palette.lightGrey.main,
    },
  },
  primaryBtn: {
    width: '115px',
    background: theme.palette.primary.main,
    padding: '10px 30px ',
    color: theme.palette.black.main,
    boxShadow: 'none',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  textField: {
    width: '100%',
  },
  btns: {
    margin: '10px',
  },
  iconBox: {
    border: '2px dashed #dddddd',
    borderRadius: '2px',
    width: '120px',
    height: '88px',
    textAlign: 'center',
  },
  boxWithUpdatedIcon: {
    width: '120px',
    height: '88px',
    textAlign: 'center',
  },
  uploadIcon: {
    width: '30px',
    height: '30px',
    marginTop: '25px',
    cursor: 'pointer',
  },
  uploadedIcon: {
    width: '120px',
    height: '87px',
    cursor: 'pointer',
  },
  uploadLogoLabel: {
    marginLeft: '30px',
    '& label': {
      cursor: 'pointer',
      color: '#247bce',
    },
  },
  iconError: {
    color: theme.palette.red.main,
    fontFamily: "'Rubik','sans-serif'",
    fontSize: '13px',
  },
  hidden: {
    display: 'none',
  },
}));

export default function Charity({ edit, data }) {
  const classes = useStyles();
  const uploadIcon = '/img/adminCharity/uploadImageIcon.png';
  const [icon, setIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [iconError, setIconError] = useState(
    isEmpty(data.logoUrl) ? null : false,
  );
  const [previewImage, setPreviewImage] = useState(data.logoUrl);
  const [name, setName] = useState(data.name);
  const [nameError, setNameError] = useState(isEmpty(data.name) ? null : '');
  const [url, setUrl] = useState(data.url);
  const [urlError, setUrlError] = useState(isEmpty(data.url) ? null : '');
  const [description, setDescription] = useState(data.description);
  const [descriptionError, setDescriptionError] = useState(
    isEmpty(data.description) ? null : '',
  );
  const api = useApi();

  const handleIconUpload = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    setIcon(event.target.files[0]);
    setIconError(false);
  };

  const handleName = value => {
    if (value.target.value < 1) {
      setNameError('Name cannot be empty');
    } else if (value.target.value > 50) {
      setNameError('Name cannot exced 50 characters');
    } else {
      setNameError('');
    }
    setName(value.target.value);
  };
  const handleUrl = value => {
    if (value.target.value < 1) {
      setUrlError('URL cannot be empty');
    } else if (value.target.value > 50) {
      setUrlError('URL cannot exced 100 characters');
    } else {
      setUrlError('');
    }
    setUrl(value.target.value);
  };
  const handleDescription = value => {
    if (value.target.value < 1) {
      setDescriptionError('Description cannot be empty');
    } else if (value.target.value > 50) {
      setDescriptionError('Description cannot exced 200 characters');
    } else {
      setDescriptionError('');
    }
    setDescription(value.target.value);
  };

  const showSuccessToastAndRedirect = toastMsg => {
    const toastId = toast.success(toastMsg);
    setTimeout(() => {
      toast.dismiss(toastId);
      history.push('/admin/charity');
    }, 2000);
  };

  const handleSubmit = async () => {
    if (
      nameError === '' &&
      urlError === '' &&
      descriptionError === '' &&
      iconError === false
    ) {
      setLoading(true);
      let fullUrl = '';
      if (icon) {
        try {
          fullUrl = await api.uploadFile(icon, 'icon');
        } catch (err) {
          setLoading(false);
          toast.error('Unable to create/update charity');
          return;
        }
      } else {
        fullUrl = data.logoUrl;
      }

      const charityToSend = {
        name,
        url,
        description,
        charityIcon: fullUrl,
        logoUrlKey: icon ? '' : data.logoUrlKey,
      };

      // Update existing Charity
      if (edit) {
        await api
          .updateCharity(data.userId, charityToSend)
          .then(() => {
            showSuccessToastAndRedirect(
              `Updated charity '${data.name}' successfully`,
            );
          })
          .catch(error => {
            console.log(error);
            toast.error(`Unable to update charity '${data.name}'`);
          });
      } else {
        // create new Charity
        await api
          .createNewCharity(charityToSend)
          .then(() => {
            showSuccessToastAndRedirect(`Added charity '${name}' successfully`);
          })
          .catch(error => {
            console.log(error);
            toast.error(`Unable to add charity '${name}'`);
          });
      }

      setLoading(false);
    } else {
      setNameError(nameError === null ? 'Name cannot be empty' : nameError);
      setUrlError(urlError === null ? 'URL cannot be empty' : urlError);
      setDescriptionError(
        descriptionError === null
          ? 'Description cannot be empty'
          : descriptionError,
      );
      setIconError(!!(iconError === null || iconError === true));
    }
  };

  return (
    <Container maxWidth="md">
      {loading ? <FullPageLoader /> : null}
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.topItem}
          >
            <Typography className={classes.title}>
              {' '}
              {edit ? `Edit '${data.name}' Info` : 'Add New Charity'}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.body}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-icon"
                  multiple
                  type="file"
                  onChange={handleIconUpload}
                />
                <Grid
                  item
                  className={
                    previewImage === ''
                      ? classes.iconBox
                      : classes.boxWithUpdatedIcon
                  }
                >
                  <label htmlFor="upload-icon">
                    <img
                      src={previewImage === '' ? uploadIcon : previewImage}
                      className={
                        previewImage === ''
                          ? classes.uploadIcon
                          : classes.uploadedIcon
                      }
                      alt="Charity Icon"
                    />
                  </label>
                </Grid>
                <Grid item className={classes.uploadLogoLabel}>
                  <label htmlFor="upload-icon">Upload Logo</label>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              className={iconError ? classes.iconError : classes.hidden}
            >
              Please Upload the Charity Icon
            </Grid>
            <Grid item xs={6} className={classes.basicInfo}>
              <TextField
                id="name"
                className={classes.textField}
                label="Name"
                margin="normal"
                variant="outlined"
                onChange={handleName}
                value={name}
                error={!!nameError}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="url"
                className={classes.textField}
                label="URL"
                margin="normal"
                variant="outlined"
                onChange={handleUrl}
                value={url}
                error={!!urlError}
                helperText={urlError}
              />
            </Grid>
            <Grid item xs={12} className={classes.basicInfo}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows="4"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={description}
                onChange={handleDescription}
                error={!!descriptionError}
                helperText={descriptionError}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              className={classes.btns}
            >
              <Button
                className={classes.cancelBtn}
                variant="contained"
                component={Link}
                to="/admin/charity"
              >
                Cancel
              </Button>
              <Button
                className={classes.primaryBtn}
                variant="contained"
                onClick={handleSubmit}
              >
                {edit ? 'UPDATE' : 'ADD'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

Charity.propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    logoUrl: PropTypes.string,
    logoUrlKey: PropTypes.string,
    userId: PropTypes.number,
  }),
};

Charity.defaultProps = {
  edit: false,
  data: {
    name: '',
    url: '',
    description: '',
    logoUrl: '',
    logoUrlKey: '',
    userId: 0,
  },
};
