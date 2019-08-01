import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import {notification} from "antd";
import Spinner from "react-bootstrap/Spinner";

class DeleteCampaignModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        };
    }

    handleShow = () => {
        this.setState({ show: true });
    };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleSubmit = () => {
        const { deleteCampaign, campaign } = this.props;

        deleteCampaign(campaign.id);
    };

    render() {
        const { show } = this.state;
        const { isLoading, error, campaign } = this.props;

        return (
            <>
                {error &&
                notification.error({
                    message: 'Submitting error',
                    description: error,
                })}
                <Button variant="outline-danger w-25" onClick={this.handleShow} disabled={isLoading}>
                    Delete
                </Button>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header className="text-center">
                        <Modal.Title>
                            Are you sure you want to delete this campaign?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        This campaign will be deleted and you wont be able to restore it.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.handleSubmit} disabled={isLoading}>
                            {isLoading ? <Spinner animation="border" size="sm" /> : 'Delete'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

DeleteCampaignModal.propTypes = {
    error: PropTypes.string.isRequired,
    deleteCampaign: PropTypes.func.isRequired,
    campaign: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default DeleteCampaignModal;
