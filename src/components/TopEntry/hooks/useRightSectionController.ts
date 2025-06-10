import { useAppDispatch } from '@/store'
import { addTopic, setCurrentTopic } from '@/store/top-entry'

import { createNewTopic } from '../Config'

export const useRightSectionController = () => {
  const dispatch = useAppDispatch()

  // 创建新主题
  const createNewTopicHandler = () => {
    const newTopic = createNewTopic('新主题')
    dispatch(addTopic(newTopic))
    dispatch(setCurrentTopic(newTopic.id))
  }

  return {
    createNewTopicHandler
  }
}
