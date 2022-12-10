import axios from "axios";
import { CLEAN_CACHE, GET_BOOKS, GET_BOOK_DETAILS, LOCAL_HOST } from "./types";

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
        `https://6390e9b265ff418311227edc.mockapi.io/api/oasis/books/${id}`
        // `${LOCAL_HOST}/books/${id}` no conecta con el endpoint
      );
      return dispatch({ type: GET_BOOK_DETAILS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNameBooks(name){
  return async function(dispatch){
    try{
      var json = await axios.get(`${LOCAL_HOST}/books?name=`+name);
      return dispatch({
        type: "GET_NAME_BOOKS",
        payload:json.data
      })
    } catch(error){
      console.log(error)
    }
  }
}
