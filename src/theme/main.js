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
      light: '#fcebed',
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
    // Used on the dashboard
    plum: {
      light: '#d4d2e0',
      main: '#1b1c50',
    },
    blue: {
      light: '#e2edfa',
      main: '#4a90e2',
    },
    yellow: {
      light: '#fff4df',
      main: '#ffbc3b',
    },
  },
  borderRadius: {
    default: '4px',
  },
  drawerWidth: 240,
  fanSite: {
    maxWidth: '1024px',
    tombstoneMinHeight: type => {
      switch (type) {
        case 'book':
          return '403px';
        case 'author':
          return '275px';
        case 'featured':
          return '444px';
        default:
          throw new Error(`Invalid tombsone type ${type}`);
      }
    },
  },
  fontFamily: 'Rubik',
});

export default theme;
