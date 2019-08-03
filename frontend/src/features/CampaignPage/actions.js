import {
    GET_CAMPAIGN_SUCCESS,
    GET_CAMPAIGN_FAIL,
    GET_CAMPAIGN,
    DELETE_CAMPAIGN,
    CLEAR_ERRORS,
    DELETE_CAMPAIGN_SUCCESS,
    DELETE_CAMPAIGN_FAIL,
    RESET_DELETING,
    RATE_CAMPAIGN,
    RATE_CAMPAIGN_FAIL,
    RATE_CAMPAIGN_SUCCESS,
    CLEAR_RATED_BY_USER,
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

export const rateCampaignSuccess = payload => ({
    type: RATE_CAMPAIGN_SUCCESS,
    payload,
});

export const rateCampaignFail = payload => ({
    type: RATE_CAMPAIGN_FAIL,
    payload,
});

export const clearRatedByUser = () => ({
    type: CLEAR_RATED_BY_USER,
});

export const getCampaignRequest = data => dispatch => {
    dispatch({ type: GET_CAMPAIGN });

    api.campaigns
        .getById(data)
        .then(res => {
            const campaign = {
                ...res.campaign,
                avgRate: res.avgRate,
                ratedByUser: res.ratedBy,
                ratedByAllCount: res.ratedByCount,
            };

            dispatch(getCampaignSuccess(campaign));
        })
        .catch(err => {
            dispatch(getCampaignFail(err));
        });
};

export const rateCampaignRequest = data => dispatch => {
    dispatch({ type: RATE_CAMPAIGN });

    api.campaigns
        .rateCampaign(data)
        .then(res => {
            dispatch(rateCampaignSuccess(res));
        })
        .catch(err => {
            dispatch(rateCampaignFail(err.response.data.errors));
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
