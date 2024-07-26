import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const slice = createSlice({
  name: "data",
  initialState: {
    isLoggedIn: Boolean(localStorage.getItem("token")),
    userDetails: JSON.parse(localStorage.getItem("userDetails")),
    tableData: data,
    apiStatus: "init",
  },
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = Boolean(localStorage.getItem("token"));
      state.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    },
    setApiStatus: (state, action) => {
      console.log(action);
      state.apiStatus = action.payload.apiStatus;
    },
  },
});

export const { setIsLoggedIn, setApiStatus } = slice.actions;

export default slice;
