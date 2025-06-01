import mongoose from "mongoose";

const memberSchema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
uniqueId:{
    type:String,
    required:true,
    unique:true
},
email:{
    type:String
}    
})

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  members:[memberSchema]

},
{timestamps:true}
);

export const Group = mongoose.model("Group", groupSchema);
