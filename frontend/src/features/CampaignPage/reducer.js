import {
    CLEAR_ERRORS,
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGN_FAIL, DELETE_CAMPAIGN_SUCCESS,
    GET_CAMPAIGN,
    GET_CAMPAIGN_FAIL,
    GET_CAMPAIGN_SUCCESS, RESET_DELETING
} from './constants';

const initialState = {
    isLoading: false,
    error: '',
    campaign: {},
    isDeleted: false,
};

export const campaignPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAMPAIGN:
            // return { ...state, isLoading: true, error: '' };
            return { ...initialState, isLoading: true};
        case GET_CAMPAIGN_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case GET_CAMPAIGN_SUCCESS:
            return { ...state, campaign: { ...action.payload }, isLoading: false };
        case DELETE_CAMPAIGN:
            return { ...state, isLoading: true, error: '' };
        case DELETE_CAMPAIGN_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case DELETE_CAMPAIGN_SUCCESS:
            return { ...state, campaign: {}, isDeleted: true, isLoading: false };
        case RESET_DELETING:
            return { ...state, isDeleted: false};
        case CLEAR_ERRORS:
            return { ...state, error: ''};
        default:
            return state;
    }
};
