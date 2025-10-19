import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../Button';
import authService from '../../auth/auth';
import { useDispatch, useSelector } from 'react-redux';

function Header() {

    const [login, setLogin] = useState(false)
    const status = useSelector(auth.state.status)
    const dispatch = useDispatch()  

    useEffect(() => {
        setLogin(authService.getUser())
    }, [status])


    const links = [
        { to: '/first', label: 'First Link' },
        { to: '/second', label: 'Second Link' },
        { to: '/third', label: 'Third Link' },
        { to: '/fourth', label: 'Fourth Link' },
    ];

    return (
        <header className="body-font bg-sky-500 text-md md:text-lg">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                <h1 className='text-white'>Logo</h1>
                <nav>
                    {links.map(({ to, label }) => (
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
                {login ? <Link to={'/login'} className='px-4 py-2 rounded-lg bg-white text-blue-500'>Login</Link> : <Link onClick={() => authService.logout()} className='px-4 py-2 rounded-lg bg-white text-blue-500'>Logout</Link>}
            </div>
        </header>
    )
}

export default Header