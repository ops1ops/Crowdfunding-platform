import { combineReducers } from 'redux';
import { loginPageReducer } from '../features/LoginPage';
import { createCampaignPageReducer } from '../features/CampaignEditorPage';
import { campaignPageReducer } from '../features/CampaignPage';

export const rootReducer = combineReducers({
    createCampaignPageReducer,
    campaignPageReducer,
    user: loginPageReducer,
});
