import React from 'react';
import { shallow } from 'enzyme';
import { kebabCase } from 'lodash';
import Book from '../Book';

describe('Book', () => {
  const mockBook = {
    title: 'this is a book',
    previewImageUrl: 'http://image-preview.net',
  };
  describe('Render', () => {
    it('Wraps element in link to shopify store', () => {
      const book = shallow(<Book book={mockBook} />);

      const link = book.find('a').prop('href');
      expect(link).toContain(kebabCase(mockBook.title));
      expect(link).toContain('myshopify');
      expect(link).toContain('prescientinnovationsfan2fan');
    });

    it('renders an image with previewImageUrl', () => {
      const book = shallow(<Book book={mockBook} />);
      expect(book.find('img').prop('src')).toEqual(mockBook.previewImageUrl);
    });

    it('renders the title', () => {
      const book = shallow(<Book book={mockBook} />);
      expect(book.text()).toContain(mockBook.title);
    });
  });
});
