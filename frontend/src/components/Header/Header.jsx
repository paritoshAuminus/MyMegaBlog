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
        { to: '/mynotes', label: 'My Notes' },
        { to: '/myaccount', label: 'My Account' }
    ]

    const navLinkClasses = ({ isActive }) =>
        `px-3 py-2 rounded-md text-white transition
        ${isActive ? 'bg-blue-700 font-semibold' : 'hover:bg-blue-600'}`

    return (
        <header className="bg-blue-500 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                
                {/* Logo */}
                <Link
                    to="/"
                    className="text-white text-xl font-bold tracking-wide"
                >
                    Logo
                </Link>

                {/* Navigation */}
                <nav className="flex items-center space-x-2">
                    <NavLink to="/notes" className={navLinkClasses}>
                        Notes
                    </NavLink>

                    {status &&
                        links.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={navLinkClasses}
                            >
                                {label}
                            </NavLink>
                        ))}
                </nav>

                {/* Auth Button */}
                <div>
                    {status ? (
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/signup"
                            className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            Signup
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
