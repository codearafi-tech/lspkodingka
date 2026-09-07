import axios from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Untuk Cookie Refresh Token
  headers: {
    "Content-Type": "application/json",
  },
})

// 1. Tempelkan JWT dari localStorage ke Header Authorization
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

// 2. Handling Auto Refresh jika Token Expired (401)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes("/auth/refresh")) {
        localStorage.clear()
        window.location.href = "/login"
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        const res = await apiClient.post("/auth/refresh")
        const newToken = res.data.token || res.data.accessToken

        if (newToken) {
          localStorage.setItem("token", newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        localStorage.clear()
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login"
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
