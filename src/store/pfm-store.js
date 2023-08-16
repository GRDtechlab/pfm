import { configureStore } from "@reduxjs/toolkit";
import { pfmApi } from "../services/pfm-api";
import authReducer from "../services/auth-slice";

// Step 1 : Create store then provide this store to main.jsx file.

const pfmStore = configureStore({
  reducer: {
    [pfmApi.reducerPath]: pfmApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pfmApi.middleware),
});

export default pfmStore;
