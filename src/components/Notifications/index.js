import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  FormControlLabel,
  Checkbox,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaperHeader from 'components/Account/PaperHeader';
import { useApi } from 'api/';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '20px 30px 40px 30px',
    maxWidth: '1000px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '25px',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  checkbox: {
    color: '#ffc555',
  },
}));

export function StyledCheckbox({ checked, onChange }) {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      style={{ color: '#ffc555' }}
      color="primary"
    />
  );
}

StyledCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function Notifications() {
  const classes = useStyles();
  const api = useApi();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    async function initialize() {
      try {
        const profile = await api.fetchProfile();
        setNotificationsEnabled(profile.notificationsEnabled);
      } catch (err) {
        console.log(err);
      }
    }
    initialize();
  }, [api]);

  const handleChange = async event => {
    setNotificationsEnabled(event.target.checked);
    await api.setNotificationsEnabled(event.target.checked);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <h1>Notifications</h1>
      <Paper className={classes.paper}>
        <PaperHeader label="Notifications" />
        <FormControlLabel
          control={
            <StyledCheckbox
              checked={notificationsEnabled}
              onChange={handleChange}
            />
          }
          label="Allow important notifications to be sent by email"
        />
        <div style={{ paddingLeft: '30px' }}>
          We periodically send out important news about Fanship to our users via
          email. We keep the email volume to an absolute minimum.
        </div>
      </Paper>
    </Container>
  );
}
