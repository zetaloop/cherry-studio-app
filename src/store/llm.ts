import { createSlice } from '@reduxjs/toolkit'

import { Model } from '@/types/assistant'

export interface LLMState {
  defaultModel: Model | undefined
  topicNamingModel: Model | undefined
  translateModel: Model | undefined
}

const initialState: LLMState = {
  defaultModel: undefined,
  topicNamingModel: undefined,
  translateModel: undefined
}

const llmSlice = createSlice({
  name: 'llm',
  initialState,
  reducers: {
    setDefaultModel: (state, action) => {
      state.defaultModel = action.payload
    },
    setTopicNamingModel: (state, action) => {
      state.topicNamingModel = action.payload
    },
    setTranslateModel: (state, action) => {
      state.translateModel = action.payload
    }
  }
})

export const { setDefaultModel, setTopicNamingModel, setTranslateModel } = llmSlice.actions

export default llmSlice.reducer
