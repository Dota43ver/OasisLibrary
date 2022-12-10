import axios from "axios";
import {
  ALPHABETICAL_SORT,
  CLEAN_CACHE,
  GENRE_FILTER,
  GET_BOOKS,
  GET_BOOK_DETAILS,
  LOCAL_HOST,
  PRICE_SORT,
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
      var response = await axios.get(`${LOCAL_HOST}/books/${id}`);
      return dispatch({ type: GET_BOOK_DETAILS, payload: response.data });
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
        type: "GET_GENRES",
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
