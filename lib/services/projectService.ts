import { api } from './authService'

export interface Project {
  id: number
  name: string
  description: string
  user_id: number
  status: string
  created_at: string
  updated_at: string
}

export interface CreateProjectData {
  name: string
  description: string
}

export interface UpdateProjectData {
  name: string
  description: string
}

export interface ProjectsResponse {
  projects: Project[]
}

export interface ProjectResponse {
  project: Project
}

export const projectService = {
  async getProjects(): Promise<ProjectsResponse> {
    const response = await api.get('/api/v1/projects/')
    return response.data
  },

  async getProject(id: number): Promise<ProjectResponse> {
    const response = await api.get(`/api/v1/projects/${id}`)
    return response.data
  },

  async createProject(data: CreateProjectData): Promise<ProjectResponse> {
    const response = await api.post('/api/v1/projects/', data)
    return response.data
  },

  async updateProject(id: number, data: UpdateProjectData): Promise<ProjectResponse> {
    const response = await api.put(`/api/v1/projects/${id}`, data)
    return response.data
  },

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/api/v1/projects/${id}`)
  },
}
