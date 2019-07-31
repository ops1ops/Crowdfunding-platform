import { connect } from 'react-redux';
import CampaignPage from './component';
import { getCampaignRequest } from './actions';

export { campaignPageReducer } from './reducer';

const mapStateToProps = state => ({
    isLoading: state.campaignPageReducer.isLoading,
    campaign: state.campaignPageReducer.campaign,
    error: state.campaignPageReducer.error,
    user: state.user,
});

const mapDispatchToProps = () => ({
    getCampaign: getCampaignRequest
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(CampaignPage);
