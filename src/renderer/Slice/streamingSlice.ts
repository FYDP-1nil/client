import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StreamState } from 'renderer/interfaces'

const initialState: StreamState = {
  isStreaming: false,
}

export const streamingSlice = createSlice({
  name: 'streaming',
  initialState,
  reducers: {
    setStreaming: (state,action:PayloadAction<boolean>) => {
      return {...state,isStreaming:action.payload};
    },
  },
})

// Action creators are generated for each case reducer function
export const { setStreaming } = streamingSlice.actions

export default streamingSlice.reducer