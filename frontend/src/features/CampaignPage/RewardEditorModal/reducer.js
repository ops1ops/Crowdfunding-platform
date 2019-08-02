import {
    CREATE_REWARD, CREATE_REWARD_FAIL, CREATE_REWARD_SUCCESS, UPDATE_REWARD_REQUEST, UPDATE_REWARD_FAIL, UPDATE_REWARD_SUCCESS,
} from './constants';

const initialState = {
    isLoading: false,
    error: '',
    reward: {},
    isCreating: true,
};

export const createRewardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REWARD:
            return { ...state, isLoading: true, error: '' };
        case CREATE_REWARD_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case CREATE_REWARD_SUCCESS:
            return { ...state, reward: { id: action.payload }, isLoading: false };
        case UPDATE_REWARD_REQUEST:
            return { ...state, isLoading: true, error: '' };
        case UPDATE_REWARD_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case UPDATE_REWARD_SUCCESS:
            return { ...state, reward: { id: action.payload }, isLoading: false };
        default:
            return state;
    }
};
