import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffc555',
    },
    navy: {
      main: '#171331',
    },
    lightGrey: {
      main: '#F8F8F9',
    },
    grey: {
      main: '#E0E0E3',
    },
    darkGrey: {
      main: '#837e98',
    },
    offWhite: {
      main: 'rgba(134, 124, 130, 0.35)',
    },
    paleYellow: {
      main: '#FFF9F2',
    },
    black: {
      main: '#333333',
    },
    white: {
      main: '#FFFFFF',
    },
    orange: {
      main: '#ff9101',
    },
    darkOrange: {
      main: '#c04800',
    },
    red: {
      main: '#e02020',
    },
    green: {
      main: '#7ed321',
    },
    darkPurple: {
      main: '#241f63',
    },
    backgroundYellow: {
      main: '#fcf9f4',
    },
    promoGreen: {
      light: '#F4FCF4',
      main: '#A4C8A5',
    },
  },
  typography: {
    fontFamily: [
      '"Rubik"',
      '-apple-system',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      marginBottom: '1.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h3: {
      marginBottom: '1.5rem',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    h5: {
      marginBottom: '1rem',
      fontSize: '.9rem',
      fontWeight: 'bold',
      color: '#837e98', // dark grey
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: '1rem',
      },
    },
    MuiFormLabel: {
      root: {
        fontWeight: 'bold',
      },
    },
  },
});

export default theme;
