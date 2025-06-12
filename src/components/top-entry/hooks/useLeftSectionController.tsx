import { useCallback, useMemo, useState } from 'react'

import { useTopicsStore } from '@/store/topics-store'

export const useLeftSectionController = () => {
  const [isTopicsListOpen, setIsTopicsListOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { topics, currentTopicId, setCurrentTopic } = useTopicsStore()

  const toggleTopicsList = useCallback(() => {
    setIsTopicsListOpen(prev => !prev)
  }, [])

  const closeTopicsList = useCallback(() => {
    setIsTopicsListOpen(false)
  }, [])

  const openTopicsList = useCallback(() => {
    setIsTopicsListOpen(true)
  }, [])

  const selectTopic = useCallback(
    (topicId: string) => {
      setCurrentTopic(topicId)
    },
    [setCurrentTopic]
  )

  const currentTopic = useMemo(() => topics.find(topic => topic.id === currentTopicId), [topics, currentTopicId])

  // 过滤主题列表
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) {
      return topics
    }

    const query = searchQuery.toLowerCase().trim()
    return topics.filter(
      topic =>
        topic.name.toLowerCase().includes(query) || (topic.content && topic.content.toLowerCase().includes(query))
    )
  }, [topics, searchQuery])

  // 导出主题为Markdown
  const exportTopicAsMarkdown = useCallback(
    (topicId: string) => {
      const topic = topics.find(t => t.id === topicId)
      if (!topic) return

      // 实现导出功能
      console.log('导出为Markdown:', topic.name)
      // 这里应该添加实际的导出逻辑
    },
    [topics]
  )

  // 导出主题为图片
  const exportTopicAsImage = useCallback(
    (topicId: string) => {
      const topic = topics.find(t => t.id === topicId)
      if (!topic) return

      // 实现导出功能
      console.log('导出为图片:', topic.name)
      // 这里应该添加实际的导出逻辑
    },
    [topics]
  )

  // 删除主题
  const removeTopic = useCallback((topicId: string) => {
    console.log('删除主题:', topicId)
    // 这里应该添加实际的删除逻辑
  }, [])

  return {
    isTopicsListOpen,
    toggleTopicsList,
    closeTopicsList,
    openTopicsList,
    topics,
    filteredTopics,
    currentTopic,
    selectTopic,
    searchQuery,
    setSearchQuery,
    exportTopicAsMarkdown,
    exportTopicAsImage,
    removeTopic
  }
}
