import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function useSignup() {
  const [loading,setLoading]=useState(false);
  const {setAuthUser}=useAuthContext();
  const signup=async({fullName,userName,password,confirmPassword,gender})=>{
    const success = handleInputErrors({fullName,userName,password,confirmPassword,gender});
    console.log(success);
    if(!success) return;
    setLoading(true);
    try {
      const res=await fetch("/api/auth/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({fullName,userName,password,confirmPassword,gender})
      });
      const data=await res.json();
      if(data.error){
        throw new Error(data.error);
      }

      localStorage.setItem("user",JSON.stringify(data));

      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }
  return {loading,signup};
}

export default useSignup


function handleInputErrors({fullName,userName,password,confirmPassword,gender}) {
  if(!fullName || !userName || !password || !confirmPassword || !gender){
    toast.error('Please fill all the fields')
    return false;
  }
  if(password!==confirmPassword){
    toast.error('Passwords do not match')
    return false;
  }
  if(password.length<6){
    toast.error('Password length should be greater than 6 characters')
    return false;
  }
  return true;
}
