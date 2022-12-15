import axios from "axios";
import {
  ADD_FAVS,
  ADD_TO_CART,
  ALPHABETICAL_SORT,
  CLEAN_CACHE,
  DECREASE_QUANTITY,
  GENRE_FILTER,
  GET_AUTHOR_DETAILS,
  GET_BOOKS,
  GET_BOOK_DETAILS,
  GET_GENRES,
  GET_NAME_BOOKS,
  INCREASE_QUANTITY,
  LANGUAGE_FILTER,
  LOCAL_HOST,
  PRICE_SORT,
  REMOVE_FROM_CART,
  SAGA_FILTER,
  SCORE_SORT,
} from "./types";

export const getBooks = () => (dispatch) => {
  return axios
    .get(`${LOCAL_HOST}/books`)
    .then((books) => {
      dispatch({
        type: GET_BOOKS,
        payload: books,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
export function cleanCache() {
  return {
    type: CLEAN_CACHE,
  };
}

export function getBookDetails(id) {
  return async function (dispatch) {
    try {
      var response = await axios.get(
        // `https://6390e9b265ff418311227edc.mockapi.io/api/oasis/books/${id}`
        `${LOCAL_HOST}/books/${id}`
      );
      return dispatch({ type: GET_BOOK_DETAILS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getAuthorDetails(id) {
  return async function (dispatch) {
    try {
      var response = await axios.get(`${LOCAL_HOST}/authors/${id}`);
      return dispatch({ type: GET_AUTHOR_DETAILS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getNameBooks(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${LOCAL_HOST}/books?name=` + name);
      return dispatch({
        type: GET_NAME_BOOKS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postBook(info) {
  return async function (dispatch) {
    var json = await axios.post(`${LOCAL_HOST}/books`, info);
    return json;
  };
}

/* export function getGenres(){
  return async function (dispatch){
      var gen = await axios.get("http://localhost:3001/genres")
      return dispatch({
          type: "GET_GENRES",
          payload: gen.data
      })
  }
} */

export const getGenres = () => (dispatch) => {
  return axios
    .get(`${LOCAL_HOST}/genres`)
    .then((genre) => {
      dispatch({
        type: GET_GENRES,
        payload: genre,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
export function aplhabeticalSort(payload) {
  return {
    type: ALPHABETICAL_SORT,
    payload,
  };
}

export function scoreSort(payload) {
  return {
    type: SCORE_SORT,
    payload,
  };
}

export function priceSort(payload) {
  return {
    type: PRICE_SORT,
    payload,
  };
}

export function genreFilter(payload) {
  return {
    type: GENRE_FILTER,
    payload,
  };
}
export function sagaFilter(payload) {
  return {
    type: SAGA_FILTER,
    payload,
  };
}
export function languageFilter(payload) {
  return {
    type: LANGUAGE_FILTER,
    payload,
  };
}
export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
}

export function addFavs(payload) {
  return {
    type: ADD_FAVS,
    payload,
  };
}
export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
}
export function decreaseQuantity(id) {
  return {
    type: DECREASE_QUANTITY,
    payload: id,
  };
}
export function increaseQuantity(id) {
  return {
    type: INCREASE_QUANTITY,
    payload: id,
  };
}
