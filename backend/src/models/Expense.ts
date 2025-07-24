import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IExpense extends Document {
    title: string;
    amount: number;
    category: string;
    date: Date;
    user: mongoose.Schema.Types.ObjectId;
    icon: string;
    note: string;
    paymentMethod: string;
    location: string;
}
const ExpenseSchema = new Schema<IExpense>({
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
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    icon: { type: String },
    note: { type: String },
    paymentMethod: { 
        type: String,
        enum: ['cash', 'credit card', 'debit card', 'upi','easypaise', 'other'] 
    },
    location: { type: String }
}, {
    timestamps: true
})

export default mongoose.model<IExpense>('Expense', ExpenseSchema);