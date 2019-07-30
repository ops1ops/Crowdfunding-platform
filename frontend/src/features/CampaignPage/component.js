import React, { Component } from 'react';
import './style.css';
import {
    Button,
    Carousel,
    Col,
    Container,
    Image, Nav,
    ProgressBar,
    Row,
} from 'react-bootstrap';
import YouTube from 'react-youtube';
import {Progress, Rate, Tabs} from 'antd';
import {Route, Router, Switch} from 'react-router-dom';
import NotFound from "../layout/NotFound";

const { TabPane } = Tabs;

class CampaignPage extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;

    }


    render() {
        return (
            <div>
                <Container className="py-4">
                    <h1 className="text-center">Title</h1>
                    <h3 className="text-center pb-4">category</h3>
                    <Row>
                        <Col sm={8}>
                            <Carousel className="carousel" interval={null}>
                                <Carousel.Item>
                                    <YouTube
                                        videoId="qsDvJrGMSUY"
                                        opts={{
                                            height: '400',
                                            width: '100%',
                                        }}
                                    />
                                </Carousel.Item>
                                <Carousel.Item className="h-25">
                                    <img
                                        alt="carousel image"
                                        className="carousel-image d-block w-100"
                                        fluid
                                        src="http://res.cloudinary.com/pop4enz/image/upload/v1564413854/wfc1rJ_tdacgi.jpg"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col sm={4}>
                            <div className="d-flex justify-content-between">
                                <Rate defaultValue="2" />
                                <span>avg rate</span>
                            </div>
                            <Progress className="py-2" percent={0} showInfo={false} p />
                            <span>current amount</span>
                            <p>pledged ot of $goalAmount goal</p>
                            <span>30</span>
                            <p>backers</p>
                            <span>10</span>
                            <p>days to go</p>
                            <div className="d-flex justify-content-center">
                                <Button className="w-100">Back this campaign</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="border-top">
                    <Tabs defaultActiveKey="1" size="large">
                        <TabPane tab="Campaign" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="News" key="2">
                            <NotFound/>
                        </TabPane>
                        <TabPane tab="Comments" key="3">
                            cmments
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

CampaignPage.propTypes = {

}

export default CampaignPage;
