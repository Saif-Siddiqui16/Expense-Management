import React from "react";

interface CreateGroupProps{
name:string;
setName:(val:string)=>void;
handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreateGroup = React.memo(({name,setName,handleSubmit}:CreateGroupProps) => {


   
    console.log("create grp calld")
  return (
    <div className="p-5 flex items-center justify-center">
<form className="flex gap-5" onSubmit={handleSubmit}>
    <input placeholder="group name" className="border-2 px-3 py-2 rounded-2xl focus:outline-none" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
          <button type="submit">Create Group</button>
</form>
    </div>
  );
})

export default CreateGroup;
