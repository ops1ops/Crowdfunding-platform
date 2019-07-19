import {
    USER_LOGIN_SUCCESS,
} from './constants';
import api from '../../../services/api';

export const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    user,
});

export const userLogin = credentials => dispatch =>
    api.user.login(credentials).then(user => dispatch(userLoginSuccess(user)));
