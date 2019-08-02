import React, { Component } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Spinner from "react-bootstrap/Spinner";

class EditorForm extends Component {
    render() {
        const {
            show,
            handleSubmit,
            handleClose,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isLoading,
            isCreating
        } = this.props;

        return (
            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="text-center">
                        <Modal.Title>
                            {isCreating ? 'Add new reward' : 'Edit this reward'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="name">
                            <Form.Label>Reward name</Form.Label>
                            <Form.Control
                                name="name"
                                placeholder="Pledge 10$ and get..."
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.name && touched.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                placeholder="Write about this reward"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.description && touched.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="amount">
                            <Form.Label>Pledge amount</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-$">$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    name="amount"
                                    placeholder="10"
                                    value={values.amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.amount && touched.amount}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.amount}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" type="submit" onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? <Spinner animation="border" size="sm" /> : (isCreating ? 'Create' : 'Save')}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

EditorForm.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
};

export default EditorForm;
