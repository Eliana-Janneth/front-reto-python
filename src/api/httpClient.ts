import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

httpClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('authToken');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQwODQ5ODgxLCJpYXQiOjE3NDA3NjM0ODEsImp0aSI6ImY1YjFiMGE1YzNkMzQ2MWViY2JiNThkOTk3MzE1MzUyIiwidXNlcl9pZCI6MX0.B7YGwd0TpHn4VbGT6pav4YuwAzhphIJy6rOQzKcIy3M"
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default httpClient;