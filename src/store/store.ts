import { configureStore } from '@reduxjs/toolkit';

import booksListReducer from './slices/books-list-slice';
import currentListReducer from './slices/current-list-slice';

export const store = configureStore({
  reducer: {
    booksList: booksListReducer,
    currentList: currentListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
