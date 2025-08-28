import axios from 'axios';

const API_BASE_URL = 'https://proctwrap.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/v1/teacher/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/v1/teacher/create', { name, email, password }),
};

export const testAPI = {
  create: (title: string, url: string, teacherId: string) =>
    api.post('/v1/test/test', { title, url, teacherId }),
  getBySlug: (slug: string) =>
    api.get(`/v1/test/test/${slug}`),
  getTeacherTests: (teacherId: string) =>
    api.get(`/v1/teacher/list/${teacherId}`),
  getTestAttempts: (testId: string) =>
    api.get(`/v1/teacher/listAttempts/${testId}`),
};

export const studentAPI = {
  create: (name: string, email: string, uid: string) =>
    api.post('/v1/student', { name, email, uid }),
  get: (uid: string) =>
    api.get(`/v1/student/${uid}`),
};

export const attemptAPI = {
  start: (studentId: string, testId: string) =>
    api.post('/v1/attempt/start', { studentId, testId }),
  finish: (attemptId: string) =>
    api.post('/v1/attempt/finish', { attemptId }),
  recordViolation: (attemptId: string, type: string, image?: string | null) =>
    api.patch(`/v1/violation/attempts/${attemptId}/violation`, { type, image }),
};

export const evidenceAPI = {
  getAttemptEvidences: (attemptId: string) =>
    api.get(`/v1/evidence/attempt/${attemptId}`),
};
