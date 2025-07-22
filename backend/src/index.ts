import { METHODS } from "http";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./config/dbCon.js";
import router from "./routes/auth.js";

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
app.use('/api/auth', router);

connectDB();

app.listen(port, () => {
  console.log(`Finly app listening on port ${port}`)
})