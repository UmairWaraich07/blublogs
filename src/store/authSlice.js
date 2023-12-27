import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  userData: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.authStatus = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.authStatus = false;
      state.userData = [];
    },
    updateUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, updateUserData } = authSlice.actions;
export default authSlice.reducer;
