import { configureStore } from "@reduxjs/toolkit";
import precisionSlice from "./slices/precisionSlice";

const store = configureStore({
  reducer: {
    precision: precisionSlice,
  },
});
export default store;
