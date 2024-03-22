import React from 'react';
import { CiSearch } from "react-icons/ci";

function SearchInput() {
  return (
    <form className='flex items-center gap-2'>
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full'/>
        <button type='submit' className='btn btn-circle bg-gray-400 text-white hover:bg-gray-400'>
        <CiSearch className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput
