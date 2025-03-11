import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/user.interface";

const name = "auth";

export interface AuthState {
  user?: IUser | null;
  token?: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null,
  token: localStorage.getItem("token") || null,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    resetAuth: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, resetAuth } = slice.actions;
export const AuthReducer = slice.reducer;
