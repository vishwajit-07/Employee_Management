// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setLoading, logout } = authSlice.actions;

// **Export the reducer** properly
export default authSlice.reducer;  // Ensure you're exporting the reducer here
