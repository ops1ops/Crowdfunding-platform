import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import EditorForm from './EditorForm/component';
import { Formik } from 'formik';
import { CreateCampaignForm } from '../../CampaignEditorPage/EditCampaignForm/component';
import { validationSchema } from './validationSchema';
import { PropTypes } from 'prop-types';

class RewardEditorModal extends Component {
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

    handleSubmit = () => {};

    render() {
        const { show } = this.state;
        const { createReward, campaign, isLoading, reward } = this.props;

        return (
            <>
                <Button variant="outline-success w-100" onClick={this.handleShow}>
                    Add reward
                </Button>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        price: 0,
                    }}
                    onSubmit={(values, actions) => {
                        const data = {
                            id: campaign.id,
                            ...values,
                        };
                        createReward(data)
                            .then(res => {
                                console.log("res", res);
                                this.handleClose();
                                actions.resetForm();
                            })
                            .catch(err => console.log(err))
                    }}
                    validationSchema={validationSchema}
                    render={formikProps => (
                        <EditorForm
                            {...formikProps}
                            show={show}
                            isLoading={isLoading}
                            handleClose={this.handleClose}
                        />
                    )}
                />
            </>
        );
    }
}

RewardEditorModal.propTypes = {
    createReward: PropTypes.func.isRequired,
    reward: PropTypes.object.isRequired,
    campaign: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isCreating: PropTypes.bool.isRequired,
};

export default RewardEditorModal;
