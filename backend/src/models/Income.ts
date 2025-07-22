import mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import User from "./User.js";
import { ref } from "process";

export interface InfIncome extends Document {
    title: string,
    amount: number
    category: string
    date: Date
    user: mongoose.Schema.Types.ObjectId
}

const IncomeSchema: Schema<InfIncome> = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model<InfIncome>("Income", IncomeSchema);