import { createSelector } from 'reselect';

export const categoriesSelector = state => state.createCampaignPageReducer;

export const selectAllCategoriesTitles = createSelector(
    categoriesSelector,
    reducer => reducer.categories ? reducer.categories.map(item => item.name) : []
);

