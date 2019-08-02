import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import RewardEditorModal from '../../RewardEditorModal';
import DeleteRewardModal from './DeleteRewardModal/component';
import { Link } from 'react-router-dom';

class RewardCard extends Component {
    render() {
        const {
            reward,
            id,
            isUserCreator,
            deleteReward,
            isLoading,
            isAuthorized,
        } = this.props;
        console.log('REWARD', reward);
        return (
            <Card className="my-3">
                <Card.Body>
                    <Card.Title>{reward.name}</Card.Title>
                    <Card.Text>{reward.description}</Card.Text>
                    <Card.Text>${reward.amount}</Card.Text>
                    {isAuthorized ? (
                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={console.log(1)}
                        >
                            Support
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
    reward: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    deleteReward: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isUserCreator: PropTypes.bool.isRequired,
};

export default RewardCard;
