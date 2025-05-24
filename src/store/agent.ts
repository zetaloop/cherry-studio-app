import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isEmpty, uniqBy } from 'lodash'

import { TopicManager } from '@/hooks/use-topic'
import { getDefaultAgent, getDefaultTopic } from '@/services/agent-service'
import { Agent, Model, Topic } from '@/types/agent'

export interface AgentsState {
  defaultAgent: Agent
  agents: Agent[]
}

const initialState: AgentsState = {
  defaultAgent: getDefaultAgent(),
  agents: [getDefaultAgent()]
}

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    updateDefaultAgent: (state, action: PayloadAction<{ agent: Agent }>) => {
      state.defaultAgent = action.payload.agent
    },
    updateAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload
    },
    addAgent: (state, action: PayloadAction<Agent>) => {
      state.agents.push(action.payload)
    },
    removeAgent: (state, action: PayloadAction<{ id: string }>) => {
      state.agents = state.agents.filter(c => c.id !== action.payload.id)
    },
    updateAgent: (state, action: PayloadAction<Agent>) => {
      state.agents = state.agents.map(c => (c.id === action.payload.id ? action.payload : c))
    },
    addTopic: (state, action: PayloadAction<{ agentId: string; topic: Topic }>) => {
      const topic = action.payload.topic
      topic.createdAt = topic.createdAt || new Date().toISOString()
      topic.updatedAt = topic.updatedAt || new Date().toISOString()
      state.agents = state.agents.map(agent =>
        agent.id === action.payload.agentId
          ? {
              ...agent,
              topics: uniqBy([topic, ...agent.topics], 'id')
            }
          : agent
      )
    },
    removeTopic: (state, action: PayloadAction<{ agentId: string; topic: Topic }>) => {
      state.agents = state.agents.map(agent =>
        agent.id === action.payload.agentId
          ? {
              ...agent,
              topics: agent.topics.filter(({ id }) => id !== action.payload.topic.id)
            }
          : agent
      )
    },
    updateTopic: (state, action: PayloadAction<{ agentId: string; topic: Topic }>) => {
      const newTopic = action.payload.topic
      newTopic.updatedAt = new Date().toISOString()
      state.agents = state.agents.map(agent =>
        agent.id === action.payload.agentId
          ? {
              ...agent,
              topics: agent.topics.map(topic => {
                const _topic = topic.id === newTopic.id ? newTopic : topic
                _topic.messages = []
                return _topic
              })
            }
          : agent
      )
    },
    updateTopics: (state, action: PayloadAction<{ agentId: string; topics: Topic[] }>) => {
      state.agents = state.agents.map(agent =>
        agent.id === action.payload.agentId
          ? {
              ...agent,
              topics: action.payload.topics.map(topic => (isEmpty(topic.messages) ? topic : { ...topic, messages: [] }))
            }
          : agent
      )
    },
    removeAllTopics: (state, action: PayloadAction<{ agentId: string }>) => {
      state.agents = state.agents.map(agent => {
        if (agent.id === action.payload.agentId) {
          agent.topics.forEach(topic => TopicManager.removeTopic(topic.id))
          return {
            ...agent,
            topics: [getDefaultTopic(agent.id)]
          }
        }

        return agent
      })
    },
    setModel: (state, action: PayloadAction<{ agentId: string; model: Model }>) => {
      state.agents = state.agents.map(agent =>
        agent.id === action.payload.agentId
          ? {
              ...agent,
              model: action.payload.model
            }
          : agent
      )
    }
  }
})

export const {
  updateDefaultAgent,
  updateAgents,
  addAgent,
  removeAgent,
  updateAgent,
  addTopic,
  removeTopic,
  updateTopic,
  updateTopics,
  removeAllTopics,
  setModel
} = agentsSlice.actions

export default agentsSlice.reducer
