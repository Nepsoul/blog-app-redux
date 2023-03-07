import { createSlice } from "@reduxjs/toolkit";

const createBlogSlice = createSlice({
  name: "Blogs",
  initialState: [],
  reducers: {
    createBlogs(state, action) {
      const content = action.payload;
      //console.log(content, "content");
      state.push({
        content,
      });
      // state.concat({
      //   content,
      // });
    },
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

    incrementOfLike(state, action) {
      // console.log(state, "state of like reducer");
      // const id = action.payload.id;
      // // //console.log(id, "id of reducer");
      // const updatedBlog = state.find((blogs) => blogs.id === id);
      // console.log(updatedBlog, "updatedBlog from reducer");

      // const newBlog = { ...updatedBlog, likes: updatedBlog.likes + 1 };
      // console.log(newBlog, "new blog from likereducer");
      // const updatelike = state.map((blogs) =>
      //   blogs.id === id ? newBlog : blogs
      // );
      // console.log(updatelike, "updatelike frm like");
      // return updatelike;

      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, likes: item.likes + 1 };
        } else return item;
      });
    },
  },
});

export const { setBlogReducer, createBlogs, appendBlog, incrementOfLike } =
  createBlogSlice.actions;
export default createBlogSlice.reducer;
