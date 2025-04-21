import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 定义主题和助手的排序方式
export enum SortType {
  ALPHABETICAL = 'alphabetical',
  RECENT_USE = 'recent_use',
  RECENT_ADD = 'recent_add'
}

// 定义助手类型
export interface Assistant {
  id: string
  name: string
  description: string
  avatar: string
  model: string
  lastUsed?: number
  createdAt?: number
}

// 定义主题类型
export interface Topic {
  id: string
  name: string
  content: string
  lastUsed?: number
  createdAt?: number
}

// 定义状态类型
export interface TopEntryState {
  // 助手相关状态
  assistants: Assistant[]
  currentAssistantId: string | null
  assistantSortType: SortType

  // 主题相关状态
  topics: Topic[]
  currentTopicId: string | null
  topicSortType: SortType

  // UI状态
  isAssistantsListOpen: boolean
  isTopicsListOpen: boolean
}

// 初始状态
const initialState: TopEntryState = {
  assistants: [],
  currentAssistantId: null,
  assistantSortType: SortType.RECENT_USE,

  topics: [],
  currentTopicId: null,
  topicSortType: SortType.RECENT_USE,

  isAssistantsListOpen: false,
  isTopicsListOpen: false
}

// 创建reducer
const topEntrySlice = createSlice({
  name: 'topEntry',
  initialState,
  reducers: {
    // 助手相关操作
    setAssistants(state, action: PayloadAction<Assistant[]>) {
      state.assistants = action.payload
    },
    addAssistant(state, action: PayloadAction<Assistant>) {
      state.assistants.push(action.payload)
    },
    updateAssistant(state, action: PayloadAction<Assistant>) {
      const index = state.assistants.findIndex(a => a.id === action.payload.id)
      if (index !== -1) {
        state.assistants[index] = action.payload
      }
    },
    deleteAssistant(state, action: PayloadAction<string>) {
      state.assistants = state.assistants.filter(a => a.id !== action.payload)
    },
    setCurrentAssistant(state, action: PayloadAction<string>) {
      state.currentAssistantId = action.payload
      // 更新lastUsed时间
      const index = state.assistants.findIndex(a => a.id === action.payload)
      if (index !== -1) {
        state.assistants[index].lastUsed = Date.now()
      }
    },
    setAssistantSortType(state, action: PayloadAction<SortType>) {
      state.assistantSortType = action.payload
    },

    // 主题相关操作
    setTopics(state, action: PayloadAction<Topic[]>) {
      state.topics = action.payload
    },
    addTopic(state, action: PayloadAction<Topic>) {
      state.topics.push(action.payload)
    },
    updateTopic(state, action: PayloadAction<Topic>) {
      const index = state.topics.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.topics[index] = action.payload
      }
    },
    deleteTopic(state, action: PayloadAction<string>) {
      state.topics = state.topics.filter(t => t.id !== action.payload)
    },
    setCurrentTopic(state, action: PayloadAction<string>) {
      state.currentTopicId = action.payload
      // 更新lastUsed时间
      const index = state.topics.findIndex(t => t.id === action.payload)
      if (index !== -1) {
        state.topics[index].lastUsed = Date.now()
      }
    },
    setTopicSortType(state, action: PayloadAction<SortType>) {
      state.topicSortType = action.payload
    },

    // UI状态操作
    setAssistantsListOpen(state, action: PayloadAction<boolean>) {
      state.isAssistantsListOpen = action.payload
    },
    setTopicsListOpen(state, action: PayloadAction<boolean>) {
      state.isTopicsListOpen = action.payload
    },

    // 重置状态
    resetTopEntryState(state) {
      Object.assign(state, initialState)
    }
  }
})

// 导出actions
export const {
  setAssistants,
  addAssistant,
  updateAssistant,
  deleteAssistant,
  setCurrentAssistant,
  setAssistantSortType,
  setTopics,
  addTopic,
  updateTopic,
  deleteTopic,
  setCurrentTopic,
  setTopicSortType,
  setAssistantsListOpen,
  setTopicsListOpen,
  resetTopEntryState
} = topEntrySlice.actions

export default topEntrySlice.reducer