/** 
 * Запрос с повторными попытками
 */
export async function requestWithRetry<RequestResult>(
  request: () => Promise<RequestResult>,
  options?: {
    count?: number
    retryIf?: (err: unknown) => boolean
    delayMs?: number
  }
): Promise<RequestResult | null> {
  const {
    count = 3,
    retryIf = isNetworkErrorRetryable,
    delayMs = 200
  } = options ?? {}

  let attempt = 0

  while (attempt < count) {
    try {
      return await request()
    } catch (err) {
      attempt++

      if (attempt >= count || !retryIf(err)) {
        throw err
      }

      if (delayMs) {
        await new Promise(resolve => setTimeout(resolve, delayMs))
      }
    }
  }

  return null
}

/** 
 * Проверка, является ли ошибка сетевой ошибкой
 */
export function isNetworkErrorRetryable(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false
  }

  const axiosError = error as {
    code?: string
    message?: string
    response?: { status?: number }
  }

  const retryableCodes = [
    'ECONNRESET',
    'ETIMEDOUT',
    'EAI_AGAIN',
    'ENOTFOUND',
    'ECONNREFUSED'
  ]

  const retryableStatuses = [ 502, 503, 504 ]

  if (axiosError.code && retryableCodes.includes(axiosError.code)) {
    return true
  }

  if (axiosError.response?.status && retryableStatuses.includes(axiosError.response.status)) {
    return true
  }

  return axiosError.message?.toLowerCase().includes('socket hang up') ?? false
}
