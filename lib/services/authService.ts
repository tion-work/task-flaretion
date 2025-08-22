import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface LoginResponse {
  message: string
  token: string
  user: {
    id: number
    email: string
    name: string
  }
}

export interface RegisterResponse {
  message: string
  token: string
  user: {
    id: number
    email: string
    name: string
  }
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/api/v1/auth/login', {
      email,
      password,
    })
    return response.data
  },

  async register(email: string, password: string, name: string): Promise<RegisterResponse> {
    const response = await api.post('/api/v1/auth/register', {
      email,
      password,
      name,
    })
    return response.data
  },

  async logout() {
    // 清除本地存储的token和用户信息
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  getUser(): any | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}

// 添加请求拦截器，自动添加token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器，处理401错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout()
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export { api }
