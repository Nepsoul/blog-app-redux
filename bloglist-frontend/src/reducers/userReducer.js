import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: [],
  reducers: {
    appendUserBlog(state, action) {
      const userReducerMatch = state.find(
        (user) => user.id === action.payload.user.id
      );
      let newBlogs = [...userReducerMatch.blogs, action.payload];
      return state.map((user) =>
        user === userReducerMatch ? { ...user, blogs: newBlogs } : user
      );

      // userRedu.blogs.push(action.payload);
    },
    setAllUser(state, action) {
      // console.log(state, "state");
      // console.log(action.payload, "actin.payload");
      //state.push(action.payload);
      return action.payload;
    },
  },
});

export const { setAllUser, appendUserBlog } = userSlice.actions;
export default userSlice.reducer;
