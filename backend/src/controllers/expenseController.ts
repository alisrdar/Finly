import { application, Request, Response } from "express";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import xlsx from "xlsx"
import { buffer } from "stream/consumers";
import { appendFile } from "fs";
import fs from "fs"
import path from "path";

export const addExpense = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(403).json("Unauthorized");
        }
        const userId = await req.user?.id;
        const { title, amount, category, date, icon, note, paymentMethod, location } = req.body;
        if (!amount || !category || !title) {
            return res.status(400).json({ message: "All fields are required!" })
        }
        const newExpense = new Expense({
            title,
            user: userId,
            amount,
            category,
            date: new Date(date),
            icon,
            note,
            paymentMethod,
            location,
        })
        await newExpense.save();
        res.status(201).json({ message: "Expense added successfully!", expense: newExpense });
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        })
    }
}
export const getAllExpense = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(403).json("Unauthorized");
        }
        const userId = await req.user?.id;
        const userExpenses = await Expense.find({ user: userId }).sort({ date: -1 })
        if ((userExpenses).length === 0) {
            return res.status(404).json("No expenses Found!");
        }
        res.status(200).json(userExpenses);

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        })
    }
}
export const deleteExpense = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(403).json("Unauthorized");
        }
        const userId = await req.user?.id;
        const expenseId = req.params.id;
        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json("Expense not Found");
        }
        // Confirming Ownership
        if (userId !== expense!.user.toString()) {
            return res.status(403).json({ message: "Unauthorized!" })
        }
        // Deleting Expense
        await Income.findByIdAndDelete(expenseId);
        res.status(200).json({
            message: "Expense deleted Successfully!"
        })
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        })
    }
}
export const downloadExpenseExcel = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(403).json("Unauthorized");
        }
        const userId = await req.user?.id;
        // getting all expenses
        const userExpenses = await Expense.find({ user: userId }).sort({ date: -1 })

        // getting data in array format from json
        const cleanedExpenses = (userExpenses).map(({
            title,
            user: userId,
            amount,
            category,
            date,
            icon,
            note,
            paymentMethod,
            location,
        }) => ({
            Title: title,
            Amount: amount,
            Category: category,
            Date: new Date(date).toLocaleDateString(),
            Note: note,
            "Payemnt Method": paymentMethod,
            Location: location
        }));

        const workSheet = xlsx.utils.json_to_sheet(cleanedExpenses);
        const workbook = xlsx.utils.book_new();

        xlsx.utils.book_append_sheet(workbook, workSheet, "Expenses");

        // Send it as download
        xlsx.writeFile(workbook, 'expenseDetails.xlsx');
        const filePath = path.join("downloads", `income-${userId}-${Date.now()}.xlsx`);

        res.download(filePath, "incomeDetails.xlsx", (err) => {
            if (err) {
                console.error("Download failed:", err);
            }

            // Delete the file after sending
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error("Failed to delete temp file:", unlinkErr);
                } else {
                    console.log("Temp file deleted:", filePath);
                }
            });
        });
        const excelBuffer = xlsx.write(workbook, {
            type: "buffer",
            bookType: "xlsx"
        })

        // res.setHeader("Content-Disposition", "attachment; filename:expense-details.xlsx ");
        // res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        // res.send(excelBuffer);

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        })
    }
}
