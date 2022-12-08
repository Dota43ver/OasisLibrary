import axios from "axios";

export const GET_BOOKS = "GET_BOOKS";
export const CLEAN_CACHE = "CLEAN_CACHE";
export const GET_BOOK_DETAILS = "GET_BOOK_DETAILS";

export const getBooks = () => (dispatch) => {
  return axios
    .get("https://6390e9b265ff418311227edc.mockapi.io/api/oasis/books")
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
      );
      return dispatch({ type: GET_BOOK_DETAILS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}
