import {
    CREATE_REWARD,
    CREATE_REWARD_SUCCESS,
    CREATE_REWARD_FAIL,
    UPDATE_REWARD_REQUEST, UPDATE_REWARD_FAIL, UPDATE_REWARD_SUCCESS,
} from './constants';
import api from '../../../services/api';
import {addReward, updateReward} from '../RewardsSection/actions';

export const createRewardSuccess = payload => ({
    type: CREATE_REWARD_SUCCESS,
    payload,
});

export const updateRewardFail = payload => ({
    type: UPDATE_REWARD_FAIL,
    payload,
});

export const updateRewardSuccess = payload => ({
    type: UPDATE_REWARD_SUCCESS,
    payload,
});

export const createRewardFail = payload => ({
    type: CREATE_REWARD_FAIL,
    payload,
});

export const updateRewardRequest = data => dispatch =>
    new Promise(function(resolve, reject) {
        dispatch({ type: UPDATE_REWARD_REQUEST });

        api.rewards
            .update(data)
            .then(reward => {
                dispatch(updateRewardSuccess(reward.id));
                dispatch(updateReward(reward));
                resolve(reward.id);
            })
            .catch(err => {
                dispatch(updateRewardFail(err));
                reject(err);
            });
    });

export const createRewardRequest = data => dispatch =>
    new Promise(function(resolve, reject) {
        dispatch({ type: CREATE_REWARD });

        api.rewards
            .create(data)
            .then(reward => {
                dispatch(createRewardSuccess(reward.id));
                dispatch(addReward(reward));
                resolve(reward.id);
            })
            .catch(err => {
                dispatch(createRewardFail(err));
                reject(err);
            });
    });
