import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  socket: null,
};

/**** Slice ****/
export const configSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    socketConnect: (state, action) => {
      state.socket = action.payload.socket;
    },
    socketDisconnect: (state) => {
      state.socket = null;
    },
  },
});

export default configSlice.reducer;
export const { socketConnect, socketDisconnect } = configSlice.actions;
