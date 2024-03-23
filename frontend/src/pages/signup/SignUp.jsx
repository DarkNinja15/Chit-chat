import React from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto p-6'>
        <div className="
    h-full w-full bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100">
      <h1 className='text-3xl font-semibold text-center text-gray-300 p-6'>
        Sign Up 
      <span className='text-500'> to Chit Chat</span>
      </h1>
      <form className='p-2'>
        <div >
            <label className='label'>
                <span className='text-base label-text'>Name</span>
            </label>
            <input type="text" placeholder='Enter name' className='w-full input input-bordered h-10'/>
        </div>
        <div >
            <label className='label'>
                <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'/>
        </div>
        <div>
            <label className='label'>
                <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10'/>
        </div>
        <div>
            <label className='label'>
                <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type="password" placeholder='confirm password' className='w-full input input-bordered h-10'/>
        </div>
        <GenderCheckBox/>
        <Link to="/login" className='hover:text-blue-50 mt-2 inline-block text-sm hover:underline'>Already have and account</Link>
        <div>
        <button className="btn btn-primary bg-gray-200 mt-2 hover:bg-white">Create Account</button>
        </div>
      </form>
    </div>
    </div> 
  )
}

export default SignUp
