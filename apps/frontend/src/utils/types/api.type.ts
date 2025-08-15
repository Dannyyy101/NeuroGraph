type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

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
