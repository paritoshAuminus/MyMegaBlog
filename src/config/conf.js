/*
For easier access to the envronment variables and to keep the actual url safe,
this file will hold and export all the .env variable values as follows; they
are explicitly coerced into string as some values (entire numbers) might be 
implicitly coerced into numbers
*/

const conf = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteProjectName: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
}

export default conf