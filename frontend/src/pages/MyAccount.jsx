import React, { useEffect, useState } from "react";
import { Button } from "../components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as storeLogout } from "../store/authSlice";
import { FaUserCircle } from "react-icons/fa";
import authService from '../auth/auth'


/**
 * MyAccount Component
 * 
 * - Displays userName and email.
 * - Can accept `user` as a prop OR fetch from `/api/me`.
 * 
 * Example usage:
 * <MyAccount user={{ userName: "JohnDoe", email: "john@example.com" }} />
 */

function MyAccount() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            setLoading(true);

            const data = await authService.getUser();

            if (!data) {
                throw new Error("No token found");
            }

            const { response, result } = data;

            if (!response.ok) {
                throw new Error(result?.message || "Failed to fetch user info");
            }

            setUser(result);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUser()
    }, [])

    const handleLogout = () => {
        authService.logout()
        dispatch(storeLogout())
        navigate('/login')
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
                Loading account info...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
                <p>No user info available. Consider <Link to="/signup" className="text-blue-400 cursor-pointer font-semibold">Singning up.</Link></p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500 text-lg">
                {error}
            </div>
        );
    }


    return (
        <>
            <section className="body-font text-gray-600">
                <div className="container mx-auto px-5 py-24 flex justify-center">
                    <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8">

                        {/* Header */}
                        <div className="flex flex-col items-center mb-8">
                            <FaUserCircle className="text-6xl text-blue-600 mb-3" />
                            <h1 className="text-2xl font-semibold text-gray-900">
                                My Account
                            </h1>
                            <p className="text-sm text-gray-500">
                                Manage your profile and session
                            </p>
                        </div>

                        {/* User Info */}
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-medium text-gray-700">Name</span>
                                <span className="text-gray-900">{user?.username || '—'}</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="font-medium text-gray-700">Email</span>
                                <span className="text-gray-900">{user?.email || '—'}</span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="font-medium text-gray-700">Account Status</span>
                                <span className="text-green-600 font-medium">Active</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between gap-4">
                            <button
                                className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition"
                                disabled
                            >
                                Edit Profile
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            < footer className="mt-16 text-center text-gray-500 text-sm pb-8" >
                © {new Date().getFullYear()} YourApp.All rights reserved.
            </footer >
        </>
    );
}

export default MyAccount;
