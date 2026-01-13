import axios from 'axios';

// Use environment variable or default to production backend
const API_BASE = import.meta.env.VITE_API_URL || 'https://backend-new-5yyw.onrender.com';

console.log('🌐 API Configuration:');
console.log('   Base URL:', API_BASE);

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Enable credentials for CORS
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response.status}`);
      console.error('   Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('❌ No response received from server');
      console.error('   This might be a CORS or network issue');
    } else {
      // Something else happened
      console.error('❌ Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export { api, API_BASE };
