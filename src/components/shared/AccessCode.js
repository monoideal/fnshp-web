import React, { useState } from 'react';
import { Paper, LinearProgress, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useApi } from 'api/';
import { useAuth0 } from '@auth0/auth0-react';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  paperInfo: {
    width: '100%',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(3),
    backgroundColor: '#fff4df',
    borderRadius: 10,
    '& h2': {
      marginTop: 0,
    },
  },
  unlockButton: {
    padding: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  link: {
    color: '#c04800',
    textDecoration: 'underline',
  },
  textfield: {
    backgroundColor: 'white',
  },
}));

export default function PromptForAccessCode() {
  const classes = useStyles();
  const { initUsers } = React.useContext(AppContext);
  const api = useApi();
  const [accessCode, setAccessCode] = useState('');
  const [wrongCode, setWrongCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccessCodeChange = event => {
    setAccessCode(event.target.value);
  };

  const updateFanSuspension = async () => {
    try {
      setLoading(true);
      await api.updateLimitedAccess(accessCode);
      initUsers();
    } catch (err) {
      setLoading(false);
      setWrongCode(true);
    }
  };

  return (
    <Paper className={classes.paperInfo}>
      <h2>Independent Authors</h2>
      <p>
        Independent author? To submit your ebook(s) for sale on Fanship you will
        need an Access Code. If you don’t already have one, email us at{' '}
        <a className={classes.link} href="mailto:info@fanship.fan">
          info@fanship.fan
        </a>{' '}
      </p>
      <div>
        <TextField
          id="outlined-basic"
          label="Access Code"
          variant="outlined"
          value={accessCode}
          className={classes.textfield}
          onChange={handleAccessCodeChange}
          error={wrongCode}
          helperText={wrongCode ? 'Incorrect Access Code' : ''}
        />
        <Button
          className={classes.unlockButton}
          color="primary"
          variant="contained"
          onClick={updateFanSuspension}
        >
          Enter
        </Button>
      </div>
      {loading ? <LinearProgress className={classes.loader} /> : ''}
    </Paper>
  );
}
