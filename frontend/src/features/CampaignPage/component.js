import React, { Component } from 'react';
import './styles.css';
import { PropTypes } from 'prop-types';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { Progress, Tabs, Rate } from 'antd';
import getVideoId from '../../utils/getVideoId';
import getLeftDays from '../../utils/getLeftDays';
import { Link, Redirect } from 'react-router-dom';
import DeleteCampaignModal from './DeleteCampaignModal/component';
import RewardEditorModal from './RewardEditorModal';
import RewardSection from './RewardsSection';

const { TabPane } = Tabs;

class CampaignPage extends Component {
    componentDidMount() {
        const { match, user } = this.props;
        const { id } = match.params;
        const data = {
            id,
            userId: user.id ? user.id : 0,
        };
        console.log('DATA', data);
        this.props.getCampaign(data);
    }

    handleRate = (value) => {
        const { rateCampaign, campaign } = this.props;
        const data = {
            id: campaign.id,
            rating: value,
        };

        rateCampaign(data);
    };

    render() {
        const {
            campaign,
            user,
            deleteCampaign,
            isLoading,
            error,
            isDeleted,
            rateCampaign,
            match,
        } = this.props;
        const isUserCreator = campaign.user && user && user.id === campaign.user.id;

        return (
            <div className="bg-light">
                {error === 'Campaign doesnt exist' && <Redirect to="/404" />}
                {isDeleted && <Redirect to="/" />}
                <Container className="py-4">
                    <h1 className="text-center">{campaign.title}</h1>
                    <h3 className="text-center pb-4">
                        {campaign.category ? campaign.category.name : null}
                    </h3>
                    <Row>
                        <Col md={8}>
                            <Carousel
                                className="carousel mb-2"
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
                                <Rate
                                    allowClear={false}
                                    value={campaign.ratedByUser}
                                    onChange={this.handleRate}
                                    disabled={!user.isAuthorized}
                                />
                                <span>
                                    {campaign.avgRate === 0
                                        ? 'No ratings yet'
                                        : `Rate: ${campaign.avgRate}`}
                                </span>
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
                                            <RewardEditorModal
                                                id={match.params.id}
                                                isCreating="true"
                                            />
                                        )}
                                        <RewardSection
                                            id={match.params.id}
                                            isUserCreator={isUserCreator}
                                        />
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
    rateCampaign: PropTypes.func.isRequired,
    getCampaign: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    campaign: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default CampaignPage;
