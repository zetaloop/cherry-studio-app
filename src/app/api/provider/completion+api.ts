import { fetchChatCompletion } from '@/app/services/ApiService'
import { createStreamProcessor } from '@/services/StreamProcessingService'

export async function POST(request: Request): Promise<Response> {
  try {
    const { messages, assistant } = await request.json()

    const stream = new ReadableStream({
      async start(controller) {
        const callbacks = {
          onTextChunk: (text: string) => {
            const formattedChunk = `data: ${JSON.stringify({ text })}\n\n`
            console.log('Sending chunk:', formattedChunk)
            controller.enqueue(formattedChunk)
          },
          onComplete: () => {
            controller.enqueue(`data: [DONE]\n\n`)
            controller.close()
          },
          onError: (error: any) => {
            console.error('Stream processing error:', error)
            controller.error(error)
          }
        }

        const streamProcessorCallbacks = createStreamProcessor(callbacks)

        try {
          await fetchChatCompletion({
            messages,
            assistant,
            onChunkReceived: streamProcessorCallbacks
          })
        } catch (error) {
          callbacks.onError(error)
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Content-Encoding': 'none', // 明确告诉代理不要压缩，压缩会强制缓冲
        'X-Accel-Buffering': 'no' // 一个专门给 Nginx 等代理看的指令，禁止缓冲
      }
    })
  } catch (error) {
    console.error('API Route Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
