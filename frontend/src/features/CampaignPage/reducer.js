import { GET_CAMPAIGN, GET_CAMPAIGN_FAIL, GET_CAMPAIGN_SUCCESS } from './constants';

const initialState = {
    isLoading: false,
    error: '',
    campaign: {},
};

export const campaignPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAMPAIGN:
            return { ...state, isLoading: true, error: '' };
        case GET_CAMPAIGN_FAIL:
            return {
                ...state,
                error: action.payload.response.data.errors,
                isLoading: false,
            };
        case GET_CAMPAIGN_SUCCESS:
            return { ...state, campaign: { ...action.payload }, isLoading: false };
        default:
            return state;
    }
};
