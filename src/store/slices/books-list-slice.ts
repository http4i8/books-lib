import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { BASE_URL } from '../../constants/baseUrl';
import { BookRecord } from './../../types/bookRecord';

const notify = (text: string) => {
  toast.success(text);
};

export const fetchBooksList = createAsyncThunk(
  'books/fetchBooksList',
  async () => {
    try {
      const params = window.location.search;
      const response = await axios.get(`${BASE_URL}/books/list${params}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addBook = (book: BookRecord) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/books/add`, book);
    dispatch(fetchBooksList());
    notify('The book has been added');
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
    notify('The book has been edited');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = (id: number) => async (dispatch: any) => {
  try {
    await axios.delete(`${BASE_URL}/books/${id}`);
    dispatch(fetchBooksList());
    notify('The book has been deleted');
  } catch (error) {
    console.log(error);
  }
};

interface BooksListState {
  booksList: [];
  totalPages: number;
}

const initialState = {
  booksList: [],
  loading: 'idle',
  totalItems: 0,
  totalPages: 0,
} as BooksListState;

const booksListSlice = createSlice({
  name: 'booksList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooksList.fulfilled, (state, action) => {
      state.booksList = action.payload.list;
      state.totalPages = action.payload.totalPages;
    });
  },
});

export default booksListSlice.reducer;
