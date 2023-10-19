import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  clientToken: null,
  user: null,
  isLoading: false,
};

/**** Slice ****/
export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      state.clientToken = null;
      state.user = null;
      state.isLoading = false;
    },
    loginUser: (state, action) => {
      state.clientToken = action.payload.token;
      state.user = action.payload.user;
      state.isLoading = false;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
export const { logout, loginUser, updateUser } = authSlice.actions;
