import { Group } from "../models/groupModel.js"
import { User } from "../models/userModel.js"
import {v4 as uuidv4} from "uuid"
import { sendMail } from "../utils/email.js"

export const createGroup=async(req,res)=>{
try {
const {name}=req.body
const createdBy=req.user.id

const findUser=await User.findById(createdBy).select("email")

const uniqueId=uuidv4()

await Group.create({
    name,
    createdBy,
    members:[
        {
            user:findUser._id,
            uniqueId,
            email:findUser.email

        }
    ]
})

return res.status(200).json({
    message:"Group created successfully"
})
    
} catch (error) {
    return res.status(500).json(error)
}
}

export const getUserGroups=async(req,res)=>{
 
try {
    const userId=req.user.id

    const groups=await Group.find({"members.user":userId}).populate("createdBy","name email")

    if(!groups){
        return res.status(400).json({
            message:"No groups created by user"
        })
    }

    return res.status(200).json({
        groups
    })
   
} catch (error) {
    return res.status(500).json(error)
}
}


export const inviteMember=async(req,res)=>{
    try {
        const {email}=req.body
        const groupId=req.params.groupId
        const createBy=req.user.id

        const group=await Group.findById(groupId)
        if (!group) return res.status(404).json({ message: "Group not found" });

        if(group.createdBy.toString()!== createBy){
             return res.status(403).json({ message: "Only group creator can invite" });
        }


        const existingEmail=group.members.find(m=>m.email===email)
        if(existingEmail){
             return res.status(400).json({ message: "User already invited" });
        }

        const user=await User.findOne({email})

        const generateUniqueId=uuidv4()

        group.members.push({
            user:user?user._id:null,
            email,
            uniqueId:generateUniqueId
        })
        await group.save()
let response
if(user){
     response= await sendMail(email,true)
        
}else{
     response=await sendMail(email,false)
}

console.log(response)
return res.status(200).json({
    message:response.message
})

    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteGroup=async(req,res)=>{
try {
    const groupId=req.params.groupId
    await Group.findByIdAndDelete(groupId)
    return res.status(200).json({
        message:"Group deleted successfully"
    })
} catch (error) {
    return res.status(500).json(error)
}

}
export const getGroupDetails=async(req,res)=>{
try {
    const groupId=req.params.groupId
   const groupDetail=await Group.findById(groupId).populate("createdBy","email name").populate("members.user","email name")
   .populate("members.email").populate("members.uniqueId")
    return res.status(200).json({
 groupDetail
    })
} catch (error) {
    return res.status(500).json(error)
}

}


export const editGroup=async(req,res)=>{
    try {
        
    } catch (error) {
         return res.status(500).json(error)
    }
}