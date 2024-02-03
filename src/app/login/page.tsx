"use client"

import React, { useState } from 'react'
import { useLoginMutation } from './authApiSlice';
// import 'dotenv/config'
// ICONS
// import { EyeIcon } from '@heroicons/react/outline';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
// EyeDropperIcon

const page = () => {    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openEyes, setOpenEyes] = useState(false);

    const [login, { isLoading }] = useLoginMutation()
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const userData = await login({ username, password }).unwrap()
        const user = jwt.decode(userData.accessToken)        
        // VERIFY METHOD IS NOT WORKING DUE TO SOME ERRORS SO WE HAVE USED DECODE FOR NOW

        
        

        // setUsername('')
        // setPassword('')

        router.push('/welcome')
    }

    return (
        <div className='p-10 min-h-screen'>
            <h1 className='font-semibold text-xl'>Login Here</h1>

            <form action="" onSubmit={handleSubmit} className='flex flex-col gap-3 w-80 items-start mt-8'>
                <input type="text" placeholder="Enter Your Email" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered w-full max-w-xs placeholder:text-sm" />
                
                <div className='relative w-full'>
                    <input type="text" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs placeholder:text-sm" />
                    {openEyes ? <EyeIcon className='cursor-pointer absolute w-6 h-6 top-3 right-4 text-gray-500' onClick={() => setOpenEyes(!openEyes)} /> : <EyeSlashIcon className='cursor-pointer absolute w-6 h-6 top-3 right-4 text-gray-500' onClick={() => setOpenEyes(!openEyes)} />}
                </div>
                
                <button type='submit' className="btn btn-active w-full">Submit</button>
            </form>
        </div>
    )
}

export default page