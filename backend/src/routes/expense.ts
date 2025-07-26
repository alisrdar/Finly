import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addExpense,
    getAllExpense, 
    deleteExpense, 
    downloadExpenseExcel
} from "../controllers/expenseController.js";

const expenseRoutes =  Router();

expenseRoutes.post("/", protect, addExpense)

expenseRoutes.get("/", protect, getAllExpense)

expenseRoutes.delete("/:id", protect, deleteExpense)

expenseRoutes.get("/download", protect, downloadExpenseExcel)

export default expenseRoutes