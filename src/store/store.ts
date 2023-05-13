import { configureStore } from '@reduxjs/toolkit';

import booksListReducer from './slices/books-list-slice';
import currentListReducer from './slices/current-list-slice';
import chartSliceReducer from './slices/chart-slice';

export const store = configureStore({
  reducer: {
    booksList: booksListReducer,
    currentList: currentListReducer,
    chart: chartSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
