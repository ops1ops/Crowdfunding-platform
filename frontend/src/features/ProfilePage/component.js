import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './style.css';
import { Avatar, Tabs } from 'antd';
import { PropTypes } from 'prop-types';


const { TabPane } = Tabs;

class ProfilePage extends Component {

    componentDidMount() {
        const { getUserInfo, user } = this.props;

        getUserInfo(user.id);
    }

    render() {
        const { userInfo } = this.props;
        console.log(userInfo)
        return (
            <>
                <div className="bg-light">
                    <Container>
                        <Row>
                            <Col sm={12} className="">
                                <div className="d-flex justify-content-center align-items-center flex-column pt-5 pb-3">
                                    <Avatar
                                        size={120}
                                        icon="user"
                                        className="Avatar-profile"
                                    />
                                    <h1>Ilya Drozdovich</h1>
                                    <p>
                                        <span className="mr-3">Rewards count</span>
                                        <span>Joined JUL 2019</span>
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
                        <TabPane tab="Privacy" key="1">
                            123
                        </TabPane>
                        <TabPane tab="Rewards" key="2">
                            123
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
};

export default ProfilePage;
