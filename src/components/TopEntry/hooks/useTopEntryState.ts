import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'
import { Assistant, setAssistants, setCurrentAssistant, setCurrentTopic, setTopics, Topic } from '@/store/top-entry'

import { DEFAULT_ASSISTANTS, DEFAULT_TOPICS, getCurrentAssistant, getCurrentTopic } from '../Config'

export const useTopEntryState = () => {
  const dispatch = useAppDispatch()
  const topEntryState = useAppSelector(state => state.topEntry)

  // 初始化数据
  useEffect(() => {
    // 如果没有助手数据，加载默认数据
    if (topEntryState.assistants.length === 0) {
      dispatch(setAssistants(DEFAULT_ASSISTANTS))

      if (DEFAULT_ASSISTANTS.length > 0) {
        dispatch(setCurrentAssistant(DEFAULT_ASSISTANTS[0].id))
      }
    }

    // 如果没有主题数据，加载默认数据
    if (topEntryState.topics.length === 0) {
      dispatch(setTopics(DEFAULT_TOPICS))

      if (DEFAULT_TOPICS.length > 0) {
        dispatch(setCurrentTopic(DEFAULT_TOPICS[0].id))
      }
    }
  }, [dispatch])

  // 获取当前助手
  const currentAssistant = getCurrentAssistant(topEntryState.assistants, topEntryState.currentAssistantId)

  // 获取当前主题
  const currentTopic = getCurrentTopic(topEntryState.topics, topEntryState.currentTopicId)

  return {
    ...topEntryState,
    currentAssistant,
    currentTopic
  }
}

// 类型定义
export interface TopEntryContextProps {
  assistants: Assistant[]
  topics: Topic[]
  currentAssistant: Assistant | null
  currentTopic: Topic | null
  isAssistantsListOpen: boolean
  isTopicsListOpen: boolean
}
