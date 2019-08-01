import { connect } from 'react-redux';
import CampaignEditorPage from './component';
import {
    createCampaignRequest,
    getCategories,
    resetCampaignResponse, setCreating,
    setEditing,
    updateCampaignRequest
} from './actions';
import { selectAllCategoriesTitles } from './selectors';
import { getCampaignRequest } from '../CampaignPage/actions';

export { createCampaignPageReducer } from './reducer';

const mapStateToProps = state => ({
    categories: selectAllCategoriesTitles(state),
    campaign: state.campaignPageReducer.campaign,
    isLoading: state.createCampaignPageReducer.isLoading,
    campaignResponse: state.createCampaignPageReducer.campaign,
    error: state.createCampaignPageReducer.error,
    isCreating: state.createCampaignPageReducer.isCreating,
});

const mapDispatchToProps = () => ({
    getCategories,
    resetCampaignResponse,
    setEditing,
    setCreating,
    getCampaign: getCampaignRequest,
    createCampaign: createCampaignRequest,
    updateCampaign: updateCampaignRequest,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(CampaignEditorPage);
