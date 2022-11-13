import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { startCase, isEmpty, isString } from 'lodash';
import { AppContext } from 'components/AppContext';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  container: {
    padding: 24,
  },
  reviewRow: {
    marginBottom: 15,
  },
  section: {
    marginBottom: 30,
    [theme.breakpoints.down('md')]: {
      '& > div': {
        margin: '10px auto',
        wordWrap: 'break-word',
      },
    },
  },
  sectionTitle: {
    marginBottom: 10,
  },
  fieldPadding: {
    paddingBottom: '10px',
  },
  link: {
    border: 'none',
    paddingTop: '20px',
    background: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontFamily: 'Open Sans',
    fontSize: '15px',
    color: theme.palette.darkOrange.main,
  },
  chips: {
    backgroundColor: '#d3e5ec',
    width: '100%',
  },
}));
function OtherDescriptionRow({ heading, content }) {
  let formattedContent = Array.isArray(content) ? content.join(', ') : content;
  if (formattedContent) {
    formattedContent = formattedContent.replace(
      /(<([^>]+)>)|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});/gi,
      '',
    );
  }
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} className={classes.fieldPadding}>
        <Box fontWeight="fontWeightBold">{startCase(heading)}</Box>
      </Grid>
      <Grid item xs={12} className={classes.fieldPadding}>
        <Box>{formattedContent}</Box>
      </Grid>
    </>
  );
}
OtherDescriptionRow.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

