import React, { Component } from 'react';
import LoginForm from '../components/auth/LoginForm';
import { connect } from 'react-redux';
import mapDispatchToProps from 'react-redux/es/connect/mapDispatchToProps';
import {userLogin} from "../actions/userLogin";
import {PropTypes} from "@material-ui/core";

class LoginPage extends Component {
    submit = data => {
        this.props.loginUser(data);
    };

    render() {
        return (
            <div>
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}

const mapStateToProps = store => {
    console.log(store);
    return {
        user: store.user,
    };
};


export default connect(
    null,
    { loginUser: userLogin }
)(LoginPage);
