import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../auth/auth'
import { login } from '../store/authSlice'

function Home() {

    // const [access, setAccess] = useState(false)

    // useEffect(() => {
    //     const response = authService.getUser()
    //     if (response.ok) {
    //         setAccess(true)
    //     } else {
    //         setAccess(false)
    //     }
    // }, [])

  return (
    // <div>{access ? 'Home :: I am currently logged in' : 'Home :: I am currently logged out'}</div>
    <div>Home :: I am currently Null</div>
  )
}

export default Home