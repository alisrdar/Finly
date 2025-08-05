// User interfaces
export interface User {
  id: string;
  fullName: string;
  email: string;
  profileImageUrl?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

// Income interfaces
export interface Income {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  user: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncomeFormData {
  title: string;
  amount: number;
  category: string;
  date?: string;
  icon?: string;
}

// Expense interfaces
export const PaymentMethod = {
  Cash: "cash",
  CreditCard: "credit card",
  DebitCard: "debit card",
  UPI: "upi",
  Easypaise: "easypaise",
  Other: "other"
} as const;

export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  user: string;
  icon: string;
  note?: string;
  paymentMethod: PaymentMethodType;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  title: string;
  amount: number;
  category: string;
  date?: string;
  icon?: string;
  note?: string;
  paymentMethod: PaymentMethodType;
  location?: string;
}

// Dashboard interfaces
export interface DashboardData {
  totalIncomeAmount: number;
  totalExpenseAmount: number;
  incomeInLast30Days: {
    total: { total: number }[];
    transaction: Income[];
  }[];
  incomeInLast60Days: {
    total: { total: number }[];
    transaction: Income[];
  }[];
  expensesLast30Days: {
    total: { total: number }[];
    transaction: Expense[];
  }[];
  expensesLast60Days: {
    total: { total: number }[];
    transaction: Expense[];
  }[];
  last5Transactions: Array<Income | Expense>;
  ExpensesByCategories: {
    _id: string;
    totalAmount: number;
    count: number;
  }[];
}

// Transaction type for unified display
export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  icon: string;
  type: 'Income' | 'Expense';
}
