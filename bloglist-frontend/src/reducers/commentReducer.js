import { createSlice } from "@reduxjs/toolkit";
import services from "../services/blogs";

const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    appendCommentSlice(state, action) {
      state.push(action.payload);
    },

    // setCommentStore(state, action) {
    //   console.log(action.payload, "cmt reduce");
    //   return action.payload;
    // },
  },
});

export const { appendCommentSlice, setCommentStore } = commentSlice.actions;

export const addComment = (id, commentObject) => {
  return async (dispatch) => {
    const result = await services.createComments(id, commentObject);
    console.log(result, "result");
    dispatch(appendCommentSlice(result));
  };
};

export default commentSlice.reducer;
