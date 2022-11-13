import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'components/Catalog/View/ExpansionPanel';
import BookListHeader from 'components/Catalog/View/BookListHeader';
import BookRow from 'components/Catalog/View/BookRow';
import AuditHistory from 'components/Catalog/View/AuditHistory';

export default function BookList({ books }) {
  return (
    <Grid container spacing={0} alignItems="center">
      <BookListHeader />

      {books.map(book => (
        <ExpansionPanel key={book.id}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <BookRow book={book} />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <AuditHistory auditHistory={book.auditHistory} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Grid>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
