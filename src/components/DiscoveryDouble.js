import React from 'react';
import history from 'lib/history';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 50,
    backgroundImage: 'linear-gradient(180deg, #E0ECEE 0%, #FFFFFF 100%)',
    border: '1px solid #D5E1E3',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      marginTop: 60,
    },
  },
  titleCont: {
    padding: 30,
    boxSizing: 'border-box',
    width: '40%',
    '& > h2': {
      margin: 0,
      fontSize: '21px',
    },
    '& > h3': {
      marginBottom: 0,
      fontSize: '18px',
      fontWeight: 'normal',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 15px',
      width: '100%',
      textAlign: 'center',
    },
  },
  imageCont: {
    width: '20%',
    marginTop: '-51px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      order: '-1',
      paddingTop: 0,
    },
  },
  buttonCont: {
    width: '40%',
    boxSizing: 'border-box',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: 20,
    },
  },
  button: {
    width: 250,
    margin: 10,
    backgroundColor: '#629FA9',
    boxShadow: '1px 2px 6px 0 rgba(0,0,0,0.26)',
    color: '#FFFFFF',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#033C5D',
    },
  },
  weekly: {
    width: '100%',
    padding: 20,
    borderTop: 'solid 1px #D5E1E3',
    fontSize: '16px',
    color: '#838484',
    letterSpacing: '0.31px',
    textAlign: 'center',
  },
}));

export default function Discovery() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.titleCont}>
        <h2>
          As homeschool shifts to summer fun, life lessons, wild adventures and
          plucky companions await.
        </h2>
      </div>
      <div className={classes.imageCont}>
        <img
          className={classes.booksImage}
          srcSet="
						/img/discovery-kids.png 1x, 
						/img/discovery-kids@2x.png 2x"
          alt="Books"
        />
      </div>
      <div className={classes.buttonCont}>
        <Button
          className={classes.button}
          onClick={() => history.push('/books/young-adult-fiction')}
        >
          YOUNG ADULT FICTION
        </Button>
        <Button
          className={classes.button}
          onClick={() => history.push('/books/kids')}
        >
          JUVENILE FICTION
        </Button>
      </div>
      <div className={classes.weekly}>
        <strong>WEEKLY DISCOVERY ZONE:</strong> Where the thrill of the hunt
        uncovers your next favourite read.
      </div>
    </div>
  );
}
