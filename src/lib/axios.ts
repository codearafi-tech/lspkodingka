import axios from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Variable untuk menangani race condition saat multiple request 401
let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else if (token) {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      // 1. Jika URL yang error adalah endpoint refresh itu sendiri -> Logout
      if (originalRequest.url?.includes("/auth/refresh")) {
        localStorage.clear()
        window.location.href = "/login"
        return Promise.reject(error)
      }

      // 2. Jika proses refresh sedang berjalan, masukkan request lain ke dalam antrean
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // 3. Gunakan axios polos (tanpa interceptor apiClient) untuk refresh
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        )

        const newToken =
          res.data.token || res.data.accessToken || res.data.data?.token

        if (newToken) {
          localStorage.setItem("token", newToken)
          apiClient.defaults.headers.common["Authorization"] =
            `Bearer ${newToken}`
          originalRequest.headers.Authorization = `Bearer ${newToken}`

          processQueue(null, newToken)
          return apiClient(originalRequest)
        } else {
          throw new Error("Token baru tidak ditemukan dalam response")
        }
      } catch (refreshError) {
        processQueue(refreshError, null)
        localStorage.clear()
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login"
        }
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