// Show content in the form of chips
function DescriptionRowChip({ heading, content }) {
  const formattedContent =
    !isEmpty(content) && isString(content) ? content.split(';') : content;
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} className={classes.fieldPadding}>
        <Box fontWeight="fontWeightBold">{startCase(heading)}</Box>
      </Grid>
      <Grid item xs={12} className={classes.fieldPadding}>
        <Grid container spacing={2}>
          {!isEmpty(formattedContent) ? (
            formattedContent.map((data, index) => {
              return (
                <Grid item key={index}>
                  <Chip label={data} className={classes.chips} />
                </Grid>
              );
            })
          ) : (
            <Grid item>-</Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
DescriptionRowChip.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

function DescriptionRow({ heading, content }) {
  const formattedContent = Array.isArray(content)
    ? content.join(', ')
    : content;
  const classes = useStyles();
  return (
    <>
      <Grid item xs={3} className={classes.fieldPadding}>
        <Box fontWeight="fontWeightBold">{startCase(heading)}</Box>
      </Grid>
      <Grid item xs={9} className={classes.fieldPadding}>
        <Box>{formattedContent}</Box>
      </Grid>
    </>
  );
}

DescriptionRow.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

function ReviewRow({ review, reviewer }) {
  const classes = useStyles();
  return (
    <div className={classes.reviewRow}>
      <Box component="span">{`"${review.reviewText}" - `}</Box>
      <Box component="span" fontWeight="fontWeightBold" fontStyle="italic">
        {reviewer}
      </Box>
    </div>
  );
}

ReviewRow.propTypes = {
  review: PropTypes.shape({
    reviewText: PropTypes.string,
  }).isRequired,
  reviewer: PropTypes.string.isRequired,
};

const detailFields = [
  'publisher',
  'imprint',
  'datePublished',
  'isbn',
  'seriesTitle',
];
const editonFields = [
  'edition',
  'printLength',
  'copyrightYear',
  'language',
  'country',
  'format',
  'audience',
];
const subjectFields = ['subject'];
const copyrightFields = ['copyrightHolder'];
const awardsFields = ['awards'];
const keywordsFields = ['keywords'];
const relatedFields = ['related'];

export default function Description({ book, isCatalog }) {
  const { countries } = React.useContext(AppContext);
  const country = countries.find(c => c.code === book.country);
  const detailOverrides = {
    isbn: book.assets ? book.assets.map(a => a.isbn) : '-',
    datePublished: moment.utc(book.datePublished).format('YYYY-MM-DD'),
    format: book.assets ? book.assets.map(a => a.format).join(', ') : '-',
    copyrightHolder: book.copyrightHolders
      ? book.copyrightHolders.map(a => `${a.firstName} ${a.lastName}`)
      : '-',
    related: book.relatedWorks ? book.relatedWorks.map(a => a) : '-',
    country: country ? country.name : book.country,
  };
  const [readMore, setReadMore] = React.useState(false);
  function handleReadMore() {
    setReadMore(isreadMore => !isreadMore);
  }
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container className={classes.section}>
        {detailFields.map(field => (
          <DescriptionRow
            key={field}
            heading={field}
            content={detailOverrides[field] || book[field] || '-'}
          />
        ))}
      </Grid>
      <Grid container className={classes.section}>
        {editonFields.map(field => (
          <DescriptionRow
            key={field}
            heading={field}
            content={detailOverrides[field] || book[field] || '-'}
          />
        ))}
      </Grid>
      {isCatalog ? (
        <Grid item xs={9}>
          <Box
            component="div"
            fontWeight="fontWeightBold"
            fontSize="18px"
            className={classes.sectionTitle}
          >
            Description
          </Box>
          <Box component="div" className={classes.section}>
            {readMore ? (
              <div>
                <Typography variant="subtitle1">
                  {`${book.description} `}
                  <button
                    type="submit"
                    className={classes.link}
                    onClick={() => handleReadMore()}
                  >
                    Read Less
                  </button>
                </Typography>
              </div>
            ) : (
              <div>
                <Typography variant="subtitle1">
                  {book.description.split('', 50)}
                  {'... '}
                  <button
                    type="submit"
                    className={classes.link}
                    onClick={() => handleReadMore()}
                  >
                    Read More
                  </button>
                </Typography>
              </div>
            )}
          </Box>
        </Grid>
      ) : null}

      <Grid container className={classes.section}>
        {subjectFields.map(field => (
          <OtherDescriptionRow
            key={field}
            heading={field}
            content={book[field] || '-'}
          />
        ))}
      </Grid>
      <Grid container className={classes.section}>
        {copyrightFields.map(field => (
          <OtherDescriptionRow
            key={field}
            heading={field}
            content={detailOverrides[field] || book[field] || '-'}
          />
        ))}
      </Grid>
      <Grid container className={classes.section}>
        {awardsFields.map(field => (
          <OtherDescriptionRow
            key={field}
            heading={field}
            content={book[field] || '-'}
          />
        ))}
      </Grid>
      <Grid container className={classes.section}>
        {keywordsFields.map((field, index) => (
          <DescriptionRowChip
            key={index}
            heading={field}
            content={book[field] || ''}
          />
        ))}
      </Grid>
      <Grid item xs={12} className={classes.section}>
        <Box
          component="div"
          fontWeight="fontWeightBold"
          fontSize="18px"
          className={classes.sectionTitle}
        >
          Reviews
        </Box>
        {book.reviews &&
          book.reviews.map((review, index) => (
            <ReviewRow key={index} review={review} reviewer="" />
          ))}
      </Grid>
      <Grid container className={classes.section}>
        {relatedFields.map(field => (
          <OtherDescriptionRow
            key={field}
            heading={field}
            content={detailOverrides[field] || book[field] || '-'}
          />
        ))}
      </Grid>
    </div>
  );
}

Description.propTypes = {
  book: PropTypes.shape({
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        review: PropTypes.string,
        reviewer: PropTypes.string,
      }),
    ),
    assets: PropTypes.arrayOf(
      PropTypes.shape({
        isbn: PropTypes.string,
      }),
    ),
    datePublished: PropTypes.string,
    country: PropTypes.string,
    relatedWorks: PropTypes.string,
    copyrightHolders: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  isCatalog: PropTypes.bool,
};

Description.defaultProps = {
  isCatalog: false,
};
