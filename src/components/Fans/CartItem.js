import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { formatCurrency, getResizedImage } from 'util/helpers';

const bookPreviewStyles = {
  container: {
    display: 'flex',
    width: '100%',
    fontSize: '14px',
  },
  bookCartImage: {
    width: '140px',
    '& > img': {
      maxHeight: '150px',
    },
  },
  bookCartDetails: {
    minWidth: '400px',
  },
  author: {
    marginBottom: '15px',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

const CartItem = withStyles(bookPreviewStyles)(({ classes, book }) => (
  <div className={classes.container}>
    <div className={classes.bookCartImage}>
      <img
        alt="book preview"
        className={classes.previewImage}
        src={getResizedImage(book.coverUrl, 600)}
      />
    </div>
    <div className={classes.bookCartDetails}>
      <h2 className={classes.title}>{book.title}</h2>
      <div className={classes.author}>
        By {book.contributors.map(a => a.displayName).join(', ')}
      </div>
      Price: <br />
      <div className={classes.price}>{formatCurrency(book.price)}</div>
    </div>
  </div>
));

export default CartItem;
