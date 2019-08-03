import api from '../../../services/api';
import {
    GET_REWARDS_FAIL,
    GET_REWARDS_SUCCESS,
    GET_REWARDS,
    ADD_REWARD,
    UPDATE_REWARD,
    DELETE_REWARD_SUCCESS,
    DELETE_REWARD_FAIL,
    DELETE_REWARD_REQUEST,
    SUPPORT_CAMPAIGN,
    SUPPORT_CAMPAIGN_SUCCESS,
    SUPPORT_CAMPAIGN_FAIL
} from './constants';
import {UPDATE_REWARD_REQUEST} from "../RewardEditorModal/constants";
import {updateRewardFail, updateRewardSuccess} from "../RewardEditorModal/actions";

export const getRewardsSuccess = payload => ({
    type: GET_REWARDS_SUCCESS,
    payload,
});

export const getRewardsFail = payload => ({
    type: GET_REWARDS_FAIL,
    payload,
});

export const deleteRewardSuccess = payload => ({
    type: DELETE_REWARD_SUCCESS,
    payload,
});

export const deleteRewardFail = payload => ({
    type: DELETE_REWARD_FAIL,
    payload,
});

export const supportCampaignSuccess = payload => ({
    type: SUPPORT_CAMPAIGN_SUCCESS,
    payload,
});

export const supportCampaignFail = payload => ({
    type: SUPPORT_CAMPAIGN_FAIL,
    payload,
});

export const addReward = payload => ({
    type: ADD_REWARD,
    payload
});

export const updateReward = payload => ({
    type: UPDATE_REWARD,
    payload
});


export const getRewardsRequest = (id) => dispatch => {
    dispatch({ type: GET_REWARDS });

    api.rewards
        .getAllByCampaign(id)
        .then(rewards => {
            console.log("succ", rewards)
            dispatch(getRewardsSuccess(rewards));
        })
        .catch(err => {
            dispatch(getRewardsFail(err));
        });
};

export const supportCampaignRequest = data => dispatch =>
    new Promise(function(resolve, reject) {
        dispatch({ type: SUPPORT_CAMPAIGN });

        api.campaigns
            .supportCampaign(data)
            .then(res => {
                dispatch(supportCampaignSuccess(res.newAmount.toFixed(2)));
                resolve(res);
            })
            .catch(err => {
                dispatch(supportCampaignFail(err.response.data.errors));
                reject(err.response.data.errors);
            });
    });

export const deleteRewardRequest = (id) => dispatch =>
    new Promise(function(resolve, reject) {
        dispatch({ type: DELETE_REWARD_REQUEST });

        api.rewards
            .delete(id)
            .then(deletedId => {
                console.log("LOG!!!", deletedId)
                dispatch(deleteRewardSuccess(deletedId));
                resolve(id);
            })
            .catch(err => {
                dispatch(deleteRewardFail(err));
                reject(err);
            });
    });

