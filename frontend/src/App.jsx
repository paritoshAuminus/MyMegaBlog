import React, { useEffect, useState } from 'react'
import './Index.css'
import authService from './auth/auth'
import services from './auth/config'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, Login, Signup, Notes, MyAccount } from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { login as storeLogin, logout as storeLogout } from './store/authSlice'
import NoteDetails from './components/NoteDetails'

function App() {
  const status = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()

  const statusChecker = async () => {
    const { response, result } = await authService.getUser()
    if (response.ok) {
      dispatch(storeLogin(result))
    } else {
      storeLogout()
    }
  }

  useEffect(() => {
    statusChecker()
  }, [dispatch, status])

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/notes' element={<Notes />}/>
          <Route path='/myaccount' element={<MyAccount />}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/noteDetails/:id' element={<NoteDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App