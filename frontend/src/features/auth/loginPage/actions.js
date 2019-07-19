import {
    USER_LOGIN,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
} from './constants';
import api from '../../../services/api';

const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    user,
});

const userLoginFailure = errors => ({
    type: USER_LOGIN_FAILURE,
    errors,
});

export const userLogin = credentials => {
    return dispatch => {
        dispatch({
            type: USER_LOGIN,
        });

        api.user
            .login(credentials)
            .then(user => dispatch(userLoginSuccess(user)))
            .catch(err => dispatch(userLoginFailure(err)));
    };
};
