import { GET_USER_IFNO, GET_USER_IFNO_FAIL, GET_USER_IFNO_SUCCESS } from './constants';

const initialState = {
    isLoading: false,
    error: '',
    user: {},
};

export const userPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_IFNO:
            return { ...state, isLoading: true };
        case GET_USER_IFNO_FAIL:
            return { ...state, error: action.payload, isLoading: false };
        case GET_USER_IFNO_SUCCESS:
            return { ...state, user: { ...action.payload }, isLoading: false };
        default:
            return state;
    }
};
