import axios from 'axios';
import { BASE_URL } from './apiPaths';

// Create axios instance
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',

    }
});

// Request Interceptor ---> Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        // Handling common errors globaly
        if (err.response) {
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (err.response?.status === 500) {
                console.error('Server error:', err);
                // alert('An unexpected error occurred. Please try again later.');
            }
        } else if (err.code === 'ECONNABORTED') {
            console.error('Request timeout:', err);
            // alert('Request timed out. Please try again later.');
        }
    }
)

export default api;
