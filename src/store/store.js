import { configureStore } from "@reduxjs/toolkit";
import precisionSlice from "./slices/precisionSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { bookApi } from "./api/bookApi";

const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    precision: precisionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

setupListeners(store.dispatch);

export default store;
