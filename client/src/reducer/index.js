import {
  ADD_FAVS,
  ADD_TO_CART,
  ALPHABETICAL_SORT,
  CHECKOUT_CART,
  CLEAN_CACHE,
  DECREASE_QUANTITY,
  GENRE_FILTER,
  GET_AUTHOR_BOOKS,
  GET_AUTHOR_DETAILS,
  GET_BOOKS,
  GET_BOOK_DETAILS,
  GET_GENRES,
  GET_NAME_BOOKS,
  INCREASE_QUANTITY,
  LANGUAGE_FILTER,
  POST_BOOK,
  PRICE_SORT,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAVS,
  SAGA_FILTER,
  SCORE_SORT,
<<<<<<< HEAD
  GET_USERS,
=======
  UPDATE_BOOK_STOCK,
>>>>>>> 51dc584120962a3f7a434517567d5297b1b5426f
} from "../actions/types";

const initialState = {
  allBooks: [],
  books: [],
  bookDetails: [],
  genres: [],
  cart: [],
  purchasedCart: [],
  favs: [],
  author: [],
  authorDetails: [],
  authorBooks: [],
  user: [],
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
        author: action.payload.author,
      };
    case GET_AUTHOR_DETAILS:
      const allBooksAuthors = state.allBooks;
      const filterByAuthors = allBooksAuthors.filter(
        (b) => b.author === state.authorDetails.name
      );
      return {
        ...state,
        authorDetails: action.payload,
        authorBooks: filterByAuthors,
      };
    // case GET_AUTHOR_DETAILS_NAME:
    //   return {
    //     ...state,
    //     authorDetails: action.payload,
    //   };
    case GET_AUTHOR_BOOKS:
      const allBooksAuthor = state.allBooks;
      const filterByAuthor = allBooksAuthor.filter(
        (b) => b.author === action.payload
      );
      return {
        ...state,
        authorBooks: filterByAuthor,
        authorDetails: [
          state.bookDetails.authorDescription,
          state.bookDetails.authorImg,
          state.bookDetails.author,
        ],
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
        bookDetails: {
          ...state.bookDetails,
          // excluye el estado del stock del libro del estado inicial
          stock: state.bookDetails.stock,
        },
        author: initialState.author,
        authorDetails: initialState.authorDetails,
      };
    // case CLEAN_CACHE_AUTHOR:
    //   return {
    //     ...state,
    //     authorDetails: initialState.authorDetails,
    //   };
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
      const book = state.cart.find((b) => b.id === action.payload.id);
      if (book) {
        return {
          ...state,
          cart: state.cart.map((b) => {
            if (b.id === action.payload.id) {
              return { ...b, quantity: b.quantity + action.payload.quantity };
            }
            return b;
          }),
        };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((book) => book.id !== action.payload),
      };
    case DECREASE_QUANTITY:
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        } else {
          return item;
        }
      });

      // Devolvemos el nuevo estado del carrito, eliminando los productos con cantidad 0.
      return {
        ...state,
        cart: updatedCart.filter((item) => item !== null),
      };
    case INCREASE_QUANTITY:
      const updatedCartt = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });

      // Devolvemos el nuevo estado del carrito sin modificar.
      return {
        ...state,
        cart: updatedCartt,
      };

    case ADD_FAVS:
      return {
        ...state,
        favs: [...state.favs, action.payload],
      };

    case REMOVE_FROM_FAVS:
      return {
        ...state,
        favs: state.favs.filter((i) => i.id !== action.payload),
      };

    case CHECKOUT_CART: {
      return {
        ...state,
        purchasedCart: action.payload,
        cart: [],
      };
    }

    case GET_USERS: { 
      return {
        ...state,
        user: action.payload
      }
    } 

    case UPDATE_BOOK_STOCK:
      // Modifica el estado para actualizar el stock del libro
      return {
        ...state,
        bookDetails: {
          ...state.bookDetails,
          stock: action.payload.newStock,
        },
      };
    default:
      return state;
  }
}
