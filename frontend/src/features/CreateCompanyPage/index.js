import { connect } from 'react-redux';
import { userLogin } from './actions';
import CreateCampaignPage from "./component";



const mapStateToProps = (store) => ({
    categories: store.categories,
});


export default connect(
    mapStateToProps
)(CreateCampaignPage);
