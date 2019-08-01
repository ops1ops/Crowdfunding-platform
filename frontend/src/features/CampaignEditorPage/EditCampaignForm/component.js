import React from 'react';
import DatePicker from 'react-datepicker';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Button, Form, InputGroup, Row } from 'react-bootstrap';
import ImageUploader from './ImageUploader/component';
import YoutubeVideo from './YoutubeVideo/component';
import Section from './Section/component';
import 'react-datepicker/dist/react-datepicker.css';
import Feedback from 'react-bootstrap/Feedback';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';

export const CreateCampaignForm = props => {
    const {
        handleSubmit,
        values,
        errors,
        handleChange,
        handleBlur,
        touched,
        categoriesArr,
        setFieldValue,
        isLoading,
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
                title="Campaign description"
                description="Describe what you're raising funds to do, why you care about it, how you plan to make it happen, and who you are. Your description should tell backers everything they need to know. If possible, include images to show them what your campaign is all about and what rewards look like."
                render={
                    <div>
                        <SimpleMDE
                            className="Mde"
                            id="your-custom-id"
                            label="Description"
                            options={{
                                spellChecker: false,
                            }}
                            onChange={e => setFieldValue('description', e)}
                            value={values.description}
                        />
                        <p className="text-danger">
                            <small>{errors.description}</small>
                        </p>
                    </div>
                }
            />
            <Section
                title="Campaign video"
                description="Add a video from YouTube that describes your campaign."
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
                render={<ImageUploader setFieldValue={setFieldValue} values={values} />}
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
                        <DatePicker
                            className="form-control"
                            name="expirationDate"
                            minDate={new Date()}
                            selected={values.expirationDate}
                            onChange={e => setFieldValue('expirationDate', new Date(e))}
                        />
                        <p className="text-danger">
                            <small>{errors.expirationDate}</small>
                        </p>
                    </Form.Group>
                }
            />
            <div className="d-flex justify-content-center align-items-center">
                <Button
                    className="w-25 my-4"
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                </Button>
            </div>
        </form>
    );
};
