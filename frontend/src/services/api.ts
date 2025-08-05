import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/apiPaths';
import type { 
  AuthResponse, 
  LoginData, 
  RegisterData, 
  DashboardData,
  Income,
  Expense,
  IncomeFormData,
  ExpenseFormData
} from '../types';

// Auth services
export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  getUser: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.GET_USER);
    return response.data;
  },

  uploadImage: async (formData: FormData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Dashboard services
export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get(API_ENDPOINTS.DASHBOARD.GET_DATA);
    return response.data;
  },
};

// Income services
export const incomeService = {
  addIncome: async (data: IncomeFormData): Promise<Income> => {
    const response = await api.post(API_ENDPOINTS.INCOME.ADD_INCOME, data);
    return response.data;
  },

  getAllIncome: async (): Promise<Income[]> => {
    const response = await api.get(API_ENDPOINTS.INCOME.GET_DATA);
    return response.data;
  },

  deleteIncome: async (id: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.INCOME.DELETE_INCOME(id)}`);
  },

  downloadIncome: async (): Promise<Blob> => {
    const response = await api.get(API_ENDPOINTS.INCOME.DOWNLOAD, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// Expense services
export const expenseService = {
  addExpense: async (data: ExpenseFormData): Promise<Expense> => {
    const response = await api.post(API_ENDPOINTS.EXPENSE.ADD_EXPENSE, data);
    return response.data;
  },

  getAllExpense: async (): Promise<Expense[]> => {
    const response = await api.get(API_ENDPOINTS.EXPENSE.GET_DATA);
    return response.data;
  },

  deleteExpense: async (id: string): Promise<void> => {
    await api.delete(`${API_ENDPOINTS.EXPENSE.DELETE_EXPENSE(id)}`);
  },

  downloadExpense: async (): Promise<Blob> => {
    const response = await api.get(API_ENDPOINTS.EXPENSE.DOWNLOAD, {
      responseType: 'blob',
    });
    return response.data;
  },
};
