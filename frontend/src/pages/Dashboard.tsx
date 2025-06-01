import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import CreateGroup from "../components/CreateGroup";
import { useNavigate } from "react-router-dom";

interface Member{
user:string,
uniqueId:string,
email:string
}
interface Group{
_id:string
  name:string,
  createdBy:{
    _id:string,
    name:string,
    email:string
  },
  members:Member[]
}
const Dashboard = () => {
  const[groups,setGroups]=useState<Group[]>([])
  const[allgroups,setAllGroups]=useState<Group[]>([])
const[search,setSearch]=useState<string>('')
    const[name,setName]=useState<string>('')  
const navigate=useNavigate()

  const fetchUserDetails=useCallback(async()=>{
    try {
      const response=await api.get('/group/groups')
      setGroups(response.data.groups)
      setAllGroups(response.data.groups)
    } catch (error) {
      console.log(error)
    }
  },[])

  useEffect(()=>{
  fetchUserDetails()
},[fetchUserDetails])

useEffect(()=>{
if(search.trim()===''){
  setGroups(allgroups)
}
},[search,allgroups])

const handleSearch = () => {
    if (!search.trim()) {
      setGroups(allgroups);
      return;
    }

    const filtered = allgroups.filter((grp) =>
      grp.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setGroups(filtered);
  };

 const handleSubmit=useCallback(async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
try {
    const response=await api.post('/group',{name})
    if(response.status===200){
        setName('')
        await fetchUserDetails()
    }
} catch (error) {
    console.log(error)
}
    },[name,fetchUserDetails])

return (
  <div className="min-h-screen p-10">
      <div className="w-full h-full bg-zinc-900 rounded-2xl">
        <CreateGroup name={name} setName={setName} handleSubmit={handleSubmit} />

        <div className="ml-10 mr-10 mt-5 border-2 border-zinc-700"></div>
        <div className="mt-5 p-10">
          <div className="flex items-center gap-10">
            <h1 className="text-5xl bg-gradient-to-tr from-amber-200 to-amber-600 bg-clip-text text-transparent">
              Groups
            </h1>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:outline-none bg-slate-400 text-white px-3 py-2 rounded-2xl"
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-5">
            {groups.map((group) => (
              <div
                onClick={() => navigate(`/group/${group._id}`)}
                key={group._id}
                className="bg-zinc-800 text-white p-5 rounded-lg shadow-md cursor-pointer"
              >
                <p className="font-semibold text-lg">{group.name}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Created by: {group.createdBy.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
