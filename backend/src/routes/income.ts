import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addIncome,
    getAllIncome, 
    deleteIncome, 
    downloadIncomeExcel
} from "../controllers/incomeController.js";

const IncomeRouter =  Router();

IncomeRouter.post("/income", protect, addIncome)

IncomeRouter.get("/income", protect, getAllIncome)

IncomeRouter.delete("/income/:id", protect, deleteIncome)

IncomeRouter.get("/income/download", protect, downloadIncomeExcel)

export default IncomeRouter