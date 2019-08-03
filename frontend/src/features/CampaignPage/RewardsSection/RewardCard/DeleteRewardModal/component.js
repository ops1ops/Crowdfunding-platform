import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { notification } from 'antd';
import Spinner from 'react-bootstrap/Spinner';

class DeleteRewardModal extends Component {
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
        const { deleteReward, rewardId, campaignId } = this.props;
        const data = {
            id: campaignId,
            rewardId,
        };
        deleteReward(data).then(() => this.handleClose());
    };

    render() {
        const { show } = this.state;
        const { isLoading, error } = this.props;

        return (
            <>
                {error &&
                    notification.error({
                        message: 'Submitting error',
                        description: error,
                    })}
                <Button className="mt-3" variant="danger w-100" onClick={this.handleShow}>
                    Delete
                </Button>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header className="text-center">
                        <Modal.Title>
                            Are you sure you want to delete this reward?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        This reward will be deleted and you wont be able to restore it.
                        It will be also deleted from users who has already supported your campaign
                        by this reward.
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

DeleteRewardModal.propTypes = {
    error: PropTypes.string.isRequired,
    deleteReward: PropTypes.func.isRequired,
    rewardId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default DeleteRewardModal;
