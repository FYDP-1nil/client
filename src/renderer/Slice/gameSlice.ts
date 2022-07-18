import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState } from 'renderer/interfaces'

const initialState: GameState = {
  activeGame: false,
  gameEnded:false,
  isHalfTime: false,
  isSecondHalf: false,
  currentMinute: 0,
  gameId: ''
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setActiveGame: (state,action:PayloadAction<boolean>) => {
      return {...state,activeGame:action.payload};
    },
    setGameId: (state,action:PayloadAction<string>) => {
      return {...state,gameId:action.payload};
    },
    setHalfTime: (state,action:PayloadAction<boolean>) => {
      return {...state,isHalfTime:action.payload};
    },
    setSecondHalf: (state,action:PayloadAction<boolean>) => {
      return {...state,isSecondHalf:action.payload};
    },
    setGameEnded: (state,action:PayloadAction<boolean>) => {
      return {...state,gameEnded:action.payload};
    },
    setCurrentMinute: (state,action:PayloadAction<number>) => {
      return {...state,currentMinute:action.payload};
    },
    reset: (state) => {
      return {...state,...initialState};
    }
  },
})

// Action creators are generated for each case reducer function
export const { setActiveGame, setHalfTime, setCurrentMinute, setSecondHalf, setGameId, setGameEnded, reset } = gameSlice.actions

export default gameSlice.reducer