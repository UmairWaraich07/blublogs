import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: [],
};

const profileSlice = createSlice({
  name: "profilePosts",
  initialState,
  reducers: {
    updateProfileData(state, action) {
      state.profileData = action.payload;
    },
  },
});

export const { updateProfileData } = profileSlice.actions;
export default profileSlice.reducer;
