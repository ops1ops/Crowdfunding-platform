import { combineReducers } from 'redux';
import { loginPageReducer } from '../features/LoginPage';

export const rootReducer = combineReducers({
    user: loginPageReducer,
});
