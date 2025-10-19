import BASE_URL from "../api/api";
import { login as storeLogin, logout as storeLogout } from "../store/authSlice";

class AuthService {

    // signup
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
                console.log(response)
                return response
            } else {
                console.log(`authService response:: signup :: ${response.status} :: ${response.statusText}`)
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
                storeLogin(result.user)
            }

            return result

        } catch (error) {
            console.log('authService error :: login ::', error)
            throw error
        }
    }

    // get currently logged in user
    getUser() {
        // check if the access token is present
        if (localStorage.getItem('megaNotesAccessToken')) {
            return true
        }
    }

    // logout
    logout() {
        localStorage.removeItem('megaNotesAccessToken')
        storeLogout()
    }
}

console.log(localStorage.getItem('megaNotesAccessToken'))

const authService = new AuthService()

export default authService;