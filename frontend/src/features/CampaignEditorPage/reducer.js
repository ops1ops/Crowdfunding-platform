import {
    SET_CATEGORIES,
    CREATE_CAMPAIGN,
    CREATE_CAMPAIGN_SUCCESS,
    CREATE_CAMPAIGN_FAIL,
    RESET_CAMPAIGN_RESPONSE, UPDATE_CAMPAIGN, UPDATE_CAMPAIGN_FAIL, UPDATE_CAMPAIGN_SUCCESS, SET_EDITING, SET_CREATING,
} from './constants';
import {CLEAR_ERRORS} from "../CampaignPage/constants";

const initialState = {
    isLoading: false,
    error: '',
    campaign: {},
    isCreating: true,
};

export const createCampaignPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CAMPAIGN:
            return { ...state, isLoading: true, error: '' };
        case CREATE_CAMPAIGN_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case CREATE_CAMPAIGN_SUCCESS:
            return { ...state, campaign: { id: action.payload.id }, isLoading: false };
        case UPDATE_CAMPAIGN:
            return { ...state, isLoading: true, error: '' };
        case UPDATE_CAMPAIGN_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case UPDATE_CAMPAIGN_SUCCESS:
            return { ...state, campaign: { id: action.payload.id }, isLoading: false };
        case SET_CATEGORIES:
            return { ...state, ...action.payload };
        case SET_EDITING:
            return { ...state, isCreating: false };
        case SET_CREATING:
            return { ...state, isCreating: true };
        case RESET_CAMPAIGN_RESPONSE:
            return { ...state, campaign: {} };
        case CLEAR_ERRORS:
            return { ...state, error: ''};
        default:
            return state;
    }
};
