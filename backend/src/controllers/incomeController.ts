import { Request, Response } from "express";
import Income, { InfIncome } from "../models/Income.js";
import xlsx from 'xlsx'

export const addIncome = async (req: Request, res: Response) => {
    const id = await req.user?.id;
    try {
        const { title, amount, category, date, icon } = req.body;

        if (!amount || !category || !title) {
            return res.status(400).json({ message: "All fields are required!" })
        }

        const newIncome = await Income.create({
            title,
            user: id,
            amount,
            category,
            date: new Date(date),
            icon
        })
        await newIncome.save(); // redundant

        res.status(201).json({
            message: "Income added successfully",
            newIncome
        })
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        })
    }

}
export const getAllIncome = async (req: Request, res: Response) => {

    try {
        const id = await req.user?.id;
        const userIncome = await Income.find({ user: id }).sort({ date: -1 })
        if (userIncome.length === 0) {
            return res.status(404).json({ message: "Income not found" })
        }
        res.status(200).json(userIncome);

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        })
    }
}
export const deleteIncome = async (req: Request, res: Response) => {
    try {
        const incomeId = req.params.id;
        const income = await Income.findById(incomeId);

        if (!income) {
            return res.status(400).json({ message: "no Income found" })
        }

        // confirming ownership of income
        if (req.user!.id !== income!.user.toString()) {
            return res.status(403).json({ message: "Unauthorized!" })
        }
        // deleting income
        await Income.findByIdAndDelete(incomeId)
        res.status(200).json({
            message: "Income deleted successfully!"
        })
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        })
    }
}
export const downloadIncomeExcel = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const income = await Income.find({ user: userId }).sort({ date: -1 }).lean()

        // const data = income!.map((item) => ({
        //     Source: item.category,
        //     Amount: item.amount,
        //     Date: item.date
        // }));
        // const wb =xlsx.utils.book_new();
        // const ws = xlsx.utils.json_to_sheet(data);

        // xlsx.utils.book_append_sheet(wb, ws, "Income");
        // xlsx.writeFile(wb, 'incomeDetails.xlsx');
        // res.download('incomeDetails.xlsx')

        const cleanedData = income.map(({ title, amount, category, date, icon }) => ({
            Title: title,
            Amount: amount,
            Category: category,
            Date: new Date(date).toLocaleDateString(),
        }));

        const worksheet = xlsx.utils.json_to_sheet(cleanedData);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Income");
        const excelBuffer = xlsx.write(workbook, {
            type: "buffer",
            bookType: "xlsx",
        });

        res.setHeader("Content-Disposition", "attachment; filename=income-details.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(excelBuffer);

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            err
        })
    }
}
