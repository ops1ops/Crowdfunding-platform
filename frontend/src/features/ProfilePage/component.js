import React, { Component } from 'react';
import * as moment from 'moment';
import { PropTypes } from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './style.css';
import { Avatar, Tabs } from 'antd';
import getFullName from '../../utils/getFullName';

import RewardsTab from './RewardsTab/component';
import CapaignsTab from './CampaignsTab/component';

const { TabPane } = Tabs;

class ProfilePage extends Component {
    componentDidMount() {
        const { getUserInfo, user } = this.props;

        getUserInfo(user.id);
    }

    render() {
        const { userInfo, deleteCampaign, isLoading } = this.props;

        return (
            <>
                <div className="bg-light">
                    <Container>
                        <Row>
                            <Col sm={12} className="">
                                <div className="Profile-flex pt-5 pb-3">
                                    <Avatar
                                        size={120}
                                        icon="user"
                                        className="Avatar-profile"
                                    />
                                    <h1>
                                        {userInfo.firstName &&
                                            userInfo.lastName &&
                                            getFullName(
                                                userInfo.firstName,
                                                userInfo.lastName
                                            )}
                                    </h1>
                                    <p>
                                        <span>
                                            Rewards{': '}
                                            {userInfo.rewards
                                                ? userInfo.rewards.length
                                                : ''}
                                        </span>
                                        <span className="mx-4">
                                            Joined{' '}
                                            {moment(userInfo.createdAt).format(
                                                'MMM YYYY'
                                            )}
                                        </span>
                                        <span className="mr-3">
                                            Campaigns{': '}
                                            {userInfo.campaigns
                                                ? userInfo.campaigns.length
                                                : ''}
                                        </span>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Tabs
                        className="border-top pb-5 text-center"
                        defaultActiveKey="1"
                        size="large"
                    >
                        <TabPane tab="Your rewards" key="1">
                            <RewardsTab rewards={userInfo.rewards ? userInfo.rewards : []} />
                        </TabPane>
                        <TabPane tab="Your campaigns" key="2">
                            <CapaignsTab
                                campaigns={userInfo.campaigns}
                                deleteCampaign={deleteCampaign}
                                isLoading={isLoading}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </>
        );
    }
}

ProfilePage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    deleteCampaign: PropTypes.func.isRequired,
};

export default ProfilePage;
