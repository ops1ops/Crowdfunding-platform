import React from 'react';
import { Formik } from 'formik';
import { CreateCampaignForm } from './CreateCampaignForm/component';
import { validationSchema } from './validationSchema';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import {notification} from "antd";

class CreateCampaignPage extends React.Component {
    componentDidMount() {
        this.props.getCategories();
    }

    componentWillUnmount() {
        this.props.resetCampaign();
    }

    render() {
        const { categories, createCampaign, isLoading, campaign, error } = this.props;

        return (
            <div>
                {error && notification.error ({
                    message: 'Submitting error',
                    description: error
                })}
                {campaign.id ? <Redirect to={`/campaign/${campaign.id}`}/> : null}
                <Formik
                    initialValues={{
                        title: '',
                        link: '',
                        category: 'Art',
                        goalAmount: 0,
                        images: [],
                        expirationDate: new Date(),
                        description: '',
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        createCampaign(values);
                        actions.setSubmitting(false);
                    }}
                    render={formikProps => (
                        <CreateCampaignForm {...formikProps} categoriesArr={categories} />
                    )}
                />
            </div>
        );
    }
}

CreateCampaignPage.propTypes = {
    getCategories: PropTypes.func.isRequired,
    createCampaign: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    resetCampaign: PropTypes.func.isRequired,
    campaign: PropTypes.shape({
        id: PropTypes.number,
    }),
};

export default CreateCampaignPage;
