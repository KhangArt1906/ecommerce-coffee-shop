import { createSlice } from "@reduxjs/toolkit";

//App API
import appApi from "../services/appApi";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const { logout, addNotification, resetNotification } = userSlice.actions;
export default userSlice.reducer;
