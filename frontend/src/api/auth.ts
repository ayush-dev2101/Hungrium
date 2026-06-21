import { apiClient } from './axios';

export interface User {
  _id: string;
  email: string;
  fullName: string;
}

export const authApi = {
  login: async (data: any) => {
    const response = await apiClient.post('/auth/user/login', data);
    return response.data;
  },
  register: async (data: any) => {
    const response = await apiClient.post('/auth/user/register', data);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.get('/auth/user/logout');
    return response.data;
  }
};
