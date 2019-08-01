import {
    SET_CATEGORIES,
    CREATE_CAMPAIGN,
    CREATE_CAMPAIGN_SUCCESS,
    CREATE_CAMPAIGN_FAIL,
    RESET_CAMPAIGN_RESPONSE,
    UPDATE_CAMPAIGN,
    UPDATE_CAMPAIGN_SUCCESS,
    UPDATE_CAMPAIGN_FAIL, SET_EDITING, SET_CREATING,
} from './constants';
import api from '../../services/api';
import {clearErrors} from "../CampaignPage/actions";

export const setCategories = payload => ({
    type: SET_CATEGORIES,
    payload,
});

export const setEditing = () => dispatch => {
    dispatch({ type: SET_EDITING });
};

export const setCreating = () => dispatch => {
    dispatch({ type: SET_CREATING });
};

export const resetCampaignResponse = () => dispatch => {
    dispatch({ type: RESET_CAMPAIGN_RESPONSE });
};

export const createCampaignSuccess = payload => ({
    type: CREATE_CAMPAIGN_SUCCESS,
    payload,
});

export const createCampaignFail = payload => ({
    type: CREATE_CAMPAIGN_FAIL,
    payload,
});

export const updateCampaignSuccess = payload => ({
    type: UPDATE_CAMPAIGN_SUCCESS,
    payload,
});

export const updateCampaignFail = payload => ({
    type: UPDATE_CAMPAIGN_FAIL,
    payload,
});

export const getCategories = () => dispatch => {
    api.categories.getAll().then(categories => {
        dispatch(setCategories(categories));
    });
};

export const createCampaignRequest = data => dispatch => {
    dispatch({ type: CREATE_CAMPAIGN });

    api.campaigns
        .create(data)
        .then(id => {
            dispatch(createCampaignSuccess(id));
        })
        .catch(err => {
            dispatch(createCampaignFail(err));
        });
};

export const updateCampaignRequest = data => dispatch => {
    dispatch({ type: UPDATE_CAMPAIGN });

    api.campaigns
        .update(data)
        .then(id => {
            dispatch(updateCampaignSuccess(id));
        })
        .catch(err => {
            dispatch(updateCampaignFail(err));
            dispatch(clearErrors());
        });
};
