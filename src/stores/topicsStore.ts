import { useAppDispatch, useAppSelector } from '../store'
import { setCurrentTopic as setCurrentTopicAction, deleteTopic, updateTopic, addTopic } from '../store/top-entry'

export const useTopicsStore = () => {
  const dispatch = useAppDispatch()
  const { topics, currentTopicId } = useAppSelector(state => state.topEntry)

  const setCurrentTopic = (topicId: string) => {
    dispatch(setCurrentTopicAction(topicId))
  }

  const removeTopic = (topicId: string) => {
    dispatch(deleteTopic(topicId))
  }

  const updateTopicContent = (topicId: string, content: string) => {
    const topic = topics.find(t => t.id === topicId)
    if (topic) {
      dispatch(updateTopic({ ...topic, content }))
    }
  }

  const createTopic = (topic: { name: string; content: string }) => {
    dispatch(addTopic({
      id: Date.now().toString(),
      name: topic.name,
      content: topic.content,
      createdAt: Date.now()
    }))
  }

  return {
    topics,
    currentTopicId,
    setCurrentTopic,
    removeTopic,
    updateTopicContent,
    createTopic
  }
}