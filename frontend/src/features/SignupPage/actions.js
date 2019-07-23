import { USER_SIGNUP } from './constants';
import api from '../../services/api';

export const userLoginSuccess = user => ({
    type: USER_SIGNUP,
    user,
});

export const userSignup = credentials => dispatch =>
    console.log(1);
