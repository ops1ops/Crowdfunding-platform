import React from 'react';
import { Formik } from 'formik';
import { CreateCampaignForm } from './CreateCampaignForm/component';
import { validationSchema } from './validationSchema';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { notification } from 'antd';

class CreateCampaignPage extends React.Component {
    componentDidMount() {
        this.props.getCategories();
    }

    componentWillUnmount() {
        this.props.resetCampaign();
    }

    render() {
        const {
            categories,
            createCampaign,
            isLoading,
            campaign,
            error,
            campaignToUpdate,
        } = this.props;

        return (
            <div>
                {error &&
                    notification.error({
                        message: 'Submitting error',
                        description: error,
                    })}
                {campaign.id ? <Redirect to={`/campaign/${campaign.id}`} /> : null}
                <Formik
                    initialValues={{
                        title: '',
                        link: '',
                        category: categories ? categories[0] : '',
                        goalAmount: 0,
                        images: [],
                        expirationDate: new Date(),
                        description: '',
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        createCampaign(values);
                        actions.setSubmitting(false);
                    }}
                    render={formikProps => (
                        <CreateCampaignForm
                            {...formikProps}
                            categoriesArr={categories}
                            isLoading={isLoading}
                        />
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
    categories: PropTypes.array.isRequired,
    campaignToUpdate: PropTypes.object,
    campaign: PropTypes.shape({
        id: PropTypes.number,
    }),
};

export default CreateCampaignPage;
