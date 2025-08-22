'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, User, Mail, Lock, Building2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { authService } from '@/lib/services/authService'
import Copyright from './components/Copyright'

type AuthMode = 'login' | 'register'

interface AuthFormData {
  email: string
  password: string
  name?: string
}

export default function HomePage() {
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>()

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true)
    try {
      if (authMode === 'login') {
        const response = await authService.login(data.email, data.password)
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        toast.success('登录成功！')
        router.push('/dashboard')
      } else {
        const response = await authService.register(data.email, data.password, data.name!)
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        toast.success('注册成功！')
        router.push('/dashboard')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || '操作失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login')
    reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 w-12 h-12 text-primary-600">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
              <path d="M10 6h4"></path>
              <path d="M10 10h4"></path>
              <path d="M10 14h4"></path>
              <path d="M10 18h4"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TaskMaster</h1>
          <p className="text-gray-600">任务大师 - 让项目管理更简单</p>
        </div>

        {/* Auth Form */}
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('name', { required: '请输入姓名' })}
                    type="text"
                    className="input-field pl-10"
                    placeholder="请输入您的姓名"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('email', {
                    required: '请输入邮箱',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '请输入有效的邮箱地址',
                    },
                  })}
                  type="email"
                  className="input-field pl-10"
                  placeholder="请输入您的邮箱"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('password', {
                    required: '请输入密码',
                    minLength: {
                      value: 6,
                      message: '密码至少6位',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pl-10 pr-10"
                  placeholder="请输入您的密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {authMode === 'login' ? '登录中...' : '注册中...'}
                </div>
              ) : (
                authMode === 'login' ? '登录' : '注册'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={toggleAuthMode}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {authMode === 'login' ? '没有账户？立即注册' : '已有账户？立即登录'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <Copyright showAppName={true} />
      </div>
    </div>
  )
}
