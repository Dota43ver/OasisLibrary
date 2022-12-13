import {
  ADD_TO_CART,
  ALPHABETICAL_SORT,
  CLEAN_CACHE,
  GENRE_FILTER,
  GET_BOOKS,
  GET_BOOK_DETAILS,
  GET_GENRES,
  GET_NAME_BOOKS,
  LANGUAGE_FILTER,
  POST_BOOK,
  PRICE_SORT,
  SAGA_FILTER,
  SCORE_SORT,
  ADD_FAVS
} from "../actions/types";

const initialState = {
  allBooks: [],
  books: [],
  bookDetails: [],
  genres: [],
  cart: [],
  favs: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload.data,
        allBooks: action.payload.data,
      };
    case GET_BOOK_DETAILS:
      return {
        ...state,
        bookDetails: action.payload,
      };
    case POST_BOOK:
      return {
        ...state,
      };
    case GET_GENRES:
      let sortedGenres = action.payload.data;
      sortedGenres = action.payload.data.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      });
      return {
        ...state,
        genres: sortedGenres,
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
      let sortedBooksByScore = state.allBooks;
      sortedBooksByScore =
        action.payload === "desc"
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
        books: sortedBooksByScore,
      };
    case GET_NAME_BOOKS:
      return {
        ...state,
        books: action.payload,
      };

    case PRICE_SORT:
      let sortedBooksByPrice = state.allBooks;
      sortedBooksByPrice =
        action.payload === "asc"
          ? state.books.sort(function (a, b) {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
          })
          : state.books.sort(function (a, b) {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;
            return 0;
          });
      return {
        ...state,
        books: sortedBooksByPrice,
      };
    case GENRE_FILTER:
      const allBooksGenre = state.allBooks;
      if (action.payload === "all") return { ...state, books: state.allBooks };
      const filteredByGenre = allBooksGenre.filter((b) =>
        b.genre?.some((g) => g.toLowerCase() === action.payload.toLowerCase())
      );
      return {
        ...state,
        books: filteredByGenre,
      };
    case SAGA_FILTER:
      const allBookSaga = state.allBooks;
      if (action.payload === "all") return { ...state, books: state.allBooks };
      const filteredBySaga = allBookSaga.filter(
        (b) => b.saga === action.payload
      );
      return {
        ...state,
        books: filteredBySaga,
      };
    case LANGUAGE_FILTER:
      const allBookLang = state.allBooks;
      if (action.payload === "all") return { ...state, books: state.allBooks };
      const filteredByLang = allBookLang.filter(
        (b) => b.language === action.payload
      );
      return {
        ...state,
        books: filteredByLang,
      };
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };

    case ADD_FAVS:
      return {
        ...state, favs: [...state.favs, action.payload]
      }
    default:
      return state;
  }
}
