// composables/useApi.ts
/**
 * 统一 API 请求 Composable
 * SSR 环境下自动使用服务端请求，客户端使用浏览器请求
 */

export function useApi() {
  const config = useRuntimeConfig()

  async function get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    const { data, error } = await useFetch<T>(url, {
      baseURL: config.public.apiBase,
      params,
      // SSR 缓存1分钟
      getCachedData(key, nuxtApp) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    })
    if (error.value) throw error.value
    return data.value as T
  }

  async function post<T = any>(url: string, body?: Record<string, any>): Promise<T> {
    const { data, error } = await useFetch<T>(url, {
      baseURL: config.public.apiBase,
      method: 'POST',
      body,
    })
    if (error.value) throw error.value
    return data.value as T
  }

  return { get, post }
}
