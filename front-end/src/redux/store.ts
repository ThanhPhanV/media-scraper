import { configureStore } from "@reduxjs/toolkit";
import { ScraperReducer } from "./reducers/scraper-reducer";
import { AuthReducer } from "./reducers/auth-reducer";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    scraper: ScraperReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
