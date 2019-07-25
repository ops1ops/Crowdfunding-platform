import React, { Component } from 'react';
import 'antd/dist/antd.css';
import SignupFormContainer from './SignupFormContainer/component';

const SignupPage = () => {
    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="m-4">Sign up</h2>
            <SignupFormContainer />
        </div>
    );
};

export default SignupPage;
