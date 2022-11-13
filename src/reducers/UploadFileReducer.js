export const UPLOAD_PERCENTAGE = 'UPLOAD_PERCENTAGE';

const UploadFileReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_PERCENTAGE: {
      return {
        ...action.payload,
      };
    }
    default:
      return {
        state,
      };
  }
};

export default UploadFileReducer;
