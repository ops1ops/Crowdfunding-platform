import {
    ADD_REWARD,
    DELETE_REWARD_FAIL,
    DELETE_REWARD_REQUEST,
    DELETE_REWARD_SUCCESS,
    GET_REWARDS,
    GET_REWARDS_FAIL,
    GET_REWARDS_SUCCESS,
    UPDATE_REWARD,
} from './constants';

const initialState = {
    isLoading: false,
    error: '',
    rewards: [],
};

export const rewardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REWARDS:
            // return { ...state, isLoading: true, error: '' };
            return { ...initialState, isLoading: true };
        case GET_REWARDS_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case GET_REWARDS_SUCCESS:
            return { ...state, rewards: action.payload, isLoading: false };
        case ADD_REWARD:
            return { ...state, rewards: [...state.rewards, { ...action.payload }] };
        case DELETE_REWARD_REQUEST:
            return { ...state, isLoading: true };
        case DELETE_REWARD_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case DELETE_REWARD_SUCCESS:
            return {
                ...state,
                rewards: state.rewards.filter(
                    item => Number(item.id) !== Number(action.payload.id)
                ),
                isLoading: false,
            };
        case UPDATE_REWARD:
            return {
                ...state,
                rewards: state.rewards.map(item => {
                    if (item.id === action.payload.id) return { ...action.payload };
                    return item;
                }),
            };
        default:
            return state;
    }
};
