import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  login: (username, password) => apiClient.post('/auth/login', { username, password }),
  getCurrentAdmin: () => apiClient.get('/auth/me'),
};

// Projects
export const projectAPI = {
  getAll: () => apiClient.get('/projects'),
  getById: (id) => apiClient.get(`/projects/${id}`),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.put(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`),
};

// Education
export const educationAPI = {
  getAll: () => apiClient.get('/education'),
  getById: (id) => apiClient.get(`/education/${id}`),
  create: (data) => apiClient.post('/education', data),
  update: (id, data) => apiClient.put(`/education/${id}`, data),
  delete: (id) => apiClient.delete(`/education/${id}`),
};

// Experience
export const experienceAPI = {
  getAll: () => apiClient.get('/experience'),
  getById: (id) => apiClient.get(`/experience/${id}`),
  create: (data) => apiClient.post('/experience', data),
  update: (id, data) => apiClient.put(`/experience/${id}`, data),
  delete: (id) => apiClient.delete(`/experience/${id}`),
};

// Skills
export const skillAPI = {
  getAll: () => apiClient.get('/skills'),
  getById: (id) => apiClient.get(`/skills/${id}`),
  create: (data) => apiClient.post('/skills', data),
  update: (id, data) => apiClient.put(`/skills/${id}`, data),
  delete: (id) => apiClient.delete(`/skills/${id}`),
};

// Certificates
export const certificateAPI = {
  getAll: () => apiClient.get('/certificates'),
  getById: (id) => apiClient.get(`/certificates/${id}`),
  create: (data) => apiClient.post('/certificates', data),
  update: (id, data) => apiClient.put(`/certificates/${id}`, data),
  delete: (id) => apiClient.delete(`/certificates/${id}`),
};

// About
export const aboutAPI = {
  get: () => apiClient.get('/about'),
  save: (data) => apiClient.post('/about', data),
};

// Sync
export const syncAPI = {
  syncPortfolio: () => apiClient.post('/sync/portfolio'),
};

export default apiClient;
