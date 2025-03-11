import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IScraper } from "../../interfaces/scraper.interface";

const name = "scraper";

export interface ScraperState {
  scrapers: IScraper[];
  page: number;
  totalPage: number;
  totalCount: number;
}

const initialState: ScraperState = {
  scrapers: [],
  page: 1,
  totalPage: 1,
  totalCount: 0,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setScrapers: (state, action: PayloadAction<ScraperState>) => {
      state.scrapers = action.payload.scrapers;
      state.page = action.payload.page;
      state.totalPage = action.payload.totalPage;
      state.totalCount = action.payload.totalCount;
    },
    resetScrapers: (state) => {
      state.scrapers = [];
      state.page = 1;
      state.totalPage = 1;
      state.totalCount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setScrapers, resetScrapers } = slice.actions;
export const ScraperReducer = slice.reducer;
