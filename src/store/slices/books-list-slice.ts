import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../constants/baseUrl';

export const fetchBooksList = createAsyncThunk(
  'books/fetchBooksList',
  async () => {
    const response = await axios.get(`${BASE_URL}/books/list`);
    return response.data;
  }
);

interface BooksListState {
  booksList: [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  booksList: [],
  loading: 'idle',
} as BooksListState;

const booksListSlice = createSlice({
  name: 'booksList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooksList.fulfilled, (state, action) => {
      state.booksList = action.payload.list;
    });
  },
});

export default booksListSlice.reducer;
