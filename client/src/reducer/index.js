import { CLEAN_CACHE, GET_BOOKS, GET_BOOK_DETAILS } from "../actions/types";

const initialState = {
  books: [],
  bookDetails: [],
  genres: []
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
    case 'POST_BOOK':
      return{
        ...state
      }
    case "GET_GENRES":
      return{
        ...state,
        genres: action.payload.data
      }
    case CLEAN_CACHE:
      return {
        ...state,
        bookDetails: initialState.bookDetails,
      };
      case 'GET_NAME_BOOKS':
            return{
              ...state,
              books: action.payload
            }

    default:
      return state;
  }
}
