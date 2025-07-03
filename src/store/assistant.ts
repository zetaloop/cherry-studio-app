import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AssistantsState {
  tagsOrder: string[]
}

const initialState: AssistantsState = {
  tagsOrder: []
}

const assistantsSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {
    setTagsOrder: (state, action: PayloadAction<string[]>) => {
      state.tagsOrder = action.payload
    }
  }
})

export const { setTagsOrder } = assistantsSlice.actions

export default assistantsSlice.reducer
