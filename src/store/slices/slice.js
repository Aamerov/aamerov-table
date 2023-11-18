import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    data: [],
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    addRow(state, action) {
      state.data.push(action.payload);
    },
  },
});

export const tableActions = tableSlice.actions;

export default tableSlice;
