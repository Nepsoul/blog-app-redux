import { createSlice } from "@reduxjs/toolkit";

const createBlogSlice = createSlice({
  name: "Blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      //console.log(action.payload, "append");
      state.push(action.payload);
    },
    setBlogReducer(state, action) {
      // console.log(state, "state");
      // console.log(action, "action");
      // console.log(action.payload, "setBlogReducer of reducer");
      return action.payload;
    },

    updateBlog(state, action) {
      //console.log(action.payload, "blog reducer");
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },

    deleteBlog(state, action) {
      console.log(action, "action from del reducer");
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogReducer, appendBlog, updateBlog, deleteBlog } =
  createBlogSlice.actions;
export default createBlogSlice.reducer;
