import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export interface UpdateState {
  timestamp: number
}

export interface RuntimeState {
  timestamp: number
}

const initialState: RuntimeState = {
  timestamp: dayjs().unix()
}

const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setTimestamp: (state, action: PayloadAction<number>) => {
      state.timestamp = action.payload
    }
  }
})

export const { setTimestamp } = runtimeSlice.actions

export default runtimeSlice.reducer
