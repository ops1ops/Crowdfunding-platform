import { connect } from 'react-redux';
import RewardEditorModal from './component';
import { createRewardRequest, updateRewardRequest } from './actions';

export { createRewardReducer } from './reducer';

const mapStateToProps = state => ({
    campaign: state.campaignPageReducer.campaign,
    isLoading: state.createRewardReducer.isLoading,
    error: state.createRewardReducer.error,
});

const mapDispatchToProps = () => ({
    updateReward: updateRewardRequest,
    createReward: createRewardRequest,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(RewardEditorModal);
