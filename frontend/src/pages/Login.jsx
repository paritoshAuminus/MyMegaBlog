import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login as storeLogin } from './../store/authSlice'
import authService from '../auth/auth'
import { Button, Input } from '../components'
import { useNavigate, Link } from 'react-router-dom'

function Login() {

    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm()

    const submit = async (data) => {
        const { response, result } = await authService.login({
            username: data.username,
            password: data.password
        })
        console.log(response)
        console.log(result)
        if (response.ok) {
            dispatch(storeLogin(result))
            navigate('/')
        } else if (response.response.status === 404 || !response.response.ok) {
            setError('User not found')
        } else {
            throw new Error(result.message || `Login failed ${response.status}`)
        }
    }

    // if (status) return (
    //     <div className='w-full flex flex-col justify-center items-center my-12'>
    //         <div className='text-blue-500 font-semibold text-2xl'>You are already Logged in!</div>
    //         <Link to={'/'} className='text-blue-500 hover:text-blue-300 cursor-pointer'>Go back</Link>
    //     </div>
    // )

    return (
        <div className='min-h-screen flex flex-col gap-3 items-center justify-center bg-gray-100 px-4'>
            <form onSubmit={handleSubmit(submit)} className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Login to your account</h1>
                    <p className="text-sm text-gray-500 mt-2">Enter your credentials to login.</p>
                </div>
                <div className='space-y-4'>
                    <Input
                        label={'Username'}
                        type={'text'}
                        placeholder={'Enter your username'}
                        {...register('username', {
                            required: true,
                        })}
                    />
                </div>
                <div className='py-5'>
                    <Input
                        label={'Password'}
                        type={'password'}
                        placeholder={'Please enter your password'}
                        {...register('password', {
                            required: true
                        })}
                    />
                </div>

                <Button
                    type='submit'
                    bgColor='bg-blue-600'
                    textColor='text-white'
                    className='mt-2 w-full'
                >
                    {isSubmitting ? 'Logging in' : 'Login'}
                </Button>
                {error && <p className='text-sm text-red-500 font-semibold py-1'>{error}</p>}
            </form>
        </div>
    )
}

export default Login