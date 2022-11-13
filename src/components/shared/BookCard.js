import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { getResizedImage } from 'util/helpers';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 155,
  },
  content: {
    flex: '1 0 auto',
    '& > h5': {
      fontSize: 18,
    },
    '& > h6': {
      fontSize: 14,
    },
  },
  author: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cover: {
    width: 80,
    height: 120,
    margin: '20px 10px 20px 20px',
    backgroundSize: '100% auto',
  },
  action: {
    padding: '0 16px 16px',
    '& button': {
      fontWeight: 'bold',
    },
  },
}));

export default function BookCard({ book, action, raised }) {
  const classes = useStyles();
  const authors = book.authors || book.contributors;

  return (
    <Card className={classes.root} raised={raised}>
      <CardMedia
        className={classes.cover}
        image={getResizedImage(book.coverUrl, 250)}
        title={book.title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            <Link to={`/admin/catalog/view/${book.id}`} target="_blank">
              {book.title}
            </Link>
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.author}
          >
            {`By ${authors
              .filter(a => a.contributorType === 'AUTHOR')
              .map(a => a.displayName)
              .join(', ')}`}
          </Typography>
        </CardContent>
        {action && (
          <CardActions className={classes.action}>{action}</CardActions>
        )}
      </div>
    </Card>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    coverUrl: PropTypes.string,
    author_name: PropTypes.string,
    authors: PropTypes.shape([
      {
        contributorType: PropTypes.string,
      },
    ]),
    contributors: PropTypes.shape([
      {
        contributorType: PropTypes.string,
      },
    ]),
  }).isRequired,
  action: PropTypes.node,
  raised: PropTypes.bool,
};

BookCard.defaultProps = {
  action: null,
  raised: false,
};
