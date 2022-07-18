import { configureStore } from '@reduxjs/toolkit';
import goalHomeReducer from './Slice/goalHomeSlice';
import goalAwayReducer from './Slice/goalAwaySlice';
import gameReducer from './Slice/gameSlice';
import teamsReducer from './Slice/teamsSlice';
import streamingReducer from './Slice/streamingSlice';
import tokenReducer from './Slice/tokenSlice';

export const store = configureStore({
  reducer: {
    goalHome: goalHomeReducer,
    goalAway: goalAwayReducer,
    game: gameReducer,
    teams: teamsReducer,
    streaming: streamingReducer,
    tokens: tokenReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
