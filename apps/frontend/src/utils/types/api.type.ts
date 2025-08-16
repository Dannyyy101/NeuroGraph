type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface RequestOptions {
    method: HttpMethod
    body?: unknown
    headers?: Record<string, string>
}

export interface ApiResponse<T> {
    result: T | null
    error: string
}

export interface Void {
    result: 'No content'
    error: string
}

export interface ApiError {
    status: number
    message: string
    timestamp: Date
}
