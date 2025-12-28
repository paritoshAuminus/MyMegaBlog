import React, { useEffect, useState } from 'react'
import './Index.css'
import authService from './auth/auth'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Header } from './components'
import { Home, Login, Signup, Notes, MyAccount, MyNotes } from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { login as storeLogin, logout as storeLogout } from './store/authSlice'
import NoteDetails from './components/NoteDetails'

function App() {
  const userData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()
  const status = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const checkAuth = async () => {
    const { response, result } = await authService.getUser()
    console.log('Result ::', result)
    if (response.ok) {
      dispatch(storeLogin(result))
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/mynotes' element={<MyNotes />} />
        <Route path='/myaccount' element={<MyAccount />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/noteDetails/:id' element={<NoteDetails />} />
      </Routes>
    </>
  )
}

export default App