import { createSlice } from '@reduxjs/toolkit';

import { statusList } from '../../constants';

const initialState = {
  currentList: { id: 999, title: '' },
};

const currentListSlice = createSlice({
  name: 'currentList',
  initialState,
  reducers: {
    changeCurrentList(state, action) {
      const list = action.payload;
      const status = statusList.find((elm) => elm.id === Number(list));
      if (status !== undefined) {
        state.currentList = status;
      }
    },
  },
});

export const listActions = currentListSlice.actions;

export default currentListSlice.reducer;
