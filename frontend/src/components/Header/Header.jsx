import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import authService from '../../auth/auth'
import { useDispatch, useSelector } from 'react-redux'
import { logout as storeLogout } from '../../store/authSlice'

function Header() {

    const dispatch = useDispatch()
    const status = useSelector(state => state.auth.status)

    const handleLogout = () => {
        authService.logout()
        dispatch(storeLogout())
    }

    const links = [
        { to: '/notes', label: 'My Notes' },
        { to: '/myaccount', label: 'My Account' }
    ];

    return (
        <header className="body-font bg-blue-500 text-md md:text-lg mb-4">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                <Link to={'/'} className='text-white'>Logo</Link>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
                    <Link to={'/notes'} className='text-white'>Notes</Link>
                    {status && links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `mr-5 nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-label">{label}</span>
                        </NavLink>
                    ))}
                </nav>

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