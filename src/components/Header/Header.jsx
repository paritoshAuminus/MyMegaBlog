import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import authService from '../../auth/auth'
import { logout as storeLogout } from '../../store/authSlice'

function Header() {

    const status = useSelector((state) => state.auth.status)
    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.logout()
        storeLogout(dispatch(storeLogout()))
    }

    const links = [
        { to: '/myBlogs', label: 'My Blogs' },
        { to: '/myAccount', label: 'My Account' }
    ];

    return (
        <header className="body-font bg-sky-500 text-md md:text-lg">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                <Link to={'/'} className='text-white'>Logo</Link>
                <nav>
                    {status && links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `mr-5 ${isActive
                                    ? 'text-emerald-200 hover:text-emerald-300'
                                    : 'text-white hover:text-blue-200'
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Show login / signup based of the user logged in or not */}
                {/* {login ? <Link to={'/login'} className='px-4 py-2 rounded-lg bg-white text-blue-500'>Login</Link>
                    : <Link onClick={() => authService.logout()} className='px-4 py-2 rounded-lg bg-white text-blue-500'>Logout</Link>} */}
                <div>
                    {status ?
                        <button onClick={handleLogout} className='bg-gray-100 hover:bg-white text-blue-500 hover:text-blue-600 text-lg rounded-md px-3 py-2 cursor-pointer'>
                            Logout
                        </button> :
                        <Link to={'/signup'} className='bg-gray-100 hover:bg-white text-blue-500 hover:text-blue-600 text-lg rounded-md px-3 py-2 cursor-pointer'>
                            Signup
                        </Link>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header