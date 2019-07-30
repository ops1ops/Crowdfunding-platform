import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import YouTube from 'react-youtube';

class YoutubeVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExists: false,
        };
    }

    getIdFromLink = url => {
        const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[1].length === 11) {
            return match[1];
        }
        return false;
    };

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
                        videoId={this.getIdFromLink(link)}
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
