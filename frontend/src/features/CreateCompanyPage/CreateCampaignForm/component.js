import React from 'react';
import DatePicker from 'react-datepicker';
import { Field } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, InputGroup } from 'react-bootstrap';
import ImageUploader from './ImageUploader/component';
import YoutubeVideo from './YoutubeVideo/component';
import Section from './Section/component';


export const CreateCampaignForm = props => {
    const {
        handleSubmit,
        values,
        errors,
        handleChange,
        handleBlur,
        touched,
        categoriesArr,
        setFieldValue
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Section
                title="Campaign title"
                description="Write a clear, brief title that helps people quickly understand the gist of your campaign."
                render={
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            placeholder="Mirobot, 6-axis Mini Industrial Robot Arm"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.title && touched.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                }
            />
            <Section
                title="Campaign category"
                description="Choose the category that most closely aligns with your campaign."
                render={
                    <Form.Group controlId="formBasicSelect">
                        <Form.Control
                            name="category"
                            as="select"
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            {categoriesArr.map((item, index) => (
                                <option key={index} value={item} label={item} />
                            ))}
                        </Form.Control>
                    </Form.Group>
                }
            />
            <Section
                title="Campaign video"
                description="Add a video from YouTube that describes your project."
                render={
                    <YoutubeVideo
                        link={values.link}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                    />
                }
            />
            <Section
                title="Campaign gallery"
                description="Upload images that most closely capture the essence of your campaign."
                render={<ImageUploader />}
            />
            <Section
                title="Funding goal"
                description="Set an achievable goal that covers what you need to complete your campaign."
                render={
                    <Form.Group controlId="formBasicGoal">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                name="goalAmount"
                                placeholder="300"
                                value={values.goalAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.goalAmount && touched.goalAmount}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.goalAmount}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                }
            />
            <Section
                title="Expiration date"
                description="Set a time limit for your campaign. You won’t be able to change this after you launch"
                render={
                    <Form.Group controlId="formBasicDatePicker">
                        <Form.Label>Datepicker</Form.Label>
                        <DatePicker
                            name="expirationDate"
                            selected={values.expirationDate}
                            onChange={e => setFieldValue('expirationDate', e)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.expirationDate}
                        </Form.Control.Feedback>
                    </Form.Group>
                }
            />
            <Button variant="primary" type="submit">
                submit
                {console.log(props)}
            </Button>
        </form>
    );
};
