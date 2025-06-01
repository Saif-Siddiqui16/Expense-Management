import express from "express"
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createGroup, deleteGroup, getUserGroups, inviteMember,getGroupDetails,editGroup } from "../controllers/groupController.js";

const router=express.Router()

router.post("/", verifyToken, createGroup);
router.get("/groups", verifyToken, getUserGroups);
router.post("/invite/:groupId", verifyToken, inviteMember);
router.delete("/:groupId", verifyToken, deleteGroup);
router.get("/:groupId", verifyToken, getGroupDetails);
router.put("/:groupId", verifyToken, editGroup);
export default router
