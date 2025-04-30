import axios from 'axios';


const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://mind-vault.onrender.com/api/v1/';


const commonConfig = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};

const apiWithoutAuth = axios.create(commonConfig);

const apiWithAuth = axios.create(commonConfig);

apiWithAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export { apiWithAuth, apiWithoutAuth };
