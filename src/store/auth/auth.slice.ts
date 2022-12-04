import { createSlice } from "@reduxjs/toolkit";
import { AuthReducerState } from "../../interfaces/auth-store/auth-reducer-state-interface";

const initialState: AuthReducerState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state) {
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = true;
    },
    loginFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    signupStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    signupFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authSliceName = authSlice.name;
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authCaseReducers = authSlice.caseReducers;
