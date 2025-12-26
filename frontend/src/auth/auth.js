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

                // calling getUser for user information --> store/authslice
                this.getUser()
            } else {
                console.log('login :: failed to login')
                return response.message
            }
            return { response, result }

        } catch (error) {
            console.log('authService error :: login ::', error)
            throw error
        }
    }

    // get currently logged in user
    async getUser() {
        const token = localStorage.getItem('megaNotesAccessToken');
        if (!token) {
            await this.getToken()
        }
        if (!token) return null;

        try {
            const response = await fetch(`${BASE_URL}/auth/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();
            return { response, result };

        } catch (error) {
            console.error('authService error :: getUser ::', error);
            throw error;
        }
    }

    // get new access token
    async getToken() {
        const token = localStorage.getItem('megaNotesRefreshToken');

        if (!token) return null;
        try {
            const response = await fetch(`${BASE_URL}/auth/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: token })
            });
            const result = await response.json();
            localStorage.setItem('megaNotesAccessToken', result.access)
            return { response, result };
        } catch (error) {
            console.error('authService error :: getToken ::', error);
            throw error;
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