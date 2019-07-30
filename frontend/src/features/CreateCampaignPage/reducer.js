import {
    SET_CATEGORIES,
    CREATE_CAMPAIGN,
    CREATE_CAMPAIGN_SUCCESS,
    CREATE_CAMPAIGN_FAIL, RESET_CAMPAIGN,
} from './constants';

const initialState = {
    isLoading: false,
    error: '',
    campaign: {},
};

export const createCampaignPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CAMPAIGN:
            return { ...state, isLoading: true };
        case CREATE_CAMPAIGN_FAIL:
            return { ...state, error: action.payload.response.data.errors, isLoading: false };
        case CREATE_CAMPAIGN_SUCCESS:
            return { ...state, campaign: { id: action.payload.id }, isLoading: false };
        case SET_CATEGORIES:
            return { ...state, ...action.payload };
        case RESET_CAMPAIGN:
            return { ...state, campaign: {}};
        default:
            return state;
    }
};
