import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { WebSearchStatus } from '@/types'

export interface WebSearchState {
  activeSearches: Record<string, WebSearchStatus>
}

export interface UpdateState {
  timestamp: number
}

export interface RuntimeState {
  timestamp: number
  websearch: WebSearchState
}

const initialState: RuntimeState = {
  timestamp: dayjs().unix(),
  websearch: {
    activeSearches: {}
  }
}

const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setTimestamp: (state, action: PayloadAction<number>) => {
      state.timestamp = action.payload
    },
    // WebSearch related actions
    setActiveSearches: (state, action: PayloadAction<Record<string, WebSearchStatus>>) => {
      state.websearch.activeSearches = action.payload
    },
    setWebSearchStatus: (state, action: PayloadAction<{ requestId: string; status: WebSearchStatus }>) => {
      const { requestId, status } = action.payload

      if (status.phase === 'default') {
        delete state.websearch.activeSearches[requestId]
      }

      state.websearch.activeSearches[requestId] = status
    }
  }
})

export const { setTimestamp, setWebSearchStatus } = runtimeSlice.actions

export default runtimeSlice.reducer
