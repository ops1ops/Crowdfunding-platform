import { combineReducers } from 'redux';
import { loginPageReducer } from '../features/LoginPage';
import { createCampaignPageReducer } from '../features/CampaignEditorPage';
import { campaignPageReducer } from '../features/CampaignPage';
import { createRewardReducer } from '../features/CampaignPage/RewardEditorModal';
import {rewardsReducer} from "../features/CampaignPage/RewardsSection";

export const rootReducer = combineReducers({
    createCampaignPageReducer,
    campaignPageReducer,
    createRewardReducer,
    rewardsReducer,
    user: loginPageReducer,
});
