import { Expense } from "../models/expenseModel.js"


export const addExpense=async(req,res)=>{
    try {
        const {amount,description,sharedWith} =req.body
        const groupId=req.params.groupId
        const userId=req.user.id

        const newExpense=await Expense.create({
            group:groupId,
            amount,
            description,
            paidBy:userId,
            sharedWith
        })

    return res.status(200).json({
        message:"Expense created",
        newExpense
    })        
    } catch (error) {
         return res.status(500).json(error)
    }
}

export const getGroupExpenses=async(req,res)=>{
    try {
        const groupId=req.params.groupId
        const expenses = await Expense.find({ group:groupId })

        return res.status(200).json(expenses)
    } catch (error) {
         return res.status(500).json(error)
    }
}