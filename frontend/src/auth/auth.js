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
            console.log(result)

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
        if (!token) token = localStorage.getItem('megaNotesRefreshToken');

        try {
            const response = await fetch(`${BASE_URL}/auth/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json()
            console.log(response)
            if (!response.ok) return `$getUser error :: ${response.statusText}`;

            console.log(result)

            return { response, result }

        } catch (error) {
            console.error('authService error :: getUser ::', error);
            return false;
        }
    }

    // logout
    logout() {
        localStorage.removeItem('megaNotesAccessToken')
    }
}

const authService = new AuthService()

export default authService;