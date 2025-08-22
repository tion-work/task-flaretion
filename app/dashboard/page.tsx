'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, LogOut, User, Building2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { projectService } from '@/lib/services/projectService'
import { authService } from '@/lib/services/authService'

interface Project {
  id: number
  name: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

interface ProjectFormData {
  name: string
  description: string
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/')
      return
    }

    setUser(JSON.parse(userData))
    loadProjects()
  }, [router])

  const loadProjects = async () => {
    try {
      const data = await projectService.getProjects()
      setProjects(data.projects)
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/')
        return
      }
      toast.error('加载项目失败')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const onSubmit = async (data: ProjectFormData) => {
    try {
      if (editingProject) {
        await projectService.updateProject(editingProject.id, data)
        toast.success('项目更新成功！')
      } else {
        await projectService.createProject(data)
        toast.success('项目创建成功！')
      }
      setShowCreateModal(false)
      setEditingProject(null)
      reset()
      loadProjects()
    } catch (error: any) {
      toast.error(error.response?.data?.error || '操作失败')
    }
  }

  const handleDelete = async (projectId: number) => {
    if (!confirm('确定要删除这个项目吗？')) return
    
    try {
      await projectService.deleteProject(projectId)
      toast.success('项目删除成功！')
      loadProjects()
    } catch (error: any) {
      toast.error('删除失败')
    }
  }

  const openEditModal = (project: Project) => {
    setEditingProject(project)
    reset({
      name: project.name,
      description: project.description,
    })
    setShowCreateModal(true)
  }

  const closeModal = () => {
    setShowCreateModal(false)
    setEditingProject(null)
    reset()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">任务大师</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <User className="w-4 h-4 mr-2" />
                {user?.name || user?.email}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                退出
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">仪表板</h1>
            <p className="text-gray-600 mt-2">管理您的项目和任务</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            创建项目
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
              <div className="text-sm text-gray-500 mb-4">
                创建于: {new Date(project.created_at).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(project)}
                  className="btn-secondary flex items-center text-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">还没有项目</h3>
            <p className="text-gray-600 mb-4">创建您的第一个项目开始使用</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              创建项目
            </button>
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingProject ? '编辑项目' : '创建项目'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目名称
                </label>
                <input
                  {...register('name', { required: '请输入项目名称' })}
                  type="text"
                  className="input-field"
                  placeholder="请输入项目名称"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目描述
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="input-field"
                  placeholder="请输入项目描述（可选）"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {editingProject ? '更新' : '创建'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary flex-1"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
