import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addExpense,
    getAllExpense, 
    deleteExpense, 
    downloadExpenseExcel
} from "../controllers/expenseController.js";

const expenseRouter =  Router();

expenseRouter.post("/income", protect, addExpense)

expenseRouter.get("/income", protect, getAllExpense)

expenseRouter.delete("/income/:id", protect, deleteExpense)

expenseRouter.get("/income/download", protect, downloadExpenseExcel)

export default expenseRouter