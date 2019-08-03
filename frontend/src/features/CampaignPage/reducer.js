import {
    CLEAR_ERRORS,
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGN_FAIL,
    DELETE_CAMPAIGN_SUCCESS,
    GET_CAMPAIGN,
    GET_CAMPAIGN_FAIL,
    GET_CAMPAIGN_SUCCESS,
    RESET_DELETING,
} from './constants';
import {
    SUPPORT_CAMPAIGN,
    SUPPORT_CAMPAIGN_FAIL,
    SUPPORT_CAMPAIGN_SUCCESS,
} from './RewardsSection/constants';

const initialState = {
    isLoading: false,
    isSupportloading: false,
    error: '',
    errorSupport: '',
    message: '',
    campaign: {},
    isDeleted: false,
};

export const campaignPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUPPORT_CAMPAIGN:
            // return { ...state, isLoading: true, error: '' };
            return { ...state, isSupportloading: true };
        case SUPPORT_CAMPAIGN_FAIL:
            return {
                ...state,
                errorSupport: action.payload,
                isSupportloading: false,
            };
        case SUPPORT_CAMPAIGN_SUCCESS:
            return {
                ...state,
                campaign: { ...state.campaign, currentAmount: action.payload },
                isSupportloading: false,
            };
        case GET_CAMPAIGN:
            return { ...initialState, isLoading: true };
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
            return { ...state, isDeleted: false };
        case CLEAR_ERRORS:
            return { ...state, error: '' };
        default:
            return state;
    }
};
