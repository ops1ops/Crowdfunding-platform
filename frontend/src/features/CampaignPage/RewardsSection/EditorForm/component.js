import React, { Component } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import CampaignPage from '../../component';

class RewardEditorModal extends Component {
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
        } = this.props;

        return (
            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="text-center">
                        <Modal.Title>
                            Add new reward or edit
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
                        <Form.Group controlId="price">
                            <Form.Label>Pledge amount</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-$">$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    name="price"
                                    placeholder="10"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.price && touched.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" type="submit" onClick={handleSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

RewardEditorModal.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default RewardEditorModal;
