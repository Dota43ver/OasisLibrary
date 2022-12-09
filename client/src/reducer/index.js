import { CLEAN_CACHE, GET_BOOKS, GET_BOOK_DETAILS } from "../actions/types";

const initialState = {
  books: [],
  bookDetails: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload.data,
      };
    case GET_BOOK_DETAILS:
      return {
        ...state,
        bookDetails: action.payload,
      };
    case CLEAN_CACHE:
      return {
        ...state,
        bookDetails: initialState.bookDetails,
      };

    default:
      return state;
  }
}
