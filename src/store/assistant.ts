import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DEFAULT_CONTEXTCOUNT, DEFAULT_TEMPERATURE } from '@/constants'
import i18n from '@/i18n'
import { Assistant } from '@/types/assistant'

const initialAssistant: Assistant = {
  id: 'default',
  name: i18n.t('chat.default.name'),
  emoji: '😀',
  prompt: '',
  topics: [],
  type: 'assistant',
  settings: {
    temperature: DEFAULT_TEMPERATURE,
    contextCount: DEFAULT_CONTEXTCOUNT,
    enableMaxTokens: false,
    maxTokens: 0,
    streamOutput: true,
    topP: 1,
    toolUseMode: 'prompt',
    customParameters: []
  }
}

export interface AssistantsState {
  defaultAssistant: Assistant
  tagsOrder: string[]
}

const initialState: AssistantsState = {
  defaultAssistant: initialAssistant,
  tagsOrder: []
}

const assistantsSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {
    updateDefaultAssistant: (state, action: PayloadAction<{ assistant: Assistant }>) => {
      state.defaultAssistant = action.payload.assistant
    },
    setTagsOrder: (state, action: PayloadAction<string[]>) => {
      state.tagsOrder = action.payload
    }
  }
})

export const { updateDefaultAssistant, setTagsOrder } = assistantsSlice.actions

export default assistantsSlice.reducer
