import axios from "axios";
import {
  ACTIVE_ACCOUNT,
  ADD_FAVS,
  ADD_TO_CART,
  ALPHABETICAL_SORT,
  AUTHOR_FILTER,
  CHECKOUT_CART,
  CLEAN_CACHE,
  CLEAR_CART,
  DECREASE_QUANTITY,
  DELETE_ACCOUNT,
  GENRE_FILTER,
  GET_ALL_USERS,
  GET_AUTHORS,
  GET_AUTHOR_BOOKS,
  GET_AUTHOR_DETAILS,
  // GET_AUTHOR_DETAILS_NAME,
  GET_BOOKS,
  GET_BOOK_DETAILS,
  GET_CART,
  GET_FAVS,
  GET_GENRES,
  GET_NAME_BOOKS,
  GET_ORDER,
  GET_REVIEW,
  GET_USERS,
  INCREASE_QUANTITY,
  LANGUAGE_FILTER,
  LOCAL_HOST,
  PRICE_SORT,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAVS,
  SAGA_FILTER,
  SCORE_SORT,
  UPDATE_BOOK,
  UPDATE_BOOK_STOCK_SUCCESS,
  UPDATE_USERS,
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
export const getAllUsers = () => (dispatch) => {
  console.log(`${LOCAL_HOST}/users/all`);
  return axios
    .get(`${LOCAL_HOST}/users/all`)
    .then((users) => {
      dispatch({
        type: GET_ALL_USERS,
        payload: users,
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
export const getAuthors = () => (dispatch) => {
  return axios
    .get(`${LOCAL_HOST}/authors`)
    .then((author) => {
      dispatch({
        type: GET_AUTHORS,
        payload: author,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

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

export function postReview(info) {
  return async function (dispatch) {
    var json = await axios.post(`${LOCAL_HOST}/reviews`, info);
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

export const getReview = () => (dispatch) => {
  return axios.get(`${LOCAL_HOST}/reviews`).then((review) => {
    dispatch({
      type: GET_REVIEW,
      payload: review.data,
    });
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
export function authorFilter(payload) {
  return {
    type: AUTHOR_FILTER,
    payload,
  };
}

export function addToCart(book) {
  return (dispatch, getState) => {
    dispatch({ type: ADD_TO_CART, payload: book });
    const currentBook = getState().bookDetails;
    const newStock = currentBook.stock - book.quantity;
    // dispatch(updateBookStock(currentBook.id, newStock));
  };
}

export const getFavs = (userId) => async (dispatch) => {
  try {
    const favs = await axios.get(`${LOCAL_HOST}/favs/${userId}`);

    return dispatch({
      type: GET_FAVS,
      payload: favs.data,
    });
  } catch (error) {
    console.log(error);
  }
};

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

export function checkoutCart(cart, user, cupon) {
  //pasar el user y cart

  const body = {
    user,
    shoppingCart: { productList: cart, cupon },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return async function (dispatch) {
    let checkoutCartId = await axios.post(
      `${LOCAL_HOST}/checkout`,
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
export function checkoutStock() {
  return async function (dispatch, getState) {
    try {
      const cart = getState().cart;
      const books = getState().books;
      for (const book of cart) {
        const updatedBook = books.find((b) => b.id === book.id);
        console.log(updatedBook.stock);
        console.log(book.quantity);
        const updatedStock = updatedBook.stock - book.quantity;
        await axios.patch(`${LOCAL_HOST}/books/${book.id}`, {
          name: book.name,
          stock: updatedStock,
          price: book.price,
          description: updatedBook.description,
        });
      }

      // Dispatch una acción para limpiar el carrito y actualizar el estado de los libros
      dispatch({ type: CLEAR_CART });
      dispatch(getBooks());
    } catch (error) {
      console.log(error); // <-- Añade esta línea para ver el error en consola
    }
  };
}
export function updateBook(book) {
  return async function (dispatch) {
    try {
      // Envía una solicitud PATCH al servidor con la información actualizada del libro
      await axios.patch(`${LOCAL_HOST}/books/${book.id}`, {
        name: book.name,
        stock: book.stock,
        price: book.price,
        description: book.description,
        year: book.year,
        author: book.author,
        saga: book.saga,
        language: book.language,
      });

      // Dispatch una acción para actualizar el estado del libro
      dispatch({ type: UPDATE_BOOK, payload: book });
    } catch (error) {
      console.error(error);
    }
  };
}
// export function destroyBook(id) {
//   console.log(`${LOCAL_HOST}/books/${id}`);
//   return async function (dispatch) {
//     try {
//       await axios.delete(`${LOCAL_HOST}/books/${id}`);
//       dispatch({ type: DELETE_BOOK, payload: id });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// } NO SE COMO ESTO NO FUNCIONA
// export function destroyBook(id) {
//   return async function (dispatch) {
//     try {
//       const res = await axios.delete(`${LOCAL_HOST}/books/${id}`);
//       dispatch({ type: DELETE_BOOK, id });
//       return Promise.resolve(res);
//     } catch (error) {
//       console.log(error);
//       return Promise.reject(error);
//     }
//   };
// }

export function destroyBook(id) {
  // ESTO FUNCIONA PERO NO UTILIZA PROMESAS
  try {
    axios.delete(`${LOCAL_HOST}/books/${id}`);
  } catch (error) {
    console.error(error);
  }
}
export function activeAccount(user) {
  return async function (dispatch) {
    try {
      await axios.patch(`${LOCAL_HOST}/users/all/${user.id}`, {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        password: user.password,
        isActive: true,
        activationToken: user.activationToken,
        token: user.token,
        image: user.image,
      });
      dispatch({ type: ACTIVE_ACCOUNT, payload: user });
    } catch (error) {
      console.error(error);
    }
  };
}
export function deactivateAccount(user) {
  return async function (dispatch) {
    try {
      await axios.patch(`${LOCAL_HOST}/users/all/${user.id}`, {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        password: user.password,
        isActive: false,
        activationToken: user.activationToken,
        token: user.token,
        image: user.image,
      });
      dispatch({ type: ACTIVE_ACCOUNT, payload: user });
    } catch (error) {
      console.error(error);
    }
  };
}
export function makeAdmin(user) {
  try {
    axios.patch(`${LOCAL_HOST}/users/all/${user.id}`, {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: "admin",
      password: user.password,
      isActive: true,
      activationToken: user.activationToken,
      token: user.token,
      image: user.image,
    });
  } catch (error) {
    console.error(error);
  }
}
// export function makeAdmin(user) {
//   return async function (dispatch) {
//     try {
//       await axios.patch(`${LOCAL_HOST}/users/all/${user.id}`, {
//         name: user.name,
//         lastName: user.lastName,
//         email: user.email,
//         role: "admin",
//         password: user.password,
//         isActive: true,
//         activationToken: user.activationToken,
//         token: user.token,
//         image: user.image,
//       });
//       dispatch({ type: ACTIVE_ACCOUNT, payload: user });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// }
export function deleteAccount(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${LOCAL_HOST}/users/all/${id}`);
      dispatch({ type: DELETE_ACCOUNT, payload: id });
    } catch (error) {
      console.error(error);
    }
  };
}

// export function updateBook(
//   id,
//   name,
//   stock,
//   price,
//   description,
//   year,
//   score,
//   author,
//   language,
//   saga
// ) {
//   return async function (dispatch) {
//     try {
//       const response = await axios.patch(`${LOCAL_HOST}/books/${id}`, {
//         name,
//         stock,
//         price,
//         description,
//         year,
//         score,
//         author,
//         language,
//         saga,
//       });

//       dispatch({
//         type: BOOK_FULL_UPDATE,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export const getUsers = () => async (dispatch) => {
  try {
    const usuarios = await axios.get(`${LOCAL_HOST}/users/profile`, {
      headers: { token: localStorage.token },
    });

    return dispatch({
      type: GET_USERS,
      payload: usuarios.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        token: localStorage.token,
      },
    };

    const usuarios = await axios.put(
      `${LOCAL_HOST}/users/profile?id=${id}`,
      data,
      config
    );

    return dispatch({
      type: UPDATE_USERS,
      payload: usuarios.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCart = (userId) => async (dispatch) => {
  try {
    const cart = await axios.get(`${LOCAL_HOST}/cart/${userId}`);

    console.log(cart);
    return dispatch({
      type: GET_CART,
      payload: cart.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCart = (data) => async (dispatch) => {
  try {
    const { bookId, name, price, image, quantity, userId } = data;
    const cart = await axios.post("http://localhost:3001/cart", {
      userId,
      bookId,
      quantity,
    });

    return dispatch(
      addToCart({
        id: bookId,
        name,
        price,
        image,
        quantity,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = (data) => async (dispatch) => {
  try {
    const { bookId, name, price, image, quantity } = data;
    const response = await axios.delete("http://localhost:3001/cart", { data });

    return dispatch(
      removeFromCart({
        id: bookId,
        name,
        price,
        image,
        quantity,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export function updateBookStock(id, newStock) {
  return async function (dispatch) {
    try {
      // Envía la solicitud al servidor para actualizar el libro
      var response = await axios.patch(`${LOCAL_HOST}/books/${id}`, {
        stock: newStock,
      });
      // Dispatch una acción de tipo UPDATE_BOOK_STOCK_SUCCESS con el libro actualizado como payload
      dispatch({ type: UPDATE_BOOK_STOCK_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrders(userId) {
  return async function (dispatch) {
    try {
      const order = await axios.get(`${LOCAL_HOST}/checkout/${userId}`);

      console.log(userId);
      console.log(order.data);
      return dispatch({
        type: GET_ORDER,
        payload: order.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// export function updateBookStock(id, newStock) {
//   return (dispatch) => {
//     try {
//       axios
//         .put(`${LOCAL_HOST}/books/${id}`, {
//           stock: newStock,
//         })
//         .then(() => {
//           console.log(`${LOCAL_HOST}/books/${id}`);
//           dispatch({
//             type: UPDATE_BOOK_STOCK,
//             payload: {
//               id,
//               newStock,
//             },
//           });
//         });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// }
