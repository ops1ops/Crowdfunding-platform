import { GET_USER_IFNO, GET_USER_IFNO_FAIL, GET_USER_IFNO_SUCCESS } from './constants';
import {
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGN_FAIL,
    DELETE_CAMPAIGN_SUCCESS,
} from '../CampaignPage/constants';

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
        case DELETE_CAMPAIGN:
            return { ...state, isLoading: true, error: '' };
        case DELETE_CAMPAIGN_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case DELETE_CAMPAIGN_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    campaigns: state.user.campaigns.filter(
                        item => Number(item.id) !== Number(action.payload)
                    ),
                },
                isLoading: false,
            };
        default:
            return state;
    }
};
