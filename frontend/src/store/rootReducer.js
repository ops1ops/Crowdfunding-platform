import { combineReducers } from 'redux';
import { loginPageReducer } from '../features/LoginPage';
import { createCampaignPageReducer } from '../features/CreateCampaignPage';

export const rootReducer = combineReducers({
    createCampaignPageReducer,
    user: loginPageReducer,
});
