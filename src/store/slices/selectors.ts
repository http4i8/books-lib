import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectSelf = (state: RootState) => state;

export const booksListSelector = createSelector(
  selectSelf,
  (state) => state.booksList.booksList
);

export const changeListSelector = createSelector(
  selectSelf,
  (state) => state.currentList.currentList
);
