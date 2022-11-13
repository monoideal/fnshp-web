import React from 'react';
import { shallow } from 'enzyme';
import Books from '../Books';
import Book from '../Book';

describe('Books', () => {
  let fetchBooks;
  const mockBooks = {
    mine: [
      { id: 1, title: 'this is a book', previewImageUrl: 'http://book.one' },
      {
        id: 2,
        title: 'this is another book',
        previewImageUrl: 'http://book.two',
      },
    ],
    all: [
      { id: 3, title: 'this is a book', previewImageUrl: 'http://book.one' },
      {
        id: 4,
        title: 'this is another book',
        previewImageUrl: 'http://book.two',
      },
      { id: 5, title: 'one more book', previewImageUrl: 'http://book.three' },
    ],
  };

  beforeEach(() => {
    fetchBooks = () => Promise.resolve(mockBooks);
  });

  describe('Render', () => {
    it('Renders Book component for each selected book', async () => {
      const books = shallow(<Books fetchBooks={fetchBooks} />);

      await fetchBooks();
      books.instance().select('all');
      expect(books.find(Book)).toHaveLength(3);
      books.instance().select('mine');
      expect(books.find(Book)).toHaveLength(2);
    });
  });
});
