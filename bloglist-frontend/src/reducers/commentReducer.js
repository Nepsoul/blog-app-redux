import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    // appendCommentSlice(state, action) {
    //   state.push(action.payload);
    // },
    setCommentStore(state, action) {
      return action.payload;
    },
  },
});

export const { appendCommentSlice, setCommentStore } = commentSlice.actions;
export default commentSlice.reducer;
