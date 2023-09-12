import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectSelf = (state: RootState) => state;

export const booksListSelector = createSelector(
  selectSelf,
  (state) => state.booksList
);

export const changeListSelector = createSelector(
  selectSelf,
  (state) => state.currentList.currentList
);

export const chartSelector = createSelector(
  selectSelf,
  (state) => state.chart.data
);
