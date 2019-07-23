import React from 'react';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';
import { Alert } from 'antd';
import { Formik } from 'formik';
import {MainForm} from "./MainForm";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverErrors: {},
        };
    }

    onAlertClose = () => {
        this.setState({ serverErrors: {} });
    };

    onSubmit = (values, actions) => {
        this.props.submit(values).catch(err => {
            this.setState({
                serverErrors: {
                    validation: err.response.data.errors,
                    message: err.message,
                },
            });
            actions.setSubmitting(false);
        }
        );
    };

    render() {
        const { serverErrors } = this.state;

        const schema = yup.object({
            email: yup
                .string()
                .email('Invalid email')
                .required('Email is required field'),
            password: yup
                .string()
                .min(5, 'Password is too short')
                .required('Password is required field'),
        });

        return (
            <div>
                {serverErrors.message && (
                    <Alert
                        className="mb-3 w-50"
                        message="Submitting error"
                        onClose={this.onAlertClose}
                        type="error"
                        description={
                            serverErrors.validation || 'Please try again later'
                        }
                        closable
                    />
                )}
                <Formik
                    validationSchema={schema}
                    validateOnChange
                    onSubmit={this.onSubmit}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    render={MainForm}
                />
            </div>

        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default LoginForm;
