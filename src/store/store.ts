import { Action, configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

import booksListReducer from './slices/books-list-slice';

export const store = configureStore({
  reducer: {
    booksList: booksListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type State = ReturnType<typeof store.getState>;

export function dispatch(action: Action) {
  return () => store.dispatch(action);
}
