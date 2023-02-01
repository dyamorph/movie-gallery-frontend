import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "./slices/movies.js";
import { authReducer } from "./slices/auth.js";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});

export default store;
