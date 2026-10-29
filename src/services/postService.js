import apiClient from './api'

export const getUsers = () => apiClient.get('/users')
export const getUser = (id) => apiClient.get(`/users/${id}`)
export const getUserPosts = (id) => apiClient.get('/posts', { params: { userId: id } })
export const createPost = (payload) => apiClient.post('/posts', payload)
