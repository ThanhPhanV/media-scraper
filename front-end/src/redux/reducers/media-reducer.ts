import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMedia } from "../../interfaces/media.interface";

const name = "media";

export interface MediaState {
  media: IMedia[];
  page: number;
  totalPage: number;
  totalCount: number;
}

const initialState: MediaState = {
  media: [],
  page: 1,
  totalPage: 1,
  totalCount: 0,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setMedia: (state, action: PayloadAction<MediaState>) => {
      state.media = action.payload.media;
      state.page = action.payload.page;
      state.totalPage = action.payload.totalPage;
      state.totalCount = action.payload.totalCount;
    },
    resetMedia: (state) => {
      state.media = [];
      state.page = 1;
      state.totalPage = 1;
      state.totalCount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMedia, resetMedia } = slice.actions;
export const MediaReducer = slice.reducer;
