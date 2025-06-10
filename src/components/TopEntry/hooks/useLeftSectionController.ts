import { useEffect, useMemo, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'
import {
  addTopic,
  deleteTopic,
  setCurrentTopic,
  setTopicsListOpen,
  setTopicSortType,
  SortType,
  Topic,
  updateTopic
} from '@/store/top-entry'

import { createNewTopic, sortTopics } from '../Config'

export const useLeftSectionController = () => {
  const dispatch = useAppDispatch()
  const { topics, currentTopicId, topicSortType, isTopicsListOpen } = useAppSelector(state => state.topEntry)

  // 本地状态
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null)

  // 当前主题
  const currentTopic = topics.find(t => t.id === currentTopicId) || (topics.length > 0 ? topics[0] : null)

  // 筛选和排序后的主题列表
  const filteredTopics = useMemo(() => {
    // 直接在组件内部实现搜索逻辑，不依赖外部函数
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim()
      const results = topics.filter(
        topic =>
          topic.name.toLowerCase().includes(query) || (topic.content && topic.content.toLowerCase().includes(query))
      )
      console.log('搜索查询:', searchQuery, '结果数量:', results.length, '第一个结果:', results[0]?.name)
      return results
    }

    // 否则按照指定的排序方式排序主题
    return sortTopics(topics, topicSortType)
  }, [topics, searchQuery, topicSortType])

  // 每次打开侧边栏时清除搜索
  useEffect(() => {
    if (isTopicsListOpen) {
      setSearchQuery('')
    }
  }, [isTopicsListOpen])

  // 打开主题列表
  const openTopicsList = () => {
    setSearchQuery('')
    dispatch(setTopicsListOpen(true))
  }

  // 关闭主题列表
  const closeTopicsList = () => {
    dispatch(setTopicsListOpen(false))
  }

  // 切换主题列表状态
  const toggleTopicsList = () => {
    if (!isTopicsListOpen) {
      setSearchQuery('')
    }

    dispatch(setTopicsListOpen(!isTopicsListOpen))
  }

  // 选择主题
  const selectTopic = (topicId: string) => {
    dispatch(setCurrentTopic(topicId))
    // 选择主题后不自动关闭侧边栏，使用户可以继续浏览
  }

  // 设置排序方式
  const setSortType = (sortType: SortType) => {
    dispatch(setTopicSortType(sortType))
  }

  // 编辑主题
  const startEditTopic = (topic: Topic) => {
    setEditingTopic({ ...topic })
    setIsEditMode(true)
  }

  // 创建新主题
  const startCreateTopic = () => {
    const newTopic = createNewTopic('新主题')
    setEditingTopic(newTopic)
    setIsEditMode(true)
  }

  // 保存主题
  const saveTopic = (topic: Topic) => {
    const isNew = !topics.some(t => t.id === topic.id)

    if (isNew) {
      dispatch(addTopic(topic))
      dispatch(setCurrentTopic(topic.id))
    } else {
      dispatch(updateTopic(topic))
    }

    setIsEditMode(false)
    setEditingTopic(null)
  }

  // 删除主题
  const removeTopic = (topicId: string) => {
    dispatch(deleteTopic(topicId))

    // 如果删除的是当前主题，选择第一个
    if (topicId === currentTopicId && topics.length > 1) {
      const remainingTopics = topics.filter(t => t.id !== topicId)

      if (remainingTopics.length > 0) {
        dispatch(setCurrentTopic(remainingTopics[0].id))
      }
    }
  }

  // 导出主题为Markdown
  const exportTopicAsMarkdown = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId)
    if (!topic) return

    // 导出功能，这里简单返回内容，实际应用中可能需要调用原生API
    console.log(`导出主题：${topic.name}，内容：${topic.content}`)
    return {
      fileName: `${topic.name}.md`,
      content: `# ${topic.name}\n\n${topic.content}`
    }
  }

  // 导出主题为图片
  const exportTopicAsImage = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId)
    if (!topic) return

    // 导出功能，这里简单返回内容，实际应用中可能需要调用原生API
    console.log(`导出主题图片：${topic.name}`)
  }

  return {
    currentTopic,
    filteredTopics,
    topicSortType,
    isTopicsListOpen,
    searchQuery,
    isEditMode,
    editingTopic,
    setSearchQuery,
    openTopicsList,
    closeTopicsList,
    toggleTopicsList,
    selectTopic,
    setSortType,
    startEditTopic,
    startCreateTopic,
    saveTopic,
    removeTopic,
    exportTopicAsMarkdown,
    exportTopicAsImage,
    topics // 添加返回topics
  }
}
