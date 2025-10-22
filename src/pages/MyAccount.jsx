import React, { useEffect, useState } from "react";
import authService from "../auth/auth";

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

    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await authService.getUser();
            if (!res.ok) throw new Error("Failed to fetch user info");
            const data = await res.json();
            setUser(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser()
    }, [])

    // EXAMPLE REQUEST
    // PUT http://localhost:8080/auth/update
    // Authorization: Bearer 1729580281914
    // Content - Type: application / json

    // {
    //      "name": "Updated Name",
    //      "email": "newemail@example.com",
    //      "password": "newpassword123"
    // }

    // EXAMPLE RESPONSE
    // {
    //  "message": "User updated successfully",
    //  "user": {
    //      "id": 1729580281914,
    //      "name": "Updated Name",
    //      "email": "newemail@example.com"
    //  }
    // }



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
                Loading account info...
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

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
                No user info available. Consider Singning up.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-8 border-b pb-3">
                        Account Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                                Username
                            </p>
                            <p className="text-lg font-medium text-gray-900">
                                {user?.name || "—"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                                Email
                            </p>
                            <p className="text-lg font-medium text-gray-900">
                                {user?.email || "—"}
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t my-10"></div>

                    {/* Extra Section (Optional) */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About me</h3>
                        <p className="text-gray-600 mb-2">
                            Add more to your profile about yourself, your ideas and innovations.
                        </p>
                        <button onClick={() => (setEdit(!edit))} className="px-5 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-not-allowed">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-16 text-center text-gray-500 text-sm pb-8">
                © {new Date().getFullYear()} YourApp. All rights reserved.
            </footer>
        </div>
    );
}

export default MyAccount;