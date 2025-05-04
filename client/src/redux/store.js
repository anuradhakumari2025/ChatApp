import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import miscellaneousSlice from "./reducers/miscellaneous.js";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscellaneousSlice.name]: miscellaneousSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
});

export default store;
