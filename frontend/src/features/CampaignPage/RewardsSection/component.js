import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";

class RewardEditorModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        }
    }

    handleShow = () => {
        this.setState({ show: true });
    };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleSubmit = () => {

    };

    render() {
        const { show } = this.state;

        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Add reward
                </Button>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default RewardEditorModal;