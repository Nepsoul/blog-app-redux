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

    addComment(state, action) {
      const returnId = state.find((blog) => blog.id === action.payload.id);
      console.log(returnId, "returnid");
      returnId.comments.push(action.payload.result);
    },
  },
});

export const setBlog = () => {
  return async (dispatch) => {
    const getBlog = await blogService.getAll();
    dispatch(setBlogReducer(getBlog));
  };
};

export const setComment = (id, commentObject) => {
  console.log(id, "id from reducer");
  console.log(commentObject, "com obj from reducer");
  return async (dispatch) => {
    const result = await blogService.createComments(id, commentObject);
    console.log(result, "result");
    dispatch(addComment({ id, result }));
  };
};

// export const postBlog = () => {
//   return async (dispatch) => {
//     const createPost = await blogService.create();
//   };
// };

export const {
  setBlogReducer,
  appendBlog,
  updateBlog,
  deleteBlog,
  addComment,
} = createBlogSlice.actions;
export default createBlogSlice.reducer;
