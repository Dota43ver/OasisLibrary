import axios from "axios";
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
  // GET_AUTHOR_DETAILS_NAME,
  GET_BOOKS,
  GET_BOOK_DETAILS,
  GET_GENRES,
  GET_NAME_BOOKS,
  INCREASE_QUANTITY,
  LANGUAGE_FILTER,
  LOCAL_HOST,
  PRICE_SORT,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAVS,
  SAGA_FILTER,
  SCORE_SORT,
  GET_USERS,
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
// export function cleanCacheAuthor() {
//   return {
//     type: CLEAN_CACHE_AUTHOR,
//   };
// }
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
// export function getAuthorDetailsName(name) {
//   return async function (dispatch) {
//     try {
//       var response = await axios.get(`${LOCAL_HOST}/authors/name/${name}`);
//       return dispatch({
//         type: GET_AUTHOR_DETAILS_NAME,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

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

export function removeFromFavs(id) {
  return {
    type: REMOVE_FROM_FAVS,
    payload: id,
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

export function getAuthorBooks(payload) {
  return {
    type: GET_AUTHOR_BOOKS,
    payload,
  };
}

export function checkoutCart(cart, user) {
  //pasar el user y cart

  const body = {
    name: "mili",
    email: "mili@hotmail.com",
    shoppingCart: cart,
  };

  console.log(body);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return async function (dispatch) {
    let checkoutCartId = await axios.post(
      "http://localhost:3001/checkout",
      body,
      config
    );
    console.log(checkoutCartId);
    return dispatch({
      type: CHECKOUT_CART,
      payload: checkoutCartId.data,
    });
  };
}

export const getUsers = () => async (dispatch) => {
  try {
    const usuarios = await fetch("http://localhost:3001/users/profile", {
      method: "GET",
      headers: { token: localStorage.token }
    });

    const parseRes = await usuarios.json()

    return dispatch({
      type: GET_USERS,
      payload: parseRes,
    })
  } catch (error) {
    console.log(error)
  }
}

// export const getUsers = () => async (dispatch) => {
//   try {
//     const usuarios = await axios.get(`/users`);

//     return dispatch({
//       type: 'GET_USERS',
//       payload: usuarios.data
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

