export const SUBMIT_FORM = 'SUBMIT_FORM';
export const SUBMIT_ERROR = 'SUBMIT_ERROR';

const AccoridionBookInfoReducer = (state, action) => {
  switch (action.type) {
    case SUBMIT_FORM: {
      return {
        ...state,
        book: action.payload,
        error: '',
      };
    }
    case SUBMIT_ERROR: {
      return {
        book: {},
        error: 'somthing went wrong',
      };
    }
    default:
      return {
        state,
      };
  }
};

export default AccoridionBookInfoReducer;
