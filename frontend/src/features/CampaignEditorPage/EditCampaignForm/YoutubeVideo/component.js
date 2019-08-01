import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import YouTube from 'react-youtube';
import getVideoId from "../../../../utils/getVideoId";


class YoutubeVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExists: false,
        };
    }

    render() {
        const { link, handleBlur, errors, touched, handleChange } = this.props;
        const { isExists } = this.state;

        return (
            <div>
                <Form.Group controlId="formBasicYoutube">
                    <Form.Label>Youtube link</Form.Label>
                    <Form.Control
                        name="link"
                        placeholder="https://www.youtube.com/watch?v=F0IbjVq-fgs"
                        value={link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.link && touched.link}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.link}
                    </Form.Control.Feedback>
                </Form.Group>
                {!errors.link && link !== '' && (
                    <YouTube
                        videoId={getVideoId(link)}
                        opts={{
                            height: '360',
                            width: '100%',
                        }}
                    />
                )}
            </div>
        );
    }
}

export default YoutubeVideo;
