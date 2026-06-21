import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if your backend port is different
  withCredentials: true, // For sending cookies (JWT)
});

// Response interceptor to handle 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token/auth state and redirect to login if needed
      // This logic will integrate with Zustand
    }
    return Promise.reject(error);
  }
);
