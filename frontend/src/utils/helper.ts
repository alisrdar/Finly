import type { Expense, Income, IncomeFormData } from "../types";
import type { RegisterOptions } from "react-hook-form";


export interface BarChartDataItem {
    name: string,
    amount: number,
    category?: string,
    date?: string,
    fullDate?: string,
}

export const transformExpensesForChart = (expenses: Expense[]): BarChartDataItem[] => {
    return expenses.map(expense => ({
        name: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: new Date(expense.date).toLocaleDateString(),
        fullDate: expense.date
    }));
};

export const transformIncomesForChart = (incomes: Income[]): BarChartDataItem[] => {
    return incomes.map(income => ({
        name: income.title,
        amount: income.amount,
        category: income.category,
        date: new Date(income.date).toLocaleDateString(),
        fullDate: income.date
    }));
};
export const transformIncomesForTable = (incomes: Income[]) => {
    return incomes.map(income => ({
        id: income._id,
        name: income.title,
        amount: income.amount,
        category: income.category,
        icon: income.icon,
        date: new Date(income.date).toLocaleDateString(),
        fullDate: income.date
    }));
};

export const formatCurrency = (amount: number, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(amount);
};

// Income Form Fields for addIncome form
export const IncomeFields: {
    label: string;
    name: keyof IncomeFormData;
    type: string;
    rules: RegisterOptions<IncomeFormData, keyof IncomeFormData>;
    placeholder: string;
    valueAsNumber?: boolean;
}[] = [
        {
            label: 'Title',
            name: 'title',
            type: 'text',
            rules: { required: 'Title is required' },
            placeholder: 'Income source title'
        },
        {
            label: 'Amount',
            name: 'amount',
            type: 'number',
            rules: {
                required: 'Amount is required',
                min: { value: 0.01, message: 'Amount must be greater than 0' }
            },
            placeholder: '0.00',
            valueAsNumber: true
        },
        {
            label: 'Category',
            name: 'category',
            type: 'text',
            rules: { required: 'Category is required' },
            placeholder: 'Income category'
        },
        {
            label: 'Date',
            name: 'date',
            type: 'date',
            rules: { required: 'Date is required' },
            placeholder: ''
        }
    ];