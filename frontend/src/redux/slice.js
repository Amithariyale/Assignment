import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const slice = createSlice({
  name: "data",
  initialState: {
    isLoggedIn: Boolean(localStorage.getItem("token")),
    userDetails: JSON.parse(localStorage.getItem("userDetails")),
    tableData: data,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = Boolean(localStorage.getItem("token"));
      state.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    },
  },
});

export const { setIsLoggedIn } = slice.actions;

export default slice;
