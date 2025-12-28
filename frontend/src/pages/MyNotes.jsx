import React, { useEffect } from 'react'
import services from '../auth/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function MyNotes() {

    const status = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    useEffect(() => {
        if (!status) {
            navigate('/login')
        }

        const fetchUserBlogs = async () => {
            const { response, result } = await services.getUserBlogs()
            console.log(response)
            console.log(result)
        }
        fetchUserBlogs()
    }, [])

    if (!status) {
        return (
            <h1 className='flex justify-center items-center text-blue-400 text-xl py-5'>You are not logged in</h1>
        )
    }

    return (
        <>
            <h1 className='text-2xl text-blue-300'>This is My notes page</h1>
        </>
    )
}

export default MyNotes