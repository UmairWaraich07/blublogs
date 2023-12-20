import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkMode: (state) => {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", JSON.stringify("dark"));
      state.themeMode = "dark";
    },
    lightMode: (state) => {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", JSON.stringify("light"));
      state.themeMode = "light";
    },
  },
});

export const { lightMode, darkMode } = themeSlice.actions;

export default themeSlice.reducer;
