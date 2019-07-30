import {
    SET_CATEGORIES,
    CREATE_CAMPAIGN,
    CREATE_CAMPAIGN_SUCCESS,
    CREATE_CAMPAIGN_FAIL, RESET_CAMPAIGN
} from './constants';
import api from '../../services/api';

export const setCategories = payload => ({
    type: SET_CATEGORIES,
    payload,
});

export const createCampaignSuccess = payload => ({
    type: CREATE_CAMPAIGN_SUCCESS,
    payload,
});

export const createCampaignFail = payload => ({
    type: CREATE_CAMPAIGN_FAIL,
    payload,
});

export const resetCampaign = () => dispatch => {
    dispatch({type: RESET_CAMPAIGN});
};


export const getCategories = () => dispatch => {
    api.categories.getAll().then(categories => {
        dispatch(setCategories(categories));
    });
};

export const createCampaignRequest = data => dispatch => {
    dispatch({ type: CREATE_CAMPAIGN });

    api.campaigns.create(data)
        .then(id => {
            dispatch(createCampaignSuccess(id));
        })
        .catch(err => dispatch(createCampaignFail(err)));
};
