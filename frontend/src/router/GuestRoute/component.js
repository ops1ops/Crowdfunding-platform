import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const GuestRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return isAuthenticated ? (
        <Redirect to="/"/>
    ) : (
        <Route {...rest} render={props => <Component {...props} />} />
    );
};

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthorized,
});

export default connect(mapStateToProps)(GuestRoute);
