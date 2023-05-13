import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../../constants';

export const fetchChart = createAsyncThunk('chart/fetchChart', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/books/stat`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  data: [],
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChart.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export default chartSlice.reducer;
