import React from 'react';
import { Formik } from 'formik';
import { CreateCampaignForm } from './EditCampaignForm/component';
import { validationSchema } from './validationSchema';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { notification } from 'antd';
import * as moment from 'moment';

class CampaignEditorPage extends React.Component {
    componentDidMount() {
        const { match, getCampaign, getCategories, categories, setEditing, setCreating, user } = this.props;
        if (categories.length === 0) getCategories();
        if (match.params.id) {
            setEditing();
            getCampaign({ id: match.params.id, userId: user.id });
        } else {
            setCreating();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            if (this.props.match.params.id) {
                this.props.setEditing();
            } else {
                this.props.setCreating();
            }
        }
    }

    componentWillUnmount() {
        this.props.resetCampaignResponse();
    }

    render() {
        // const { isCreating } = this.state;
        const {
            isCreating,
            categories,
            createCampaign,
            isLoading,
            campaignResponse,
            error,
            campaign,
            updateCampaign,
        } = this.props;

        return (
            <div>
                {error &&
                    notification.error({
                        message: 'Submitting error',
                        description: error,
                    })}
                {campaignResponse.id ? (
                    <Redirect to={`/campaign/${campaignResponse.id}`} />
                ) : null}
                <Formik
                    enableReinitialize
                    initialValues={
                        (campaign && campaign.images && !isCreating)
                            ? {
                                  title: campaign.title,
                                  category:
                                      campaign.category && !isCreating
                                          ? campaign.category.name
                                          : '',
                                  description: campaign.description,
                                  link: campaign.youtubeLink,
                                  images: campaign.images.map(item => ({
                                      url: item.url,
                                      uid: item.id,
                                  })),
                                  goalAmount: campaign.goalAmount,
                                  expirationDate: moment(campaign.expirationDate)._d,
                              }
                            : {
                                  title: '',
                                  category: categories ? categories[0] : null,
                                  description: '',
                                  link: '',
                                  images: [],
                                  goalAmount: 0,
                                  expirationDate: new Date(),
                              }
                    }
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        if (isCreating) {
                            console.log('cr');
                            createCampaign(values);
                        } else {
                            updateCampaign({
                                id: campaign.id,
                                updateInfo: { ...values },
                            });
                        }
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

CampaignEditorPage.propTypes = {
    setEditing: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setCreating: PropTypes.func.isRequired,
    isCreating: PropTypes.bool.isRequired,
    getCategories: PropTypes.func.isRequired,
    getCampaign: PropTypes.func.isRequired,
    createCampaign: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    updateCampaign: PropTypes.func.isRequired,
    resetCampaignResponse: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    campaign: PropTypes.object,
    campaignToUpdate: PropTypes.object,
    campaignResponse: PropTypes.shape({
        id: PropTypes.number,
    }),
};

export default CampaignEditorPage;
