import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RuntimeState {
  welcomeShown: boolean
}

const initialState: RuntimeState = { welcomeShown: false }

const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setWelcomeShown(state, action: PayloadAction<boolean>) {
      state.welcomeShown = action.payload
    }
  }
})

export const { setWelcomeShown } = runtimeSlice.actions
export default runtimeSlice.reducer
