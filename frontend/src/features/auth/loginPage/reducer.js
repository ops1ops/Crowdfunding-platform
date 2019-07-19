import {
    USER_LOGIN,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
} from './constants';

const initialState = {
    user: {},
    isLoading: false,
    isAuthorized: false,
    errors: '',
};

export const loginPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, isLoading: true };
        case USER_LOGIN_SUCCESS:
            return { ...state, ...action.data, isLoading: false };
        case USER_LOGIN_FAILURE:
            return { ...state, errors: action.errors, isLoading: false };
        default:
            return state;
    }
};
