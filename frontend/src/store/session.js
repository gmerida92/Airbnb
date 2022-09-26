import { csrfFetch } from './csrf';

const initialState = {
    user: null
}

const SET_USER = '/api/setUser'
const REMOVE_USER = '/api/removeUser'
// const NEW_USER = '/api/newUser'


//Redux action creaters
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
};

// const newUser = (user) => {
//     return {
//         type: NEW_USER,
//         payload: user
//     }
// };


// Thunk action creators
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;

    const response = await csrfFetch('/api/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            credential,
            password
        }),
    });

    const data = await response.json();
    dispatch(setUser(data));
    return response;
}



export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/users/myaccount");

    const data = await response.json();
    dispatch(setUser(data));
    return response;
}



export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, email, username, password } = user;

    const response = await csrfFetch('/api/users/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            username,
            password
        })
    });

    const data = response.json();
    dispatch(setUser(data));
    return response;
}



export const logout = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/users/logout', {
        method: "DELETE"
    });

    dispatch(removeUser());
    return response
}



//Redux reducer
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = { ...state };
            newState.user = action.payload;
            return newState;
        // case NEW_USER:
        //     newState = { ...state };
        //     newState.user = action.payload
        case REMOVE_USER:
            newState.user = null;
            return newState;
        default:
            return state
    }
}

export default sessionReducer;