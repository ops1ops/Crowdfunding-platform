import Section from './Section/component';
import { Button, Form } from 'react-bootstrap';
import React from 'react';
import {Select} from "antd";
import ImageUploader from "./ImageUploader/component";
const { Option } = Select;

export const CreateCampaignForm = props => {
    const { handleSubmit, values, errors, handleChange, handleBlur, touched } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Section
                title="Campaign title"
                description="Write a clear, brief title that helps people quickly understand the gist of your campaign."
                renderForm={
                    <Form.Group controlId="formBasicEmail">
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
                renderForm={
                    <Form.Group controlId="formBasicSelect">
                        <Form.Control as="select">
                            <option>Games</option>
                            <option>Food</option>
                        </Form.Control>
                    </Form.Group>
                }
            />
            <Section
                title="Campaign gallery"
                description="Upload images that most closely capture the essence of your campaign."
                renderForm={<ImageUploader/>}
            />
            <Button variant="primary" type="submit">
                submit
            </Button>
        </form>
    );
};
