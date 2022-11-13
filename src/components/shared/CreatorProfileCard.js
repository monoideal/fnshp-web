import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Popover,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { getResizedImageWithCheck } from 'util/helpers';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const statusColor = status => {
  switch (status) {
    case 'PENDING':
      return 'orange';
    case 'REJECTED':
      return 'red';
    case 'APPROVED':
      return 'green';
    default:
      return 'black';
  }
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    height: '100%',
    '&:hover': {
      background: '#fff4df',
    },
  },
  rootRaised: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff4df',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    '& a:hover': {
      textDecoration: 'underline',
    },
  },
  content: {
    '& > h5': {
      fontSize: 18,
    },
    '& > h6': {
      fontSize: 14,
    },
  },
  cover: {
    width: 100,
    height: 100,
    borderRadius: '100%',
    margin: '20px 10px 20px 20px',
  },
  contributorType: {
    color: '#aaa',
    fontSize: '0.8rem',
  },
  status: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
  updatedAt: {
    fontWeight: 'normal',
    color: '#666',
  },
  action: {
    padding: '0 16px 16px',
  },
  moreIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  moreMenu: {
    background: 'white',
    padding: 5,
  },
  decoCont: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '-3px',
    padding: '5px 10px 1px 5px',
    borderRadius: '4px',
    backgroundColor: '#9282DC',
  },
  decoIcon: {
    marginBottom: '-2px',
    paddingRight: '2px',
    fontSize: '24px',
  },
  decoText: {
    width: '100%',
    fontSize: '16px',
    color: '#FFFFFF',
    textShadow: '0 1px 1px rgba(0,0,0,0.38)',
  },
  decoLearn: {
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: '#FFFFFF',
    textShadow: '0 1px 1px rgba(0,0,0,0.38)',
    '& button': {
      color: '#FFFFFF',
    },
  },
});

export default function CreatorProfileCard({
  profile,
  action,
  moreAction,
  raised,
  forFans,
  forAdmins,
}) {
  const classes = useStyles();
  const { status, contributorType, avatar } = profile;
  const fullName =
    profile.displayName ||
    `${profile.firstName} ${profile.middleName ? profile.middleName : ''} ${
      profile.lastName
    }`;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card
      className={raised ? classes.rootRaised : classes.root}
      raised={raised}
    >
      {avatar && (
        <CardMedia
          className={classes.cover}
          image={getResizedImageWithCheck(avatar, 250)}
          title={fullName}
        />
      )}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          {moreAction && (
            <React.Fragment>
              <IconButton
                aria-label="more"
                className={classes.moreIcon}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <div className={classes.moreMenu}>{moreAction}</div>
              </Popover>
            </React.Fragment>
          )}
          {contributorType && !forFans && (
            <Typography className={classes.contributorType}>
              {contributorType}
            </Typography>
          )}
          <Typography component="h5" variant="h5">
            {forFans ? (
              <Link to={`/fans/browse/authors/${profile.id}`}>{fullName}</Link>
            ) : (
              <Link to={`/fans/browse/authors/${profile.id}`} target="_blank">
                {fullName}
              </Link>
            )}
          </Typography>
          {forAdmins && (
            <Typography className={classes.contributorType}>
              <Link
                className={classes.link}
                target="_blank"
                to={`/admin/rightholder/${profile.userId}`}
              >
                Go to creators information
              </Link>
            </Typography>
          )}
          {!forFans && (
            <Typography
              className={classes.status}
              style={{ color: statusColor(status) }}
            >
              {status} {status && ' '}
              {/* {updatedAt && (
                <span className={classes.updatedAt}>
                  ({moment.unix(updatedAt).format('Y/MM/DD')})
                </span>
              )} */}
            </Typography>
          )}
        </CardContent>
        {action && (
          <CardActions className={classes.action}>{action}</CardActions>
        )}
      </div>
    </Card>
  );
}

CreatorProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    avatar: PropTypes.string,
    bio: PropTypes.string,
    displayName: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    status: PropTypes.string,
    contributorType: PropTypes.string,
    isni: PropTypes.string,
    socialMedia: PropTypes.any,
    updatedAt: PropTypes.any,
  }).isRequired,
  action: PropTypes.node,
  moreAction: PropTypes.node,
  raised: PropTypes.bool,
  forFans: PropTypes.bool,
  forAdmins: PropTypes.bool,
};

CreatorProfileCard.defaultProps = {
  action: null,
  moreAction: null,
  raised: false,
  forFans: false,
  forAdmins: false,
};

export function CardDecoration({ icon, text, learn }) {
  const classes = useStyles();
  return (
    <div className={classes.decoCont}>
      <div className={classes.decoIcon}>{icon}</div>
      <div className={classes.decoText}>{text}</div>
      <div className={classes.decoLearn}>{learn}</div>
    </div>
  );
}
