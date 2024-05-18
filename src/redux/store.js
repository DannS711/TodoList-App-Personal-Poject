import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.js";

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
