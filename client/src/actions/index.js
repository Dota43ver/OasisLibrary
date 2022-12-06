import axios from 'axios';

export const GET_BOOKS = 'GET_BOOKS';

export const getBooks = () => dispatch => {
    return axios.get('https://638f97bb4bfe20f70ad56a80.mockapi.io/api/oasis/books')
        .then(books => {
            dispatch({
                type: GET_BOOKS,
                payload: books,
            })
        })
        .catch((error) => {
            console.log(error);
        })
}
