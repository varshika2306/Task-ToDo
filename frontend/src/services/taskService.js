import api from './axios.js';

export const taskService = {
  getTasks: (params = {}) => api.get('/tasks', { params }).then((res) => res.data),
  getTask: (id) => api.get(`/tasks/${id}`).then((res) => res.data),
  createTask: (payload) => api.post('/tasks', payload).then((res) => res.data),
  updateTask: (id, payload) => api.put(`/tasks/${id}`, payload).then((res) => res.data),
  deleteTask: (id) => api.delete(`/tasks/${id}`).then((res) => res.data),
};