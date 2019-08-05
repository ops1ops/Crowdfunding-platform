import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import RewardEditorModal from '../../RewardEditorModal';
import DeleteRewardModal from './DeleteRewardModal/component';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import Spinner from 'react-bootstrap/Spinner';

class RewardCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingSupport: false,
        };
    }

    handleSupport = () => {
        const { id, reward, supportCampaign } = this.props;

        this.setState({ isLoadingSupport: true });
            supportCampaign({ id, rewardId: reward.id })
                .then(() => {
                    this.setState({ isLoadingSupport: false });
                    notification.success({
                        message: 'Successfully supported',
                        description:
                            'Campaign was successfully supported. You can check reward in your profile',
                    });
                })
                .catch(err => {
                    this.setState({ isLoadingSupport: false });
                    notification.error({
                        message: 'Supporting error',
                        description: err,
                    });
                });
    };

    render() {
        const {
            reward,
            id,
            isUserCreator,
            deleteReward,
            isAuthorized,
            isLoading,
        } = this.props;
        const { isLoadingSupport } = this.state;

        return (
            <Card className="my-3">
                <Card.Body>
                    <Card.Title>{reward.name}</Card.Title>
                    <Card.Text className="text-muted">{reward.description}</Card.Text>
                    <Card.Text className="h6">$ {reward.amount}</Card.Text>
                    {isAuthorized ? (
                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={this.handleSupport}
                            disabled={isLoadingSupport}
                        >
                            {isLoadingSupport ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Support'
                            )}
                        </Button>
                    ) : (
                        <Link to="/login" className="btn btn-primary w-100">
                            Support
                        </Link>
                    )}
                    {isUserCreator && (
                        <>
                            <RewardEditorModal reward={reward} id={id} />
                            <DeleteRewardModal
                                campaignId={id}
                                deleteReward={deleteReward}
                                rewardId={reward.id}
                                isLoading={isLoading}
                            />
                        </>
                    )}
                </Card.Body>
            </Card>
        );
    }
}

RewardCard.propTypes = {
    supportCampaign: PropTypes.func.isRequired,
    reward: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    deleteReward: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isUserCreator: PropTypes.bool.isRequired,
};

export default RewardCard;
