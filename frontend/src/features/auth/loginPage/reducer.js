import {
    USER_LOGIN_SUCCESS,
} from './constants';

const initialState = {
    credential: {},
    isLoading: false,
    isAuthorized: false,
};

export const loginPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { ...state, ...action.user, isLoading: false };
        default:
            return state;
    }
};
