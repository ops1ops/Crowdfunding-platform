import { GET_USER_IFNO_SUCCESS, GET_USER_IFNO_FAIL, GET_USER_IFNO } from './constants';
import api from '../../services/api';
import {DELETE_CAMPAIGN, DELETE_CAMPAIGN_FAIL, DELETE_CAMPAIGN_SUCCESS} from "../CampaignPage/constants";
import {UPDATE_REWARD_REQUEST} from "../CampaignPage/RewardEditorModal/constants";
import {updateReward} from "../CampaignPage/RewardsSection/actions";
import {updateRewardFail, updateRewardSuccess} from "../CampaignPage/RewardEditorModal/actions";

export const getUserInfoSuccess = payload => ({
    type: GET_USER_IFNO_SUCCESS,
    payload,
});

export const getUserInfoFail = payload => ({
    type: GET_USER_IFNO_FAIL,
    payload,
});

export const deleteCampaignSuccess = payload => ({
    type: DELETE_CAMPAIGN_SUCCESS,
    payload,
});

export const deleteCampaignFail = payload => ({
    type: DELETE_CAMPAIGN_FAIL,
    payload,
});

export const deleteCampaignRequest = id => dispatch =>
    new Promise(function(resolve, reject) {
        dispatch({ type: DELETE_CAMPAIGN });

        api.campaigns
            .delete(id)
            .then(response => {
                dispatch(deleteCampaignSuccess(response.id));
                resolve(response.id);
            })
            .catch(err => {
                dispatch(deleteCampaignFail(err));
                reject(err);
            });
    });


export const getUserInfoRequest = id => dispatch => {
    dispatch({ type: GET_USER_IFNO });

    api.user
        .getById(id)
        .then(userInfo => {
            dispatch(getUserInfoSuccess(userInfo.user));
        })
        .catch(err => {
            dispatch(getUserInfoFail(err.response.data.errors));
        });
};
