import { Assistant, SortType, Topic } from '../../../store/top-entry'

// 创建一个简单的ID生成函数，不依赖crypto
const generateId = () => {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 10)
  return `${timestamp}-${randomStr}`
}

// 默认助手数据
export const DEFAULT_ASSISTANTS: Assistant[] = [
  {
    id: 'default-assistant',
    name: 'Default Assistant',
    description: 'General purpose assistant for all your queries.',
    avatar: 'https://picsum.photos/200/200?1',
    model: 'gpt-3.5-turbo',
    lastUsed: Date.now(),
    createdAt: Date.now()
  },
  {
    id: 'creative-assistant',
    name: 'Creative Assistant',
    description: 'Specialized in creative writing and brainstorming ideas.',
    avatar: 'https://picsum.photos/200/200?2',
    model: 'gpt-4',
    lastUsed: Date.now() - 86400000, // 1 day ago
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'technical-assistant',
    name: 'Technical Assistant',
    description: 'Helps with programming, debugging, and technical documentation.',
    avatar: 'https://picsum.photos/200/200?3',
    model: 'gpt-4',
    lastUsed: Date.now() - 86400000 * 2, // 2 days ago
    createdAt: Date.now() - 86400000 * 3
  }
]

// 默认主题数据
export const DEFAULT_TOPICS: Topic[] = [
  {
    id: 'general-topic',
    name: 'General',
    content: 'General conversation topic.',
    lastUsed: Date.now(),
    createdAt: Date.now()
  },
  {
    id: 'programming-topic',
    name: 'Programming',
    content: 'Discussions about programming and software development.',
    lastUsed: Date.now() - 86400000, // 1 day ago
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'creative-writing-topic',
    name: 'Creative Writing',
    content: 'Ideas and discussions about creative writing.',
    lastUsed: Date.now() - 86400000 * 3, // 3 days ago
    createdAt: Date.now() - 86400000 * 4
  }
]

// 排序函数
export const sortAssistants = (assistants: Assistant[], sortType: SortType): Assistant[] => {
  const sortedAssistants = [...assistants]

  switch (sortType) {
    case SortType.ALPHABETICAL:
      return sortedAssistants.sort((a, b) => a.name.localeCompare(b.name))
    case SortType.RECENT_USE:
      return sortedAssistants.sort((a, b) => (b.lastUsed || 0) - (a.lastUsed || 0))
    case SortType.RECENT_ADD:
      return sortedAssistants.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    default:
      return sortedAssistants
  }
}

// 排序主题
export const sortTopics = (topics: Topic[], sortType: SortType): Topic[] => {
  const sortedTopics = [...topics]

  switch (sortType) {
    case SortType.ALPHABETICAL:
      return sortedTopics.sort((a, b) => a.name.localeCompare(b.name))
    case SortType.RECENT_USE:
      return sortedTopics.sort((a, b) => (b.lastUsed || 0) - (a.lastUsed || 0))
    case SortType.RECENT_ADD:
      return sortedTopics.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    default:
      return sortedTopics
  }
}

// 创建新助手
export const createNewAssistant = (
  name: string,
  description: string,
  model: string,
  avatar: string = 'https://picsum.photos/200/200'
): Assistant => {
  return {
    id: generateId(),
    name,
    description,
    avatar,
    model,
    lastUsed: Date.now(),
    createdAt: Date.now()
  }
}

// 创建新主题
export const createNewTopic = (name: string, content: string = ''): Topic => {
  return {
    id: generateId(),
    name,
    content,
    lastUsed: Date.now(),
    createdAt: Date.now()
  }
}

// 搜索助手
export const searchAssistants = (assistants: Assistant[], query: string): Assistant[] => {
  if (!query.trim()) return assistants

  const lowerQuery = query.toLowerCase()
  return assistants.filter(
    assistant =>
      assistant.name.toLowerCase().includes(lowerQuery) ||
      assistant.description.toLowerCase().includes(lowerQuery) ||
      assistant.model.toLowerCase().includes(lowerQuery)
  )
}

// 搜索主题
export const searchTopics = (topics: Topic[], query: string): Topic[] => {
  if (!query.trim()) return topics

  const lowerQuery = query.toLowerCase()
  return topics.filter(
    topic => topic.name.toLowerCase().includes(lowerQuery) || topic.content.toLowerCase().includes(lowerQuery)
  )
}

// 获取当前助手
export const getCurrentAssistant = (assistants: Assistant[], currentId: string | null): Assistant | null => {
  if (!currentId || !assistants.length) return null
  return assistants.find(a => a.id === currentId) || assistants[0]
}

// 获取当前主题
export const getCurrentTopic = (topics: Topic[], currentId: string | null): Topic | null => {
  if (!currentId || !topics.length) return null
  return topics.find(t => t.id === currentId) || topics[0]
}
