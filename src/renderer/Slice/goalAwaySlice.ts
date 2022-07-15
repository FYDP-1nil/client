import { createSlice } from '@reduxjs/toolkit'
import { CounterState } from 'renderer/interfaces'

const initialState: CounterState = {
  value: 0,
}

export const goalAwaySlice = createSlice({
  name: 'goalAway',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      return {...state,value:0}
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, reset } = goalAwaySlice.actions

export default goalAwaySlice.reducer