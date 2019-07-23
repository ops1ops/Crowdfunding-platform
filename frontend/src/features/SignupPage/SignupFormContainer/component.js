import React from 'react';
import { Button, Form } from 'react-bootstrap';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';
import { Alert } from 'antd';
import Spinner from 'react-bootstrap/Spinner';
import { Formik } from 'formik';

class SignupForm extends React.Component {
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
        });
    };

    render() {
        const { serverErrors } = this.state;

        const schema = yup.object({
            firstName: yup
                .string()
                .required('First name is required field'),
            lastName: yup
                .string()
                .required('Last name is required field'),
            email: yup
                .string()
                .email('Invalid email')
                .required('Email is required field'),
            password: yup
                .string()
                .min(5, 'Password is too short')
                .required('Password is required field'),
        });

        const MainForm = ({
            handleSubmit,
            isSubmitting,
            handleChange,
            values,
            touched,
            errors,
        }) => (
            <Form className="w-50" onSubmit={handleSubmit}>
                {!_.isEmpty(serverErrors) && (
                    <Alert
                        className="mb-3"
                        message="Submitting error"
                        onClose={this.onAlertClose}
                        type="error"
                        description={serverErrors.validation || 'Please try again later'}
                        closable
                    />
                )}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        autoFocus
                        name="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email && touched.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {touched.password && errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    className="w-100"
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
                </Button>
            </Form>
        );

        return (
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
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default SignupForm;
