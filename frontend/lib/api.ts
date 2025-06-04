import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const endpoints = {
  auth: {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
  },
  vision: {
    analyze: '/infer/vision/analyze',
  },
  audio: {
    transcribe: '/infer/audio/transcribe',
  },
  route: {
    optimize: '/infer/route/optimize',
    plan: '/infer/route/plan',
  },
  users: {
    profile: '/users/profile',
    update: '/users/update',
  },
};

export default api; 