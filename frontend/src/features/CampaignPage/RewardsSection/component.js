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
            isLoading,
            rewards,
            id,
            isUserCreator,
            deleteReward,
            isSupportLoading,
            isAuthorized,
            supportCampaign,
        } = this.props;

        return (
            <div className="mt-4">
                {rewards.length ? (
                    rewards.map(reward => (
                        <RewardCard
                            key={reward.id}
                            reward={reward}
                            isSupportLoading={isSupportLoading}
                            isLoading={isLoading}
                            id={id}
                            isAuthorized={isAuthorized}
                            isUserCreator={isUserCreator}
                            deleteReward={deleteReward}
                            supportCampaign={supportCampaign}
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
    supportCampaign: PropTypes.func.isRequired,
    getRewards: PropTypes.func.isRequired,
    deleteReward: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
    isSupportLoading: PropTypes.bool.isRequired,
    rewards: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    isUserCreator: PropTypes.bool.isRequired,
};

export default RewardSection;
