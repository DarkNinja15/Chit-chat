import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

function useLogin() {
  const [loading,setLoading]=useState(false);
  const {setAuthUser}=useAuthContext();

  

  const login = async (userName,password)=>{
    const success = handleInputErrors(userName,password);
    console.log(success);
    if(!success) return;
    setLoading(true);
    try {
        const res = await fetch("/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userName,password})
        });
        const data=await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.setItem("user",JSON.stringify(data));
        setAuthUser(data);
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    } finally{
        setLoading(false);
    }
  };


  return {loading,login};
}

export default useLogin

function handleInputErrors(userName,password) {
    if(!userName || !password){
      toast.error('Please fill all the fields')
      return false;
    }
    return true;
  }
