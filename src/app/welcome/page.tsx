"use client"
import React from 'react'
import { useGetDataQuery } from './dataApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../login/authslice'

const page = () => {
  const { data, isError, isFetching, isLoading } = useGetDataQuery('/dashboard')
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  // console.log({user, token});
  

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h2 className='text-3xl font-semibold'>Welcome</h2>
    </div>
  )
}

export default page