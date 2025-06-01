import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "../models/userModel.js"

export const registerUser=async(req,res)=>{
try {
    const{name,email,password}=req.body
    if(!name || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message:"User already created"
        })
    }
    const hashPasword=await bcrypt.hash(password,10)
    await User.create({
        name,
        email,
        password:hashPasword
    })

    return res.status(200).json({
        message:"User created successfully"
    })
} catch (error) {
    console.log(error)
}
   

}

export const loginUser=async(req,res)=>{
try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are mandatory"
            })
        }
        const existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({
                message:"Email doesnot exist"
            })
        }
        const matchPassword=bcrypt.compare(password,existingUser.password)
        
         if (!matchPassword) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"15m"})
        const refreshToken=jwt.sign({id:existingUser._id},process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"})

        res
        .cookie("accessToken",accessToken,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken",refreshToken,{
                httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            message:"User logged in successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

export const logoutUser=async(req,res)=>{
res.clearCookie("accessToken").clearCookie("refreshToken").json({message:"Logout successfully"})
}

export const userInfo=async(req,res)=>{

    res.json(req.user.id)
}

export const refreshToken=async(req,res)=>{
      const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Access token refreshed" });
  } catch {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
}