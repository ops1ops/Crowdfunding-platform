import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from './constants';
import api from '../../../services/api';

export const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    user,
});

export const userLogoutSuccess = () => ({
    type: USER_LOGOUT_SUCCESS,
});

export const userLogin = credentials => dispatch =>
    api.user.login(credentials).then(user => {
        localStorage.setItem('userJWT', user.data.token);
        dispatch(userLoginSuccess(user));
    });

export const userLogout = () => dispatch => {
    localStorage.removeItem('userJWT');
    dispatch(userLogoutSuccess());
};
