import { findIndex } from 'lodash';
export const UPLOAD_START = 'UPLOAD_START';
export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const UPLOAD_UPDATE = 'UPLOAD_UPDATE';

const AccordionBookAndCoverUploadReducer = (uploaddata, action) => {
  switch (action.type) {
    case UPLOAD_START: {
      return [...uploaddata, action.payload];
    }
    case UPLOAD_ERROR: {
      return { ...uploaddata, error: 'Upload failed, try again' };
    }
    case UPLOAD_UPDATE: {
      return uploaddata.map(d =>
        d.id === action.payload.id ? { ...d, isbn: action.payload.isbn } : d,
      );
    }
    default: {
      throw new Error('invalid action for dispatch');
    }
  }
};
export default AccordionBookAndCoverUploadReducer;
