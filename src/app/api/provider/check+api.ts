import { checkApi } from '@/app/services/ApiService'

/**
 * Handles the POST request for API checking.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - A JSON response object.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const { provider, model } = await request.json()

    // 检查 API
    await checkApi(provider, model)

    // 成功时返回成功响应
    return Response.json(
      {
        success: true,
        message: 'API check successful.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API Check Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // 失败时返回错误响应
    return Response.json(
      {
        success: false,
        error: errorMessage
      },
      { status: 400 }
    )
  }
}
