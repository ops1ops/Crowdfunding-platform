import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import EditorForm from './EditorForm/component';
import { Formik } from 'formik';
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
        const {
            updateReward,
            createReward,
            isLoading,
            reward,
            id,
            isCreating,
        } = this.props;
        console.log(reward);

        return (
            <>
                <Button variant="outline-success w-100 mt-3" onClick={this.handleShow}>
                    {isCreating ? 'Add reward' : 'Edit'}
                </Button>
                <Formik
                    initialValues={
                        isCreating
                            ? {
                                  name: '',
                                  description: '',
                                  amount: 0,
                              }
                            : {
                                  name: reward ? reward.name : '',
                                  description: reward ? reward.description : '',
                                  amount: reward ? reward.amount : '',
                              }
                    }
                    onSubmit={(values, actions) => {
                        console.log(values);
                        const data = {
                            id,
                            rewardId: reward ? reward.id : null,
                            ...values,
                        };
                        if (isCreating) {
                            createReward(data).then(() => {
                                this.handleClose();
                                actions.resetForm();
                            });
                        } else {
                            updateReward(data).then(() => {
                                this.handleClose();
                                actions.resetForm();
                            });
                        }
                    }}
                    validationSchema={validationSchema}
                    render={formikProps => (
                        <EditorForm
                            {...formikProps}
                            show={show}
                            isCreating={isCreating}
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
    updateReward: PropTypes.func.isRequired,
    reward: PropTypes.object,
    buttonText: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isCreating: PropTypes.bool.isRequired,
};

export default RewardEditorModal;
