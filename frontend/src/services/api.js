import axios from 'axios';

// API Base URL Configuration
// Priority: Environment variable > Local development > Production
const getApiBaseUrl = () => {
  // 1. Check for environment variable (set in .env.local or .env)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. Check if running in development mode (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  
  // 3. Check if running on local network
  if (window.location.hostname.startsWith('10.')) {
    return `http://${window.location.hostname}:4000`;
  }
  
  // 4. Default to production backend
  return 'https://backend-new-5yyw.onrender.com';
};

const API_BASE = getApiBaseUrl();

console.log('🌐 API Configuration:');
console.log('   Base URL:', API_BASE);
console.log('   Environment:', import.meta.env.MODE);
console.log('   Hostname:', window.location.hostname);

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Enable credentials for CORS
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout for email operations
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
