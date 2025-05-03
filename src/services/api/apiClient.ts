import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3123/api',
  timeout: 10000,
});
