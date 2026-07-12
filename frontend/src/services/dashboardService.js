import api from './axios.js';

export const dashboardService = {
  getSummary: () => api.get('/dashboard').then((res) => res.data),
};