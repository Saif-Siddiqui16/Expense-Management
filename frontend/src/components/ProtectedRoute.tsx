import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/axios";

const ProtectedRoute = () => {
  const[isAuthenticated,setIsAuthenticated]=useState<boolean>(true)
  const[loading,setLoading]=useState<boolean>(true)
  
  useEffect(()=>{

    const verifyUser=async()=>{

        try {
            await api.get('/auth/me')
            setIsAuthenticated(true)
        } catch (error) {
            setIsAuthenticated(false)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    verifyUser()

  },[])
  
  if(loading){
    return <div>Loading....</div>
  }

  return isAuthenticated?<Outlet/>:<Navigate to={"/"} replace/>
}

export default ProtectedRoute;
