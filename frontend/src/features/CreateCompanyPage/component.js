import React from 'react';
import { Formik } from 'formik';
import { CreateCampaignForm } from './CreateCampaignForm/component';
import { validationSchema } from './validationSchema';
import * as moment from 'moment'

const CreateCampaignPage = () => {
    const categoriesArr = ['Games', 'Video', 'Music'];

    return (
        <Formik
            initialValues={{
                title: '',
                link: '',
                category: categoriesArr[0],
                goalAmount: 0,
                images: [],
                expirationDate: new Date(),
                description: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
            render={formikProps => (
                <CreateCampaignForm {...formikProps} categoriesArr={categoriesArr} />
            )}
        />
    );
};

export default CreateCampaignPage;
