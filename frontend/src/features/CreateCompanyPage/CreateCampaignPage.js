import React  from 'react';
import { Formik } from 'formik';
import { CreateCampaignForm } from './CreateCampaignForm/component';

const CreateCampaignPage = () => {
    return (
        <Formik
            initialValues={{
                title: '',
            }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
            render={CreateCampaignForm}
        />
    );
};

export default CreateCampaignPage;
