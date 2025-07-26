import { Request, Response } from "express";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import User from "../models/User.js";
import { isValidObjectId, Types } from "mongoose";
import { match } from "assert";

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(403).json("Unauthorized");
        }
        const userObjectId = new Types.ObjectId(String(userId));
        const TotalIncome = await Income.aggregate([
            { $match: { user: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const TotalExpenses = await Expense.aggregate([
            { $match: { user: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        // calculating amount from output arrays
        const totalIncomeAmount = TotalIncome[0]?.total || 0;
        const totalExpenseAmount = TotalExpenses[0]?.total || 0;

        // income in last 30 days
        const incomeInLast30Days = await Income.aggregate([
            {
                $match: {
                    user: userObjectId,
                    date: { $gte: new Date(Date.now() - 30 * 1000 * 60 * 60 * 24) }
                },
            },
            {
                $facet: {
                    total: [{
                        $group: {
                            _id: null,
                            total: { $sum: '$amount' }
                        }
                    }],
                    transaction: [
                        { $sort: { date: -1 } },
                        { $limit: 5 }
                    ]

                }
            }
        ]);
        // income in last 60 days
        const incomeInLast60Days = await Income.aggregate([
            {
                $match: {
                    user: userObjectId,
                    date: { $gte: new Date(Date.now() - 60 * 1000 * 60 * 60 * 24) }
                }
            },
            {
                $facet: {
                    total: [{
                        $group: {
                            _id: null,
                            total: { $sum: '$amount' }
                        }
                    }],
                    transaction: [
                        { $sort: { date: -1 } },
                        { $limit: 5 }
                    ]
                }
            }
        ]);
        // Expenses in last 30 Days
        const expensesLast30Days = await Expense.aggregate([
            {
                $match: {
                    user: userObjectId,
                    date: { $gte: new Date(Date.now() - 30 * 1000 * 60 * 60 * 24) }
                }
            },
            {
                $facet: {
                    total: [{
                        $group: {
                            _id: null,
                            total: { $sum: '$amount' }
                        }
                    }],
                    transaction: [
                        { $sort: { date: -1 } },
                        { $limit: 5 }
                    ]
                }
            }
        ])
        const expensesLast60Days = await Expense.aggregate([
            {
                $match: {
                    user: userObjectId,
                    date: { $gte: new Date(Date.now() - 60 * 1000 * 60 * 60 * 24) }
                }
            },
            {
                $facet: {
                    total: [{
                        $group: {
                            _id: null,
                            total: { $sum: '$amount' }
                        }
                    }],
                    transaction: [
                        { $sort: { date: -1 } },
                        { $limit: 5 }
                    ]
                }
            }
        ]);

        // Top 5 Transactions
        const last5IncomeTransactions = await Income.aggregate([
            { $match: { user: userObjectId } },
            { $sort: { date: -1 } },
            { $limit: 5 },
            { $addFields: { type: 'Income' } }
        ]);
        const last5ExpenseTransactions = await Expense.aggregate([
            { $match: { user: userObjectId } },
            { $sort: { date: -1 } },
            { $limit: 5 },
            { $addFields: { type: 'Expense' } }
        ]);

        // Sort, merge and limit to top 5 transactions
        const last5Transactions = [...last5IncomeTransactions, ...last5ExpenseTransactions]
            .sort((a, b) => (b.date) - (a.date))
            .slice(0, 5);

        // ExpensesByCategories
        const ExpensesByCategories = await Expense.aggregate([
            { $match: { user: userObjectId } },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { totalAmount: -1 }
            }

        ]);

        // Response
        res.status(200).json({
            totalBalance: totalIncomeAmount - totalExpenseAmount,
            totalIncome: totalIncomeAmount,
            TotalExpenses: totalExpenseAmount,
            last30DaysExpenses: {
                totalAmount: expensesLast30Days[0]?.total[0]?.total || 0,
                transactions: expensesLast30Days[0]?.transaction || []
            },
            last60DaysExpenses: {
                totalAmount: expensesLast60Days[0]?.total[0]?.total || 0,
                transactions: expensesLast60Days[0]?.transaction || []
            },
            last30DaysIncome: {
                totalAmount: incomeInLast30Days[0]?.total[0]?.total || 0,
                transactions: incomeInLast30Days[0]?.transaction || []
            },
            last60DaysIncome: {
                totalAmount: incomeInLast60Days[0]?.total[0]?.total || 0,
                transactions: incomeInLast60Days[0]?.transaction || []
            },
            recentIncomeTransactions: last5IncomeTransactions,
            recentExpenseTransactions: last5ExpenseTransactions,
            recentTransactions: last5Transactions,
            compareIncome_expenses: {
                last30DaysIncome: incomeInLast30Days[0]?.total[0]?.total || 0,
                last30DaysExpenses: expensesLast30Days[0]?.total[0]?.total,
                last60DaysIncome: incomeInLast60Days[0]?.total[0]?.total,
                last60DaysExpenses: expensesLast60Days[0]?.total[0]?.total || 0
            },
            top5ExpenseCategories: ExpensesByCategories.slice(0, 5),
            expenseByCategory: ExpensesByCategories
        })
    } catch (err) {
        console.error("Dashboard error:", err);
        res.status(500).json({ message: "Server error", err });
    }
}
