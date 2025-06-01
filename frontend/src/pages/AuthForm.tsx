import { useActionState, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";



interface AuthForm{
  name?:string,
  email:string,
  password:string
}

const AuthForm = () => {
const [isLogin,setIsLogin]=useState<boolean>(true)
const[message,setMessage]=useState<string>('')
const navigate=useNavigate()

const serverAction=async(prevstate:AuthForm,formData:FormData):Promise<void>=>{
  let name=null
  if(formData.get('name')!==null){
    name=formData.get('name')
  }
  const email=formData.get('email')
  const password=formData.get('password')
const url=isLogin?'/auth/login':'/auth/register'
const payload=isLogin?{email,password}:{name,email,password}  

try {
  const response=await api.post(url,payload)
if(isLogin && response.status===200){
  navigate("/dashboard")
}else if(!isLogin && response.status===200){
  setIsLogin(!isLogin)

}
} catch (error:any) {
  if (error.response) {
    setTimeout(()=>{
setMessage(error.response.data.message || 'An error occurred');
    },2000)
  } else {
    setMessage('Network or unexpected error');
  }

}

} 


const initialState:AuthForm={
name:"",
email:"",
password:""
}

const [state, formAction, isPending] = useActionState(serverAction, initialState);

const handleToggle=()=>{
  setIsLogin(!isLogin)
  
}


console.log(message)
  return (
<div className="flex items-center justify-center">
  <div className="w-[80%] lg:w-[50%] xl:w-[40%] flex flex-col items-center mt-20 border-2 border-white p-5 rounded-2xl">
    <div className="w-full">
      <h1 className="text-4xl bg-gradient-to-r from-red-300 via-red-500 to-red-600 bg-clip-text text-transparent font-extrabold flex items-center justify-center">{isLogin?'Login':'Register'}</h1>
    <form action={formAction}>
      <div className="flex flex-col gap-5 mt-10 w-full">
        {!isLogin && (
      <div className="flex justify-between items-center p-2">
                  <label className="w-[40%] text-[25px]">Name</label>
          <input className="flex-1 focus:outline-none px-2 py-2 border border-t-blue-700 border-l-blue-700 border-r-blue-400 border-b-blue-400" type="name" name="name" placeholder="type your name" />
      </div>
      )

      }
      <div className="flex justify-between items-center p-2">
                  <label className="w-[40%] text-[25px]">Email</label>
          <input className="flex-1 focus:outline-none px-2 py-2 border border-t-blue-700 border-l-blue-700 border-r-blue-400 border-b-blue-400" type="email" name="email" placeholder="type your email" />
      </div>
      <div className="flex justify-between items-center p-2">
                  <label className="w-[40%] text-[25px]">Password</label>
          <input className="flex-1 focus:outline-none px-2 py-2 border border-t-blue-700 border-l-blue-700 border-r-blue-400 border-b-blue-400" type="password" name="password" placeholder="type your password" />
      </div>
      </div>
<div className="flex justify-center items-center mt-2">
  <p className="text-red-500">{message}</p>
</div>
<div className="flex items-center justify-center mt-10">
  <button disabled={isPending}>{isLogin?'Login':'Register'}</button>
</div>
    </form>
    <div className="flex items-center justify-center mt-5">
      <p className="text-gray-600">{isLogin?'Not Registered:':'Already Registered'}</p>
    <span onClick={handleToggle} className="ml-2 cursor-pointer text-blue-500 text-[20px]">{isLogin?'Register':'Login'}</span>
    </div>
    </div>
  </div>

</div>
  );
}

export default AuthForm;
