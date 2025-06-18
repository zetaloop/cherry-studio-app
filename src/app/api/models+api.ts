import { fetchModels } from '../services/ApiService'

export async function POST(request: Request): Promise<Response> {
  try {
    const { provider } = await request.json()
    const models = await fetchModels(provider)
    console.log('Backend Models fetched:', models)
    return Response.json(
      {
        models
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API Check Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return Response.json(
      {
        error: errorMessage
      },
      { status: 400 }
    )
  }
}
