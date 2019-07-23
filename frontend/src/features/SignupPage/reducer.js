import { USER_SIGNUP } from './constants';

const initialState = {
    isAuthorized: false,
};

export const signupPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNUP:
            return { ...state, ...action.user.data, isAuthorized: true };
        default:
            return state;
    }
};
