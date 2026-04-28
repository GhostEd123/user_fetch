/**
 * DEPRECATED/COMMENTED OUT:
 * This file contains the axios-based API utilities previously used by TanStack Query.
 * After migrating to RTK Query (which uses fetchBaseQuery), these are no longer needed.
 */
/*
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchUserById = async (id: number | string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export default api;
*/
