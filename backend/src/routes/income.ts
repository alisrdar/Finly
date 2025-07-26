import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addIncome,
    getAllIncome, 
    deleteIncome, 
    downloadIncomeExcel
} from "../controllers/incomeController.js";

const IncomeRoutes =  Router();

IncomeRoutes.post("/", protect, addIncome)

IncomeRoutes.get("/", protect, getAllIncome)

IncomeRoutes.delete("/:id", protect, deleteIncome)

IncomeRoutes.get("/download", protect, downloadIncomeExcel)

export default IncomeRoutes