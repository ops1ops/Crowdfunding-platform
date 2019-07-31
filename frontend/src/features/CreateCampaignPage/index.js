import { connect } from 'react-redux';
import CreateCampaignPage from './component';
import {createCampaignRequest, getCategories, resetCampaign} from './actions';
import { selectAllCategoriesTitles } from './selectors';

export { createCampaignPageReducer } from './reducer';

const mapStateToProps = state => ({
    categories: selectAllCategoriesTitles(state),
    isLoading: state.createCampaignPageReducer.isLoading,
    campaign: state.createCampaignPageReducer.campaign,
    error: state.createCampaignPageReducer.error,
});

const mapDispatchToProps = () => ({
    getCategories,
    resetCampaign,
    createCampaign: createCampaignRequest,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(CreateCampaignPage);
