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
  totalBalance: number;
  totalIncome: number;
  TotalExpenses: number;

  last30DaysIncome: {
    totalAmount: number;
    transactions: Income[];
  };
  last60DaysIncome: {
    totalAmount: number;
    transactions: Income[];
  };
  last30DaysExpenses: {
    totalAmount: number;
    transactions: Expense[];
  };
  last60DaysExpenses: {
    totalAmount: number;
    transactions: Expense[];
  };

  recentIncomeTransactions: Income[];
  recentExpenseTransactions: Expense[];
  recentTransactions: Transaction[];

  compareIncome_expenses: {
    last30DaysIncome: number;
    last30DaysExpenses: number;
    last60DaysIncome: number;
    last60DaysExpenses: number;
  };

  top5ExpenseCategories: {
    _id: string;
    totalAmount: number;
    count: number;
  }[];

  expenseByCategory: {
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
