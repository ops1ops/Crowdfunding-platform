import { connect } from 'react-redux';
import CampaignPage from './component';
import {
    deleteCampaignRequest,
    getCampaignRequest,
    rateCampaignRequest,
} from './actions';

export { campaignPageReducer } from './reducer';

const mapStateToProps = state => ({
    isLoading: state.campaignPageReducer.isLoading,
    campaign: state.campaignPageReducer.campaign,
    error: state.campaignPageReducer.error,
    user: state.user,
    isDeleted: state.campaignPageReducer.isDeleted,
});

const mapDispatchToProps = () => ({
    getCampaign: getCampaignRequest,
    deleteCampaign: deleteCampaignRequest,
    rateCampaign: rateCampaignRequest,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(CampaignPage);
