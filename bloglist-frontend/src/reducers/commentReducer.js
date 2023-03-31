// import { createSlice } from "@reduxjs/toolkit";
// import services from "../services/blogs";
// import { addComment } from "./blogReducer";

// const commentSlice = createSlice({
//   name: "comment",
//   initialState: [],
//   reducers: {
//     appendCommentSlice(state, action) {
//       state.push(action.payload);
//     },

//     // setCommentStore(state, action) {
//     //   console.log(action.payload, "cmt reduce");
//     //   return action.payload;
//     // },
//   },
// });

// export const { appendCommentSlice, setCommentStore } = commentSlice.actions;

// export const addNewComment = (id, commentObject) => {
//   //console.log(id, "id from reducer");
//   //console.log(commentObject, "com obj from reducer");
//   return async (dispatch) => {
//     const result = await services.createComments(id, commentObject);
//     //console.log(result, "result");
//     dispatch(appendCommentSlice(result));
//     dispatch(addComment({ id, result }));
//   };
// };

// export default commentSlice.reducer;
