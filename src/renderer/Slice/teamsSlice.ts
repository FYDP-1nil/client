import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TeamsState } from 'renderer/interfaces';

const initialState: TeamsState = {
  homeTeamName: '',
  awayTeamName: '',
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    assignTeamNames: (state, action:PayloadAction<TeamsState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state,
        homeTeamName: action.payload.homeTeamName,
        awayTeamName: action.payload.awayTeamName,
      };
    },
    assignHomeTeamName: (state, action:PayloadAction<string>) => {
      return {
        ...state,
        homeTeamName: action.payload,
      };
    },
    assignAwayTeamName: (state, action:PayloadAction<string>) => {
      return {
        ...state,
        awayTeamName: action.payload,
      };
    },
    resetNames: (state) => {
      return { ...state, homeTeamName: '', awayTeamName: '' };
    },
  },
});

// Action creators are generated for each case reducer function
export const { assignTeamNames, assignHomeTeamName, assignAwayTeamName, resetNames } =
  teamsSlice.actions;

export default teamsSlice.reducer;
