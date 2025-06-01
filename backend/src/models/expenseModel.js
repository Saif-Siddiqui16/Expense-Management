import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
 group:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Group"
 },
 amount:{
    type:Number,
    required:true,
 },
 description:{
        type:String,
    required:true,
 },
 paidBy:{
     type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
 },
 sharedWith:[
    {
        type:String
    }
 ],
},
{timestamps:true}
);

export const Expense = mongoose.model("Expense", expenseSchema);
