import { GET_CAMPAIGN_SUCCESS, GET_CAMPAIGN_FAIL, GET_CAMPAIGN } from './constants';
import api from '../../services/api';

export const getCampaignSuccess = payload => ({
    type: GET_CAMPAIGN_SUCCESS,
    payload,
});

export const getCampaignFail = payload => ({
    type: GET_CAMPAIGN_FAIL,
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
