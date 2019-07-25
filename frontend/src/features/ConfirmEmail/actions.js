import api from '../../services/api';
import {userLoginSuccess} from "../LoginPage/actions";

export const confirm = token => dispatch =>
    api.user.confirmEmail(token).then(user => {
        localStorage.setItem('userJWT', user.data.token);
        dispatch(userLoginSuccess(user));
    });
