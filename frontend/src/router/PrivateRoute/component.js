import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return isAuthenticated ? (
        <Route {...rest} render={props => <Component {...props} />} />
    ) : (
        <Redirect to="/login"/>
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthorized,
});

export default connect(mapStateToProps)(PrivateRoute);
