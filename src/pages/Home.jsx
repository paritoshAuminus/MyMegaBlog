import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../auth/auth'
import { Link } from 'react-router-dom'
import { Notes } from '../pages'

function Home() {

  const status = useSelector((state) => state.auth.status)

  if (!status) return (
    <div className='w-full flex flex-col justify-center items-center my-24'>
      <div className='text-blue-500 font-semibold text-2xl'>Please signup to continue</div>
    </div>
  )

  return (
    <div>
    </div>
  )
}

export default Home