import { createSelector } from 'reselect';

export const rewardsReducer = state => state.rewardsReducer;

export const selectRewardsSortedByAmount = createSelector(
    rewardsReducer,
    reducer => Object.values(reducer.rewards).sort((a, b) => a.amount - b.amount)
);

