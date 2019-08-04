import React from 'react';
import { Button, Form } from 'react-bootstrap';

function CommentForm(props) {
    const { handleAdd, handleChange, text } = props;

    return (
        <Form onSubmit={handleAdd}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    name="text"
                    as="textarea"
                    placeholder="Write what do you think about this campaign"
                    value={text}
                    onChange={handleChange}
                    // isInvalid={!!errors.title && touched.title}
                />
                {/*<Form.Control.Feedback type="invalid">*/}
                {/*    {errors.title}*/}
                {/*</Form.Control.Feedback>*/}
            </Form.Group>
            <Button className="w-25 mb-2" variant="primary" type="submit">
                Send comment
            </Button>
        </Form>
    );
}

CommentForm.propTypes = {};

export default CommentForm;
