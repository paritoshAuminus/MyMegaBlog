import BASE_URL from "../api/api";
import { login as storeLogin, logout as storeLogout } from "../store/authSlice";


// ---------------------------------------------------
// AUTHENTICATION SERVICES
// ---------------------------------------------------

class AuthService {

    // signup & login
    async signup({ name, email, password }) {
        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const response = await this.login({ email, password })
                return response
            } else {
                console.log(`Failed to signup :: ${response.status} :: ${response.statusText}`)
            }
        } catch (error) {
            console.log('authService error :: signup ::', error)
            throw error
        }
    }

    // login 
    async login({ email, password }) {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json()

            if (response.ok) {
                localStorage.setItem('megaNotesAccessToken', result.token)
            } else {
                console.log('login :: failed to login')
                return {response}
            }
            return {response, result}

        } catch (error) {
            console.log('authService error :: login ::', error)
            throw error
        }
    }

    // get currently logged in user
    async getUser() {
        const token = localStorage.getItem('megaNotesAccessToken');
        if (!token) return false;

        try {
            const response = await fetch(`${BASE_URL}/auth/getUser`, {
                method: 'GET', // GET is enough
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // <-- send token in header
                }
            });

            if (!response.ok) return false;
            return response

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