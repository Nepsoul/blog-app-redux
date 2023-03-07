import { createSlice } from "@reduxjs/toolkit";

const createBlogSlice = createSlice({
  name: "Blogs",
  initialState: [],
  reducers: {
    createBlogs(state, action) {
      const content = action.payload;
      console.log(content, "content");
      state.push({
        content,
      });
    },
    appendBlog(state, action) {
      console.log(action.payload, "append");
      state.push(action.payload);
    },
    setBlogReducer(state, action) {
      console.log(state, "state");
      console.log(action, "action");
      console.log(action.payload, "setBlogReducer of reducer");
      return action.payload;
    },

    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
  },
});

export const { setBlogReducer, createBlogs, appendBlog, updateBlog } =
  createBlogSlice.actions;
export default createBlogSlice.reducer;
