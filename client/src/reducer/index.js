import { GET_BOOKS } from "../actions";

const initialState = {
    books: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_BOOKS: 
        return {
            ...state,
            books: action.payload.data,
        };
        default:
            return state;
    }
}
