import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import postsReducer from "./postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    posts: postsReducer,
  },
});
