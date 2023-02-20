import { configureStore } from '@reduxjs/toolkit';
import pointHomeReducer from './Slice/pointHomeSlice';
import pointAwayReducer from './Slice/pointAwaySlice';
import gameReducer from './Slice/gameSlice';
import teamsReducer from './Slice/teamsSlice';
import streamingReducer from './Slice/streamingSlice';
import tokenReducer from './Slice/tokenSlice';

export const store = configureStore({
  reducer: {
    pointHome: pointHomeReducer,
    pointAway: pointAwayReducer,
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
