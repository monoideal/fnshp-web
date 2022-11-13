import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AccordionBookAndCoverUpload from 'components/Catalog/New/AccordionBookAndCoverUpload';
import { useApi } from 'api/';

function AccordionBookUpdate() {
  const api = useApi();
  const { bookId } = useParams();
  const [state, setState] = useState({
    isLoading: true,
    book: {},
    editPage: false,
  });
  async function initialize() {
    try {
      const result = await api.fetchOneCreatorBook(bookId);
      const { book: tempbook } = result;
      tempbook.subject = tempbook.subject
        ? tempbook.subject.split(';')
        : tempbook.subject;
      tempbook.keywords = tempbook.keywords
        ? tempbook.keywords.split(';')
        : tempbook.keywords;
      setState({
        book: tempbook,
        isLoading: false,
        editPage: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    initialize();
  }, [bookId, api]);

  if (state.isLoading) return 'Loading...';

  return (
    <AccordionBookAndCoverUpload
      text="1. Update E-book and Cover"
      editPage={state.editPage}
      bookData={state.book}
    />
  );
}
export default AccordionBookUpdate;
