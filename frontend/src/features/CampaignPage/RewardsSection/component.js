import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RewardCard from './RewardCard/component';

class RewardSection extends Component {
    componentDidMount() {
        const { getRewards, id } = this.props;

        getRewards(id);
    }

    render() {
        const {
            rewards,
            id,
            isUserCreator,
            deleteReward,
            isLoading,
            isAuthorized,
        } = this.props;

        return (
            <div className="mt-4">
                {rewards.length ? (
                    rewards.map(reward => (
                        <RewardCard
                            key={reward.id}
                            reward={reward}
                            isLoading={isLoading}
                            id={id}
                            isAuthorized={isAuthorized}
                            isUserCreator={isUserCreator}
                            deleteReward={deleteReward}
                        />
                    ))
                ) : (
                    <p className="text-center">No rewards yet</p>
                )}
            </div>
        );
    }
}

RewardSection.propTypes = {
    getRewards: PropTypes.func.isRequired,
    deleteReward: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    rewards: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    isUserCreator: PropTypes.bool.isRequired,
};

export default RewardSection;
