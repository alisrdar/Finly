import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addIncome,
    getAllIncome, 
    delteIncome, 
    downloadIncomeExcel
} from "../controllers/incomeController.js";

const router = Router();

router.post("/income", protect, addIncome)

router.get("/income", protect, getAllIncome)

router.delete("/income/:id", protect, delteIncome)

router.get("/income/download", protect, downloadIncomeExcel)

export default router