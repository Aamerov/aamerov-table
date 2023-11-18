import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "./slices/slice";
const store = configureStore({
  reducer: { table: tableSlice.reducer },
});

export default store;
