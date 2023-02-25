import { createSlice } from '@reduxjs/toolkit'
import { CounterState } from 'renderer/interfaces'

const initialState: CounterState = {
  value: 0,
}

export const pointAwaySlice = createSlice({
  name: 'pointAway',
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
      if(state.value>=1){
        state.value -= 1
      }
    },
    plus2: (state) => {
      state.value += 2
    },
    minus2: (state) => {
      if(state.value>=2){
        state.value -= 2
      }
    },
    plus3: (state) => {
      state.value += 3
    },
    minus3: (state) => {
      if(state.value>=3){
        state.value -= 3
      }
    },
    plus6: (state) => {
      state.value += 6
    },
    minus6: (state) => {
      if(state.value>=6){
        state.value -= 6
      }
    },
    reset: (state) => {
      return {...state,value:0}
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, reset, plus2, plus3, plus6, minus2, minus3, minus6 } = pointAwaySlice.actions

export default pointAwaySlice.reducer