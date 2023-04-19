import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../constants/baseUrl';
import { BookRecord } from './../../types/bookRecord';

export const fetchBooksList = createAsyncThunk(
  'books/fetchBooksList',
  async () => {
    const params = window.location.search;
    const response = await axios.get(`${BASE_URL}/books/list${params}`);
    return response.data;
  }
);

export const addBook = (book: BookRecord) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/books/add`, book);
    dispatch(fetchBooksList());
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/books/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editBook = (book: BookRecord) => async (dispatch: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/books/${book.id}`, book);
    dispatch(fetchBooksList());
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = (id: number) => async (dispatch: any) => {
  try {
    await axios.delete(`${BASE_URL}/books/${id}`);
    dispatch(fetchBooksList());
  } catch (error) {
    console.log(error);
  }
};

interface BooksListState {
  booksList: [];
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
