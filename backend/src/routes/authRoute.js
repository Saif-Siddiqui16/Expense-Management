import express from "express"
import { loginUser, logoutUser, refreshToken, registerUser, userInfo } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.get("/me",verifyToken,userInfo)

export default router
