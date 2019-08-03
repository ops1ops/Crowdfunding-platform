import {
    GET_CAMPAIGN_SUCCESS,
    GET_CAMPAIGN_FAIL,
    GET_CAMPAIGN,
    DELETE_CAMPAIGN,
    CLEAR_ERRORS,
    DELETE_CAMPAIGN_SUCCESS,
    DELETE_CAMPAIGN_FAIL,
    RESET_DELETING,
    GET_USER_IFNO_SUCCESS,
    GET_USER_IFNO_FAIL,
    GET_USER_IFNO
} from './constants';
import api from '../../services/api';

export const getUserInfoSuccess = payload => ({
    type: GET_USER_IFNO_SUCCESS,
    payload,
});

export const getUserInfoFail = payload => ({
    type: GET_USER_IFNO_FAIL,
    payload,
});


export const getUserInfoRequest = id => dispatch => {
    dispatch({ type: GET_USER_IFNO });

    api.user
        .getById(id)
        .then(campaign => {
            dispatch(getUserInfoSuccess(campaign));
        })
        .catch(err => {
            dispatch(getUserInfoFail(err));
        });
};

