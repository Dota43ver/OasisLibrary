import {
  ALPHABETICAL_SORT,
  CLEAN_CACHE,
  GET_BOOKS,
  GET_BOOK_DETAILS,
  PRICE_SORT,
  SCORE_SORT,
} from "../actions/types";

const initialState = {
  books: [],
  bookDetails: [],
  genres: [],
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
    case "POST_BOOK":
      return {
        ...state,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload.data,
      };
    case CLEAN_CACHE:
      return {
        ...state,
        bookDetails: initialState.bookDetails,
      };
    case ALPHABETICAL_SORT:
      let sortedBooks = [...state.books];
      sortedBooks =
        action.payload === "atoz"
          ? state.books.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : state.books.sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });
      return {
        ...state,
        books: sortedBooks,
      };
    case SCORE_SORT:
      let sortedBooksByScore = [...state.books];
      sortedBooksByScore =
        action.payload === "asc"
          ? state.books.sort(function (a, b) {
              if (a.score > b.score) return 1;
              if (a.score < b.score) return -1;
              return 0;
            })
          : state.books.sort(function (a, b) {
              if (a.score < b.score) return 1;
              if (a.score > b.score) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedBooksByScore,
      };

    case PRICE_SORT:
      let sortedBooksByPrice = [...state.books];
      sortedBooksByPrice =
        action.payload === "asc"
          ? state.books.sort(function (a, b) {
              if (a.price > b.price) return 1;
              if (a.price < b.price) return -1;
              return 0;
            })
          : state.books.sort(function (a, b) {
              if (a.price < b.price) return 1;
              if (a.price > b.price) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedBooksByPrice,
      };
    default:
      return state;
  }
}
