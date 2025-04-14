import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1/';

const commonConfig = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiWithoutAuth = axios.create(commonConfig);

const apiWithAuth = axios.create(commonConfig);

apiWithAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { apiWithAuth, apiWithoutAuth };
