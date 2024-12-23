export class APIClient {
    constructor(private baseUrl: string, private headers: Record<string, string>) {
    }

    async request(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        endpoint: string,
        body?: unknown,
        params?: Record<string, string>,
    ) {
        const url = this.constructUrl(endpoint, params)
        const options: RequestInit = {
            method,
            headers: {
                ...this.headers,
                ...(body ? { 'Content-Type': 'application/json' } : {}),
            },
            ...(body ? { body: JSON.stringify(body) } : {}),
        }

        const response = await fetch(url, options)
        return this.handleResponse(response)
    }

    async get(endpoint: string, params?: Record<string, string>) {
        return this.request('GET', endpoint, undefined, params)
    }

    async post(endpoint: string, body: unknown) {
        return this.request('POST', endpoint, body)
    }

    async put(endpoint: string, body: unknown) {
        return this.request('PUT', endpoint, body)
    }

    async delete(endpoint: string) {
        return this.request('DELETE', endpoint)
    }

    private constructUrl(endpoint: string, params?: Record<string, string>): string {
        const url = new URL(endpoint, this.baseUrl)
        if (params) Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
        return url.toString()
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorDetails = await response.json().catch(() => ({}))
            throw new Error(`HTTP Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorDetails)}`)
        }
        return response.json()
    }
}