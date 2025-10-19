import React, { useEffect, useState } from 'react'
import './Index.css'
import authService from './auth/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, Signup } from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { login as storeLogin, logout as storeLogout } from './store/authSlice'

function App() {
  const status = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    async () => {
      const response = await authService.getUser()
      if (response.email) {
        dispatch(storeLogin(response.user))
        console.log(response.user)
      } else {
        storeLogout()
      }
    }
  }, [dispatch, status])
  console.log('Login status :: ', status)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App