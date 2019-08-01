import {
    GET_CAMPAIGN_SUCCESS,
    GET_CAMPAIGN_FAIL,
    GET_CAMPAIGN,
    DELETE_CAMPAIGN,
    CLEAR_ERRORS,
    DELETE_CAMPAIGN_SUCCESS, DELETE_CAMPAIGN_FAIL, RESET_DELETING
} from './constants';
import api from '../../services/api';

export const getCampaignSuccess = payload => ({
    type: GET_CAMPAIGN_SUCCESS,
    payload,
});

export const getCampaignFail = payload => ({
    type: GET_CAMPAIGN_FAIL,
    payload,
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});

export const resetDeleting = () => ({
    type: RESET_DELETING,
});

export const deleteCampaignSuccess = payload => ({
    type: DELETE_CAMPAIGN_SUCCESS,
    payload,
});

export const deleteCampaignFail = payload => ({
    type: DELETE_CAMPAIGN_FAIL,
    payload,
});

export const getCampaignRequest = id => dispatch => {
    dispatch({ type: GET_CAMPAIGN });

    api.campaigns
        .getById(id)
        .then(campaign => {
            dispatch(getCampaignSuccess(campaign));
        })
        .catch(err => {
            dispatch(getCampaignFail(err));
        });
};

export const deleteCampaignRequest = id => dispatch => {
    dispatch({ type: DELETE_CAMPAIGN });

    api.campaigns
        .delete(id)
        .then(data => {
            dispatch(deleteCampaignSuccess(data));
            dispatch(resetDeleting());
        })
        .catch(err => {
            dispatch(deleteCampaignFail(err));
            dispatch(clearErrors());
        });
};
