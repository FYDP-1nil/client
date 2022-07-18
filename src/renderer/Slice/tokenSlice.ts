import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TokenState } from 'renderer/interfaces';

const initialState: TokenState = {
  leagueValid: false,
  userToken: '',
};

export const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    verifyLeague: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        leagueValid: action.payload,
      };
    },
    saveJWT: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        userToken: action.payload,
      };
    },
    clearSession: (state) => {
      return { ...state, ...initialState };
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveJWT, clearSession, verifyLeague } = tokenSlice.actions;

export default tokenSlice.reducer;
