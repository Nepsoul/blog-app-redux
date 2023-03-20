import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: [],
  reducers: {
    setAllUser(state, action) {
      // console.log(state, "state");
      //console.log(action.payload, "actin.payload");
      //state.push(action.payload);
      return action.payload;
    },
  },
});

export const { setAllUser } = userSlice.actions;
export default userSlice.reducer;
