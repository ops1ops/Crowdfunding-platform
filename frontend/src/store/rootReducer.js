import { combineReducers } from 'redux';
import { loginPageReducer } from '../features/auth/loginPage';

export const rootReducer = combineReducers({
    user: loginPageReducer,
});
