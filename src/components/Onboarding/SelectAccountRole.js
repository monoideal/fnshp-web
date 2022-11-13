import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { identity } from 'lodash';
import history from 'lib/history';
import clsx from 'clsx';
// eslint-disable-next-line no-restricted-imports
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Grid, Box } from '@material-ui/core';
import PrimaryButton from 'components/shared/PrimaryButton';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: 40,
    marginTop: 0,
    textAlign: 'center',
    fontSize: 36,
  },
  containerForm: {
    padding: theme.spacing(0, 5, 0, 5),
  },
  buttonCard: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: emphasize('#fff', 0.02),
    },
    '&:hover >$choiceImageBg': {
      backgroundColor: emphasize('#ebfafc', 0.02),
    },
    transition: theme.transitions.create(['box-shadow', 'border'], {
      duration: theme.transitions.duration.shortest,
    }),
    maxWidth: '200px',
    minHeight: '300px',
    backgroundColor: '#fff',
    boxShadow:
      '2px 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)',
    border: '3px solid transparent',
    borderRadius: '4px',
    margin: theme.spacing(3),
    textAlign: 'center',
    color: '#202f35',
    letterSpacing: '0.71px',
    lineHeight: '1.55',
  },
  choiceImageBg: {
    transition: theme.transitions.create(['border'], {
      duration: theme.transitions.duration.shortest,
    }),
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: '#ebfafc',
    display: 'flex',
    border: '3px solid transparent',
  },
  cardSelected: {
    border: '3px solid #ffc555',
    '&>$choiceImageBg': {
      border: '2px solid #ffc555',
    },
    boxShadow:
      '0 2px 16px 0 rgba(181, 149, 129, 0.1), 0 14px 16px 0 rgba(156, 118, 100, 0.18)',
  },
  cardContent: {
    fontSize: '14px',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    margin: theme.spacing(2, 1),
  },
  hidden: {
    display: 'none',
  },
  buttonContinue: {
    marginTop: 50,
  },
}));

function CardItem({ image, title, content, value, isSelected, handleClick }) {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      className={clsx(
        classes.buttonCard,
        isSelected(value) && classes.cardSelected,
      )}
      // TODO: Double click to continue would be great here
      onClick={() => handleClick(value)}
    >
      <Grid item className={classes.choiceImageBg}>
        <Grid container item justify="center">
          <img src={image} alt={image} />
        </Grid>
      </Grid>
      <p className={classes.cardTitle}>{title}</p>
      <p className={classes.cardContent}>{content}</p>
    </Grid>
  );
}

CardItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.func,
  handleClick: PropTypes.func,
};

CardItem.defaultProps = {
  content: '',
  isSelected: () => false,
  handleClick: identity,
};

function CardSelector({ value, handleChange, children }) {
  const items = React.Children.toArray(children);

  return (
    <Grid item container justify="center" spacing={2}>
      {items.map(c =>
        React.cloneElement(c, {
          handleClick: val => {
            handleChange(val);
          },
          isSelected: val => val === value,
        }),
      )}
    </Grid>
  );
}

CardSelector.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
  ]).isRequired,
};

export default function SelectAccountRole() {
  const classes = useStyles();
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const [role, setRole] = useState('');

  const selectedRole = role => {
    ReactGA.event({
      category: 'User',
      action: `ONBOARDING: Selected Role ${role}`,
    });
    history.replace(`/onboarding/${role}`);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <h2 className={classes.title}>Choose Your Role</h2>

      <Container maxWidth="md" className={classes.containerForm}>
        <Grid container justify="center" spacing={3}>
          <CardSelector value={role} handleChange={value => setRole(value)}>
            <CardItem
              image="img/deco/fs_fan.svg"
              title="Fan"
              content="Discover great books, recommend what you love, support your favourite authors and earn rewards."
              value="fan"
            />
            {desktopView ? (
              <Box />
            ) : (
              <Grid container justify="center">
                or
              </Grid>
            )}
            <CardItem
              image="img/deco/fs_creator.svg"
              title="Author"
              content="I am the creator of, or a contributor to a book already on Fanship, OR I am an independent author."
              value="creator"
            />
            {desktopView ? (
              <Box />
            ) : (
              <Grid container justify="center">
                or
              </Grid>
            )}
            <CardItem
              image="img/deco/fs_creator.svg"
              title="Organization"
              content="I represent a publisher or company."
              value="organization"
            />
          </CardSelector>

          <Grid container justify="center" className={classes.buttonContinue}>
            <PrimaryButton
              variant="contained"
              color="primary"
              disabled={!role || role === 'admin'}
              onClick={() => selectedRole(role)}
            >
              Continue
            </PrimaryButton>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
