import React, { Component } from 'react';
import './styles.css';
import { PropTypes } from 'prop-types';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { Progress, Rate, Tabs, Modal } from 'antd';
import getVideoId from '../../utils/getVideoId';
import getLeftDays from '../../utils/getLeftDays';
import CreateCampaignPage from '../CampaignEditorPage';
import { Link } from 'react-router-dom';
import DeleteCampaignModal from './DeleteCampaignModal/component';
import {Redirect} from "react-router-dom";
import RewardEditorModal from "./RewardEditorModal";

const { confirm } = Modal;
const { TabPane } = Tabs;

class CampaignPage extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.getCampaign(id);
    }

    render() {
        const { campaign, user, deleteCampaign, isLoading, error, isDeleted } = this.props;
        const isUserCreator = campaign.user && user && user.id === campaign.user.id;
        console.log(campaign);

        return (
            <div>
                {error === 'Campaign doesnt exist' && <Redirect to="/404"/>}
                {isDeleted && <Redirect to="/"/>}
                <Container className="py-4">
                    <h1 className="text-center">{campaign.title}</h1>
                    <h3 className="text-center pb-4">
                        {campaign.category ? campaign.category.name : null}
                    </h3>
                    <Row>
                        <Col md={8}>
                            <Carousel
                                className="carousel"
                                interval={null}
                                controls={false}
                            >
                                <Carousel.Item>
                                    <YouTube
                                        videoId={
                                            campaign.youtubeLink
                                                ? getVideoId(campaign.youtubeLink)
                                                : null
                                        }
                                        opts={{
                                            height: '400',
                                            width: '100%',
                                        }}
                                    />
                                </Carousel.Item>
                                {campaign.images &&
                                    campaign.images.map(item => (
                                        <Carousel.Item className="h-25" key={item.id}>
                                            <img
                                                alt="carousel image"
                                                className="carousel-image d-block w-100"
                                                src={item.url}
                                            />
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </Col>
                        <Col md={4}>
                            <div className="d-flex justify-content-between">
                                <Rate disabled={this.props.isAuthorized} />
                                <span>avg rate</span>
                            </div>
                            <Progress
                                className="py-2"
                                percent={
                                    (campaign.currentAmount / campaign.goalAmount) * 100
                                }
                                showInfo={false}
                            />
                            <span>${campaign.currentAmount}</span>
                            <p>pledged out of ${campaign.goalAmount} goal </p>
                            <span>30</span>
                            <p>backers</p>
                            <span>{getLeftDays(campaign.expirationDate)}</span>
                            <p>days left</p>
                            <p className="">
                                Creator:{' '}
                                {campaign.user
                                    ? `${campaign.user.firstName} ${campaign.user.lastName}`
                                    : null}
                            </p>
                            <div className="d-flex justify-content-center">
                                <Button className="w-100">Back this campaign</Button>
                            </div>
                            {isUserCreator && (
                                <div className="d-flex justify-content-between mt-5">
                                    <Link
                                        to={`/campaign/edit/${
                                            campaign.id ? campaign.id : null
                                        }`}
                                        className="btn btn-outline-success w-25"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteCampaignModal
                                        deleteCampaign={deleteCampaign}
                                        isLoading={isLoading}
                                        error={error}
                                        campaign={campaign}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
                <div>
                    <Tabs className="border-top pb-5" defaultActiveKey="1" size="large">
                        <TabPane tab="Campaign" key="1">
                            <Container>
                                <Row className="pt-3">
                                    <Col sm={8}>
                                        <h4 className="text-center">Description</h4>
                                    </Col>
                                    <Col sm={4}>
                                        <h4 className="text-center mb-3">
                                            Select reward
                                        </h4>
                                        {isUserCreator && (
                                            <RewardEditorModal/>
                                        )}
                                    </Col>
                                </Row>
                            </Container>
                        </TabPane>
                        <TabPane tab="News" key="2">
                            123
                        </TabPane>
                        <TabPane tab="Comments" key="3">
                            321
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

CampaignPage.propTypes = {
    isDeleted: PropTypes.bool.isRequired,
    deleteCampaign: PropTypes.func.isRequired,
    getCampaign: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    campaign: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default CampaignPage;
