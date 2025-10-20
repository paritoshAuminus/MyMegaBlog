import React, { useEffect, useState } from 'react'
import './Index.css'
import authService from './auth/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, Login, Signup } from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { login as storeLogin, logout as storeLogout } from './store/authSlice'

function App() {
  const status = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  const statusChecker = async () => {
    const response = await authService.getUser()
    if (response.ok) {
      const result = await response.json()
      dispatch(storeLogin(result.user))
    } else {
      storeLogout()
    }
  }

  useEffect(() => {
    statusChecker()
  }, [dispatch, status])
  console.log('Login status :: ', status)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App