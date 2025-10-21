import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../auth/auth'
import { Link } from 'react-router-dom'
import { Notes } from '../pages'
import { AddNote } from '../components'
import services from '../auth/config'

function Home() {

  const status = useSelector((state) => state.auth.status)

  // NOTE CREATION SNIPPET
  // useEffect(() => {
  //   services.createNote({
  //     title: 'New Title from user some2',
  //     content: 'This is some testing content from user some2'
  //   })
  // }, [])

  if (!status) return (
    <div className='w-full flex flex-col justify-center items-center my-24'>
      <div className='text-blue-500 font-semibold text-2xl'>Please signup to continue</div>
    </div>
  )


  return (
    <div className='w-full flex flex-col justify-center items-center my-24'>
      <p className='text-gray-700 font-semibold text-2xl'>Welcome to your personal notes app</p>
    </div>
  )
}

export default Home