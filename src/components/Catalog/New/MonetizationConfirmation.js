import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from 'components/shared/Button';
import Header from 'components/Catalog/HeaderWithBreadcrumbs';

const useStyles = makeStyles(theme => ({
  paper: {
    boxSizing: 'border-box',
  },
  title: {
    padding: '30px 20px 0',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    color: theme.palette.black.main,
    marginBottom: '30px',
    borderWidth: '2px',
    '&:hover': {
      borderWidth: '2px',
    },
  },
  formHelperText: {
    color: theme.palette.black.main,
    margin: '5px 30px 20px',
  },
  link: {
    margin: '0px 50px 50px 50px',
    color: 'Red',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
  buttonLink: {
    margin: '0px 10px 0px 0px',
    fontWeight: 505,
    textDecoration: 'underline',
  },
  headerPadding: {
    paddingBottom: '15px',
  },
}));

function MonetizationConfirmation() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [isDisable, setDisable] = useState(true);

  function handleChange(event) {
    setValue(event.target.value);
    setDisable(false);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.headerPadding}>
            <Header
              title="Add New Book"
              breadcrumbLinks={[{ to: '/catalog', text: 'Catalogue' }]}
            />
          </div>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              fontWeight="fontWeightBold"
              fontSize="20px"
              classes={{ root: classes.title }}
            >
              Do you have the right to upload the work?
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="monetize-work-right"
                name="monetize-work-right"
                className={classes.group}
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio color="primary" />}
                  label="Yes, I have the exclusive right to sell, market, display, distribute and license the ebook(s) in digital form in the English and/or French language throughout Canada. If you are unsure if you own the rights to the works, please consult a lawyer"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio color="primary" />}
                  label="No, I do not have the exclusive right to sell, market, display, distribute and license the ebook(s) in digital form in the English and/or French language throughout Canada"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} classes={{ root: classes.link }}>
            <Link to="/faq" className={classes.cursorPointer}>
              How do I know?
            </Link>
          </Grid>
          <Grid item xs={12} classes={{ root: classes.buttonContainer }}>
            <Button
              color="primary"
              variant="outlined"
              classes={{ root: classes.button }}
              disabled={isDisable}
            >
              {value === 'Yes' ? (
                <Link to="/catalog/new/info">Continue</Link>
              ) : (
                <Link to="/catalog/new/monetize/no">Continue</Link>
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default MonetizationConfirmation;
