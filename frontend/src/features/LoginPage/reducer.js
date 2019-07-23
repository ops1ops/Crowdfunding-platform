import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from './constants';

const initialState = {
    isAuthorized: false,
};

export const loginPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { ...state, ...action.user.data, isAuthorized: true };
        case USER_LOGOUT_SUCCESS:
            return { ...state, isAuthorized: false };
        default:
            return state;
    }
};
