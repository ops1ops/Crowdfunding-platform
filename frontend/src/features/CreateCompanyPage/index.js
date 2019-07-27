import { connect } from 'react-redux';
import { userLogin } from './actions';
import CreateCampaignPage from "./component";

export { loginPageReducer } from './reducer';

const mapDispatchToProps = () => ({
    getCategories: loadCategories,
});

export default connect(
    null,
    mapDispatchToProps()
)(CreateCampaignPage);
