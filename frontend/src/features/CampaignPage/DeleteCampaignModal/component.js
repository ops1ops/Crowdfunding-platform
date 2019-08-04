import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import {Icon, notification} from 'antd';
import Spinner from 'react-bootstrap/Spinner';

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
        const { deleteCampaign, id } = this.props;

        deleteCampaign(id).then(() => this.handleClose()).catch(err => console.log(err));
    };

    render() {
        const { show } = this.state;
        const { isLoading, error, buttonVariant } = this.props;

        return (
            <>
                {error &&
                    notification.error({
                        message: 'Submitting error',
                        description: error,
                    })}
                <Button
                    className={buttonVariant}
                    variant="danger"
                    onClick={this.handleShow}
                >
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
                        <Button
                            variant="danger"
                            onClick={this.handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Delete'
                            )}
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
    id: PropTypes.number.isRequired,
    buttonVariant: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default DeleteCampaignModal;
