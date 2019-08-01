import {
    CREATE_REWARD, CREATE_REWARD_SUCCESS, CREATE_REWARD_FAIL,
} from './constants';
import api from "../../../services/api";



export const createRewardSuccess = payload => ({
    type: CREATE_REWARD_SUCCESS,
    payload,
});

export const createRewardFail = payload => ({
    type: CREATE_REWARD_FAIL,
    payload,
});

export const createRewardRequest = data => dispatch =>
    new Promise(function(resolve, reject) {
        dispatch({ type: CREATE_REWARD });

        api.rewards
            .create(data)
            .then(id => {
                dispatch(createRewardSuccess(id));
                resolve(id);
            })
            .catch(err => {
                dispatch(createRewardFail(err));
                reject(err);
            });
    });


// export const updateCampaignRequest = data => dispatch => {
//     dispatch({ type: UPDATE_CAMPAIGN });
//
//     api.campaigns
//         .update(data)
//         .then(id => {
//             dispatch(updateCampaignSuccess(id));
//         })
//         .catch(err => {
//             dispatch(updateCampaignFail(err));
//             dispatch(clearErrors());
//         });
// };
