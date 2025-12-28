import { useDispatch } from "react-redux";
import BASE_URL from "../api/api";
import { login as storeLogin, logout as storeLogout } from "../store/authSlice";


// ---------------------------------------------------
// AUTHENTICATION SERVICES
// ---------------------------------------------------
class AuthService {

    // signup & login
    async signup({ username, email, password }) {
        try {
            const response = await fetch(`${BASE_URL}auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password }),
            })

            const result = await response.json()

            if (response.ok) {
                await this.login({ username, password })
            } else {
                throw new Error(`authservice error :: ${result.message} || 'Signup failed'`)
            }

            return { response, result }
        } catch (error) {
            console.log('authService error :: signup ::', error)
            throw error
        }
    }

    // login 
    async login({ username, password }) {
        try {
            const response = await fetch(`${BASE_URL}auth/login/`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json()

            if (response.ok) {
                localStorage.setItem('megaNotesAccessToken', result.access)
                localStorage.setItem('megaNotesRefreshToken', result.refresh)

                await this.getUser()
                return { response, result }
            } else {
                throw new Error(`authservice error :: ${result.message} || 'Login failed'`)
            }

        } catch (error) {
            console.log('authService error :: login ::', error)
            throw error
        }
    }

    // get currently logged in user
    async getUser() {
        let accessToken = localStorage.getItem('megaNotesAccessToken')
        console.log(accessToken)
        // No access token → try refresh
        if (!accessToken) {
            accessToken = await this.getToken();
            if (!accessToken) return null;
        }

        try {
            let response = await fetch(`${BASE_URL}/auth/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            // Access token expired → refresh & retry once
            if (response.status === 401) {
                accessToken = await this.getToken();
                if (!accessToken) return null;

                response = await fetch(`${BASE_URL}/auth/user/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
            }

            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const result = await response.json();
            return { response, result };

        } catch (error) {
            console.error('authService error :: getUser ::', error);
            return null;
        }
    }


    // get new access token
    async getToken() {
        const refreshToken = localStorage.getItem('megaNotesRefreshToken');
        if (!refreshToken) return null;

        try {
            const response = await fetch(`${BASE_URL}/auth/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Refresh token expired');
            }

            const result = await response.json();
            console.log(response)
            console.log(result)
            localStorage.setItem('megaNotesAccessToken', result.access);
            return result.access;

        } catch (error) {
            console.error('authService error :: getToken ::', error);
            localStorage.removeItem('megaNotesAccessToken');
            localStorage.removeItem('megaNotesRefreshToken');
            return null;
        }
    }


    // logout
    logout() {
        localStorage.removeItem('megaNotesAccessToken')
        localStorage.removeItem('megaNotesRefreshToken')
    }
}

const authService = new AuthService()

export default authService;