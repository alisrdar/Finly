import type { Expense, ExpenseFormData, Income, IncomeFormData } from "../types";
import type { RegisterOptions } from "react-hook-form";


export interface BarChartDataItem {
    name: string,
    amount: number,
    category?: string,
    date?: string,
    fullDate?: Date,
}


export const getFilterRange = (
    filter: 'last7Days' | 'last30Days' | 'last60Days' | 'last90Days' | 'last6Months' | 'last1Year' | 'last5Years' | 'all'
): { start: Date; end: Date } => {
    const end = new Date();
    const start = new Date();

    switch (filter) {
        case 'last7Days':
            start.setDate(end.getDate() - 7);
            break;
        case 'last30Days':
            start.setDate(end.getDate() - 30);
            break;
        case 'last60Days':
            start.setDate(end.getDate() - 60);
            break;
        case 'last90Days':
            start.setDate(end.getDate() - 90);
            break;
        case 'last6Months':
            start.setMonth(end.getMonth() - 6);
            break;
        case 'last1Year':
            start.setFullYear(end.getFullYear() - 1);
            break;
        case 'last5Years':
            start.setFullYear(end.getFullYear() - 5);
            break;
        case 'all':
            start.setFullYear(1970); // catch-all for "all time"
            break;
    }

    return { start, end };
};
export const transformIncomesForChart = (
    incomes: Income[],
    filterRange?: { start: Date; end: Date },
    filter?: string
): BarChartDataItem[] => {
    // 1. Filter incomes
    const filtered = incomes.filter(income => {
        const date = new Date(income.date);
        return !filterRange || (date >= filterRange.start && date <= filterRange.end);
    });

    // 2. Group by chart label
    const grouped: Record<string, BarChartDataItem> = {};

    filtered.forEach(income => {
        const date = new Date(income.date);

        let label = "";
        if (["last7Days", "last30Days", "last60Days", "last90Days", "all"].includes(filter ?? "")) {
            label = date.toLocaleDateString("default", { day: "2-digit", month: "short" });
        } else if (["last6Months", "last1Year"].includes(filter ?? "")) {
            label = date.toLocaleDateString("default", { month: "short", year: "numeric" });
        } else {
            label = date.getFullYear().toString();
        }

        if (!grouped[label]) {
            grouped[label] = {
                name: label,
                amount: 0,
                category: income.category,
                date: income.date,
                fullDate: new Date(income.date)           // ✅ keep raw date for sorting
            };
        }

        grouped[label].amount += income.amount;
    });

    // 3. Return sorted array (using real date, not missing field)
    return Object.values(grouped).sort(
        (a, b) => {
            const aDate = a.fullDate ?? new Date(0);
            const bDate = b.fullDate ?? new Date(0);
            return aDate.getTime() - bDate.getTime();
        }
    );
};


export const transformExpensesForChart = (
    expenses: Expense[],
    filterRange?: { start: Date; end: Date },
    filter?: string
): BarChartDataItem[] => {
    const grouped = new Map<string, BarChartDataItem>();

    expenses.forEach(expense => {
        const date = new Date(expense.date);

        // Apply filter range
        if (filterRange && (date < filterRange.start || date > filterRange.end)) return;

        // Grouping key (label on x-axis)
        let name = "";
        if (["last7Days", "last30Days", "last60Days", "last90Days", "all"].includes(filter ?? "")) {
            name = date.toLocaleDateString("default", { day: "2-digit", month: "short" });
        } else if (["last6Months", "last1Year"].includes(filter ?? "")) {
            name = date.toLocaleDateString("default", { month: "short", year: "numeric" });
        } else {
            name = date.getFullYear().toString();
        }

        // Aggregate amounts per bucket
        if (grouped.has(name)) {
            grouped.get(name)!.amount += expense.amount;
        } else {
            grouped.set(name, {
                name,
                amount: expense.amount,
                category: expense.category,
                date: expense.date,
                fullDate: date,
            });
        }
    });


    // Return sorted array
    return Array.from(grouped.values()).sort(
        (a, b) => (a.fullDate as Date).getTime() - (b.fullDate as Date).getTime()
    );
};


export const transformExpensesForBarChart = (
    expenses: Expense[]
): BarChartDataItem[] => {
    // Don't mutate the original array - create a copy first
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return sortedExpenses.map(expense => {
        const date = new Date(expense.date);
        return {
            name: date.toLocaleDateString("default", { day: "2-digit", month: "short" }),
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            fullDate: date
        };
    });
}
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

export const transformExpensesForTable = (expenses: Expense[]) => {
    return expenses.map(expense => ({
        id: expense._id,
        name: expense.title,
        amount: expense.amount,
        category: expense.category,
        icon: expense.icon,
        date: new Date(expense.date).toLocaleDateString(),
        fullDate: expense.date
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

// Expense Form Fields for addExpense form
export const ExpenseFields: {
    label: string;
    name: keyof ExpenseFormData;
    type: string;
    rules: RegisterOptions<ExpenseFormData, keyof ExpenseFormData>;
    placeholder: string;
    valueAsNumber?: boolean;
}[] = [
        {
            label: 'Title',
            name: 'title',
            type: 'text',
            rules: { required: 'Title is required' },
            placeholder: 'Expense title'
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
            placeholder: 'Expense category'
        },
        {
            label: 'Date',
            name: 'date',
            type: 'date',
            rules: { required: 'Date is required' },
            placeholder: ''
        }
    ];