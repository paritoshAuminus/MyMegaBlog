import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../components'
import authService from '../auth/auth'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'
import { Link, useNavigate } from 'react-router-dom'

function Signup(props) {

    const dispatch = useDispatch()
    const status = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    // react hook from
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting }
    } = useForm()

    // auth submission
    const submit = async (data) => {
        const response = await authService.signup({
            name: data.userName,
            email: data.email,
            password: data.password
        })

        dispatch(login(response.user))
        reset()
        navigate('/')
    }

    // if (status) return (
    //     <div className='w-full flex flex-col justify-center items-center my-12'>
    //         <div className='text-blue-500 font-semibold text-2xl'>You are already Logged in!</div>
    //         <Link to={'/'} className='text-blue-500 hover:text-emerald-200 cursor-pointer'>Go back</Link>
    //     </div>
    // )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit(submit)} className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Sign up to out platform</h1>
                    <p className="text-sm text-gray-500 mt-2">Enter your credentials to create your account.</p>
                </div>

                <div className="space-y-4">
                    <Input
                        label={'Name'}
                        type='text'
                        {...register('userName', { required: true })}
                    />

                    <div>
                        <Input
                            label={'Email'}
                            type='email'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Please enter a valid email'
                                }
                            })}
                        />
                        {errors.email && <p className='text-sm font-semibold text-red-500 mt-1'>{errors.email.message}</p>}
                    </div>

                    <Input
                        label={'Password'}
                        type='password'
                        {...register('password', { required: 'Password is required' })}
                    />

                    <Button
                        type='submit'
                        bgColor='bg-blue-600'
                        textColor='text-white'
                        className='mt-2 w-full'
                        {...props}
                    >
                        {isSubmitting ? 'Signing in...' : 'Login'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Signup