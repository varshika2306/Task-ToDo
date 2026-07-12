import api from './axios.js';

export const userService = {
  getMe: () => api.get('/users/me').then((res) => res.data),
  updateMe: (payload) => api.put('/users/me', payload).then((res) => res.data),
};