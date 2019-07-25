import React from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

export const SignupForm = ({
    handleSubmit,
    isSubmitting,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
}) => (
    <Form onSubmit={handleSubmit}>
        <Row>
            <Col>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        name="firstName"
                        placeholder="Enter first name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.firstName && touched.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        name="lastName"
                        placeholder="Enter last name"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.lastName && touched.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email && touched.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
            />
            <Form.Control.Feedback type="invalid">
                {touched.password && errors.password}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicRepeatPassword">
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Repeat password"
                name="repeatPassword"
                value={values.repeatPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.repeatPassword && !!errors.repeatPassword}
            />
            <Form.Control.Feedback type="invalid">
                {touched.repeatPassword && errors.repeatPassword}
            </Form.Control.Feedback>
        </Form.Group>
        <Button className="w-100 mb-3" variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
        </Button>
    </Form>
);
