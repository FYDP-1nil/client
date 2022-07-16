import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState } from 'renderer/interfaces'

const initialState: GameState = {
  activeGame: false,
  isSecondHalf:false,
  isHalfTime: false,
  currentMinute: 0
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setActiveGame: (state,action:PayloadAction<boolean>) => {
      return {...state,activeGame:action.payload};
    },
    setHalfTime: (state,action:PayloadAction<boolean>) => {
      return {...state,isHalfTime:action.payload};
    },
    setSecondHalf: (state,action:PayloadAction<boolean>) => {
      return {...state,isSecondHalf:action.payload};
    },
    setCurrentMinute: (state,action:PayloadAction<number>) => {
      return {...state,currentMinute:action.payload};
    },
  },
})

// Action creators are generated for each case reducer function
export const { setActiveGame, setHalfTime, setCurrentMinute, setSecondHalf } = gameSlice.actions

export default gameSlice.reducer