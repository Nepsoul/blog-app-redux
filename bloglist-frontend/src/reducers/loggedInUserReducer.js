import { createSlice } from "@reduxjs/toolkit";

const loggedinUserSlice = createSlice({
  name: "logInUser",
  initialState: null,
  reducers: {
    setLoggedInUser(state, action) {
      return action.payload;
    },
  },
});

export const { setLoggedInUser } = loggedinUserSlice.actions;
export default loggedinUserSlice.reducer;
