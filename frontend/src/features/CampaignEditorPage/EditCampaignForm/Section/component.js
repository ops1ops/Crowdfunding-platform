import React  from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Section = (props) => {
    return (
        <div className="py-5 border-bottom">
            <Container>
                <Row>
                    <Col sm={4}>
                        <h5>{props.title}</h5>
                        <p>{props.description}</p>
                    </Col>
                    <Col sm={{span: 7, offset: 1}}>
                        {props.render}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Section;
