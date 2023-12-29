import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },

    updatePosts(state, action) {
      state.posts = [...state.posts, action.payload];
    },

    editPost(state, action) {
      const postToEdit = action.payload;

      if (state.posts.length > 0) {
        state.posts = state.posts.map((post) => {
          if (post.$id === postToEdit.$id) {
            post = { ...postToEdit };
          }
          return post;
        });
      }
    },
  },
});

export const { setPosts, updatePosts, editPost } = postSlice.actions;
export default postSlice.reducer;
