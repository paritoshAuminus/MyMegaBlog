import { Client, Account, Databases, ID } from "appwrite";
import conf from "../config/conf";

// --------------------------------
// APPWRITE AUTHENTICATION SERVICES 
// --------------------------------

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteURL)
        this.client.setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    // Create account/Signup
    async createAccount({ email, password }) {
        try {
            if (!email || !password) {
                throw new Error('Email and password are required')
            }

            const userId = ID.unique()
            const result = await this.account.create(userId, email, password)

            // Only attempt login if account creation was successful
            if (result) {
                return await this.login({ email, password })
            }
            return result
        } catch (error) {
            console.error('AuthService error :: createAccount ::', error)
            throw error
        }
    }

    // login
    async login({ email, password }) {
        try {
            if (!email || !password) {
                throw new Error('Email and password are required')
            }

            // const result = await this.account.createEmailPasswordSession({ email, password });

            if (!result) {
                throw new Error('Login failed')
            }
            return result
        } catch (error) {
            console.error('AuthService error :: login ::', error)
            throw error
        }
    }


    // get account :: get currently logged in user
    async getAccount() {
        try {

            await this.account.createEmailPasswordSession();

            const result = await this.account.get()

            if (result) {
                return result
            } else {
                console.log('No logged in user found')
            }
        } catch (error) {
            console.log('AuthService error :: getAccount::', error)
            throw error
        }
    }

    // logout
    async logout() {
        try {
            await account.deleteSessions();
        } catch (error) {
            console.log('AuthService error :: logout::', error)
            throw error
        }
    }

    // delete account
    async deleteAccount({ }) {
        try {
            const result = await this.account.deleteAccount()
        } catch (error) {
            console.log('AuthService error :: deleteAccount::', error)
        }
    }
}


const authService = new AuthService()

export default authService