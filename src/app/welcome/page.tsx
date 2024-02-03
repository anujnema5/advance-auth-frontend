"use client"
import React from 'react'
import { useGetDataQuery } from './dataApiSlice'

const page = () => {
  const { data, isError, isFetching, isLoading } = useGetDataQuery('/dashboard')
  console.log(data);

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h2 className='text-3xl font-semibold'>Welcome</h2>
    </div>
  )
}

export default page