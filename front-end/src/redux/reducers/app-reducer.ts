import { createSlice } from "@reduxjs/toolkit";

const name = "auth";

export interface AppState {
  isLoading?: boolean;
}

const initialState: AppState = {
  isLoading: false,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, stopLoading } = slice.actions;
export const AppReducer = slice.reducer;
