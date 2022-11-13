import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Books from '../Books';

describe('App', () => {
  describe('Render', () => {
    it('Renders Books', () => {
      const app = shallow(<App />);

      expect(app.find(Books)).toHaveLength(1);
    });
  });
});
