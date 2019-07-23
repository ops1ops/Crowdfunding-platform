import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import SignupForm from './SignupFormContainer/component';
import 'antd/dist/antd.css';

class SignupPage extends Component {
    submit = data =>
        this.props.signup(data).then(() => this.props.history.push('/'));

    render() {
        return (
            <div className="container d-flex flex-column align-items-center">
                <h2 className="m-4">Sign up</h2>
                <SignupForm submit={this.submit} />
            </div>
        );
    }
}

SignupPage.propTypes = {
    signup: PropTypes.func.isRequired,
};

export default SignupPage;
