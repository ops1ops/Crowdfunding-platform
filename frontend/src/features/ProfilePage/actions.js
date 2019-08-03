import { GET_USER_IFNO_SUCCESS, GET_USER_IFNO_FAIL, GET_USER_IFNO } from './constants';
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
        .then(userInfo => {
            dispatch(getUserInfoSuccess(userInfo.user));
        })
        .catch(err => {
            dispatch(getUserInfoFail(err));
        });
};
