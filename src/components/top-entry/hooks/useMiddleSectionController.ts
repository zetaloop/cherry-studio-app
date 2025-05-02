import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/store'
import {
  addAssistant,
  Assistant,
  deleteAssistant,
  setAssistantsListOpen,
  setAssistantSortType,
  setCurrentAssistant,
  SortType,
  updateAssistant
} from '@/store/top-entry'

import { createNewAssistant, searchAssistants, sortAssistants } from '../config'

export const useMiddleSectionController = () => {
  const dispatch = useAppDispatch()
  const { assistants, currentAssistantId, assistantSortType, isAssistantsListOpen } = useAppSelector(
    state => state.topEntry
  )

  // 本地状态
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(null)

  // 当前助手
  const currentAssistant =
    assistants.find(a => a.id === currentAssistantId) || (assistants.length > 0 ? assistants[0] : null)

  // 筛选和排序后的助手列表
  const filteredAssistants =
    searchQuery.trim() !== ''
      ? searchAssistants(assistants, searchQuery)
      : sortAssistants(assistants, assistantSortType)

  // 打开助手列表
  const openAssistantsList = () => {
    // 打开前清空搜索
    setSearchQuery('')
    dispatch(setAssistantsListOpen(true))
  }

  // 关闭助手列表
  const closeAssistantsList = () => {
    // 关闭时清空搜索
    setSearchQuery('')
    dispatch(setAssistantsListOpen(false))
  }

  // 切换助手列表状态
  const toggleAssistantsList = () => {
    if (!isAssistantsListOpen) {
      // 打开前清空搜索
      setSearchQuery('')
    }

    dispatch(setAssistantsListOpen(!isAssistantsListOpen))
  }

  // 选择助手
  const selectAssistant = (assistantId: string) => {
    dispatch(setCurrentAssistant(assistantId))
    closeAssistantsList()
  }

  // 设置排序方式
  const setSortType = (sortType: SortType) => {
    dispatch(setAssistantSortType(sortType))
  }

  // 编辑助手
  const startEditAssistant = (assistant: Assistant) => {
    setEditingAssistant({ ...assistant })
    setIsEditMode(true)
  }

  // 创建新助手
  const startCreateAssistant = () => {
    const newAssistant = createNewAssistant('新助手', '描述信息', 'gpt-3.5-turbo')
    setEditingAssistant(newAssistant)
    setIsEditMode(true)
  }

  // 保存助手
  const saveAssistant = (assistant: Assistant) => {
    const isNew = !assistants.some(a => a.id === assistant.id)

    if (isNew) {
      dispatch(addAssistant(assistant))
      dispatch(setCurrentAssistant(assistant.id))
    } else {
      dispatch(updateAssistant(assistant))
    }

    setIsEditMode(false)
    setEditingAssistant(null)
  }

  // 删除助手
  const removeAssistant = (assistantId: string) => {
    dispatch(deleteAssistant(assistantId))

    // 如果删除的是当前助手，选择第一个
    if (assistantId === currentAssistantId && assistants.length > 1) {
      const remainingAssistants = assistants.filter(a => a.id !== assistantId)

      if (remainingAssistants.length > 0) {
        dispatch(setCurrentAssistant(remainingAssistants[0].id))
      }
    }
  }

  return {
    currentAssistant,
    filteredAssistants,
    assistantSortType,
    isAssistantsListOpen,
    searchQuery,
    isEditMode,
    editingAssistant,
    setSearchQuery,
    openAssistantsList,
    closeAssistantsList,
    toggleAssistantsList,
    selectAssistant,
    setSortType,
    startEditAssistant,
    startCreateAssistant,
    saveAssistant,
    removeAssistant
  }
}
