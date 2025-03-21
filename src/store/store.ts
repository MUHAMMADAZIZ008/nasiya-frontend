import { configureStore } from "@reduxjs/toolkit";
import boardValue from "./slices/boart";

export const store = configureStore({
  reducer: {
    board: boardValue,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
