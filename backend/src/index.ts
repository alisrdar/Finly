import { METHODS } from "http";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/dbCon.js";
import authRoutes from "./routes/auth.js";
import IncomeRoutes from "./routes/income.js";
import expenseRoutes from "./routes/expense.js";
import dashboardRoutes from "./routes/dashboardRotes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CIENT_URL || '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type", "Authorization"]
    })
);

// middleware
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', IncomeRoutes);
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Finly app listening on port ${port}`)
})