export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const API_ENDPOINTS = {
  // Authentication
  AUTH : {
    REGISTER: `/auth/register`,
    LOGIN: `/auth/login`,
    GET_USER: `/auth/getUser`,
    UPLOAD_IMAGE: `/auth/upload-image`,
  },
  
  // Dashboard
  DASHBOARD: {
    GET_DATA: `/dashboard`,
  },

  // Income
  INCOME: {
    ADD_INCOME: `/income/`,
    GET_DATA: `/income/`,
    DELETE_INCOME: (id: string) => `/income/${id}`,
    DOWNLOAD: `/income/download`,
  },

  // Expenses
  EXPENSE: {
    ADD_EXPENSE: `/expense/`,
    GET_DATA: `/expense/`,
    DELETE_EXPENSE: (id: string) => `/expense/${id}`,
    DOWNLOAD: `/expense/download`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `/auth/upload-image`,
  }
};

export default API_ENDPOINTS;
