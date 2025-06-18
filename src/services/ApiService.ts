import EventSource from 'react-native-sse'

import { Assistant, Model, Provider } from '@/types/assistant'
import { Message } from '@/types/message'

const BASE_PROVIDER_URL = 'http://localhost:8081/api/provider'

export async function fetchChatCompletion({ messages, assistant }: { messages: Message[]; assistant: Assistant }) {
  console.log('fetchChatCompletion called with:', { messages, assistant })

  try {
    const url = `${BASE_PROVIDER_URL}/completion`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hi' }],
        assistant: assistant
      })
    }

    const es = new EventSource(url, options)
    let fullMessage = ''

    es.addEventListener('open', () => {
      console.log('SSE connection opened!')
    })

    es.addEventListener('message', event => {
      if (!event.data) return

      if (event.data === '[DONE]') {
        console.log('Stream finished. Final message:', fullMessage)
        es.close()
        return
      }

      const parsedData = JSON.parse(event.data)
      const textChunk = parsedData.text
      fullMessage += textChunk
      console.log('Frontend Received chunk:', textChunk)
    })

    es.addEventListener('error', error => {
      console.error('SSE Error:', error)
      es.close()
    })
  } catch (error) {
    console.error('Error in fetchChatCompletion:', error)
    throw error
  }
}

export async function checkApi(provider: Provider, model: Model) {
  try {
    const url = `${BASE_PROVIDER_URL}/check`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        provider,
        model
      })
    }

    const response = await fetch(url, options)
    const data = await response.json()

    // 检查响应状态和数据
    if (!response.ok || !data.success) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Error in checkApi:', error)
    throw error
  }
}
