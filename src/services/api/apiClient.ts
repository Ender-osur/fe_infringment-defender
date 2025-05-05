import axios from 'axios';

const api = axios.create({
<<<<<<< Updated upstream
  baseURL: 'http://localhost:3123/api',
=======
  baseURL: "https://beinfringmentdefenderai-production.up.railway.app/api",
>>>>>>> Stashed changes
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
