import React from 'react'
import { useNavigate } from 'react-router-dom'

const Pagenotfound = () => {
    const navigate = useNavigate();
    const gotohome = () =>{
        navigate("/")
    }
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col gap-4'>
        <button onClick={gotohome} className='border px-4 py-2'>Home</button>
        <p className='text-sm font-bold'>Page Not Found</p>
    </div>
  )
}

export default Pagenotfound