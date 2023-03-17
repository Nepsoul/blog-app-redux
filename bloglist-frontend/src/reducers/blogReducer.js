import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const createBlogSlice = createSlice({
  name: "Blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      action.payload.user = { id: action.payload.user };
      state.push(action.payload);
    },
    setBlogReducer(state, action) {
      return action.payload;
    },

    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },

    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const setBlog = () => {
  return async (dispatch) => {
    const getBlog = await blogService.getAll();
    dispatch(setBlogReducer(getBlog));
  };
};

export const { setBlogReducer, appendBlog, updateBlog, deleteBlog } =
  createBlogSlice.actions;
export default createBlogSlice.reducer;
