import React from 'react';
import { Formik } from 'formik';
import { CreateCampaignForm } from './CreateCampaignForm/component';
import { validationSchema } from './validationSchema';

const CreateCampaignPage = () => {
    const categoriesArr = ['Games', 'Video', 'Music'];

    return (
        <Formik
            initialValues={{
                title: '',
                link: '',
                category: categoriesArr[0],
                goalAmount: 0,
                expirationDate: new Date()
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
            render={formikProps =>
                <CreateCampaignForm {...formikProps} categoriesArr={categoriesArr}/>
            }
        />
    );
};

export default CreateCampaignPage;
