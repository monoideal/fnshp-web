import React, { useState, useEffect } from 'react';
import Promise from 'bluebird';
import { sample } from 'lodash';

import { useApi } from 'api/';
import PaginatedCollection from 'components/Fans/PaginatedCollection';
import CollectionWithBanner from 'components/Fans/CollectionWithBanner';
import FeaturedAuthor from 'components/Fans/FeaturedAuthor';
import Book from 'components/Fans/Book';
import Author from 'components/Fans/Author';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box } from '@material-ui/core';
// import { classes } from 'istanbul-lib-coverage';

const useStyles = makeStyles(theme => ({
  loggedinContainer: {
    [theme.breakpoints.down('md')]: {
      padding: 20,
    },
  },
}));

function useWidth() {
  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      return !output && desktopView ? key : output;
    }, null) || 'xs'
  );
}

export default function DashboardContainer() {
  const api = useApi();
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [featuredAuthor, setFeaturedAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    async function initialize() {
      try {
        const [fetchedBooks, fetchedAuthors] = await Promise.all([
          api.fetchBooks(),
          api.fetchAuthors(),
        ]);
        setBooks(fetchedBooks ? fetchedBooks.books : []);
        setAuthors(fetchedAuthors);
        setFeaturedAuthor(sample(fetchedAuthors));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    initialize();
  }, [api]);

  const authorCollection = authors.map(a => (
    <Author key={a.displayName} author={a} />
  ));
  const bookCollection = books.map(b => (
    <Box p={{ xs: 1, md: 2 }}>
      <Book key={b.id} book={b} columnCount={4} />
    </Box>
  ));

  let collectionPage;

  const width = useWidth();

  switch (width) {
    case 'xs':
      collectionPage = 2;
      break;
    case 'sm':
      collectionPage = 4;
      break;
    default:
      collectionPage = 6;
      break;
  }

  return (
    <>
      <div className={classes.loggedinContainer}>
        <PaginatedCollection
          title="Recently Added"
          collection={bookCollection}
          tombstoneType="book"
          pageSize={collectionPage}
          isLoading={isLoading}
        />
        <CollectionWithBanner
          collection={bookCollection}
          tombstoneType="book"
          isLoading={isLoading}
          mobileJustify={desktopView ? 'space-between' : 'center'}
        />
        {featuredAuthor ? (
          <FeaturedAuthor author={featuredAuthor} isLoading={isLoading} />
        ) : null}
        <PaginatedCollection
          title="Authors you might like"
          collection={authorCollection}
          tombstoneType="author"
          pageSize={collectionPage}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
