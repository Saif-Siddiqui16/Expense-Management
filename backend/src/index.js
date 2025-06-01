import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./db/connectDB.js"
import authRoute from "./routes/authRoute.js"
import groupRoute from "./routes/groupRoute.js"
import expenseRoute from "./routes/expenseRoute.js"

dotenv.config()
const app=express()
const PORT=process.env.PORT || 5000

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/group",groupRoute)
app.use("/api/expense",expenseRoute)


app.listen(PORT,async()=>{
await connectDB()
    console.log(`server is running on ${PORT}` )
})