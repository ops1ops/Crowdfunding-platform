import { connect } from 'react-redux';
import CampaignEditorPage from './component';
import {
    createRewardRequest
} from './actions';


export { createRewardReducer } from './reducer';

const mapStateToProps = state => ({
    campaign: state.campaignPageReducer.campaign,
    reward: state.createRewardReducer.reward,
    isLoading: state.createRewardReducer.isLoading,
    error: state.createRewardReducer.error,
    isCreating: state.createRewardReducer.isCreating,
});

const mapDispatchToProps = () => ({
    createReward: createRewardRequest,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(CampaignEditorPage);
