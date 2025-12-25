const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL
export const signup = `${BASE_URL}/auth/regiter`
export const login = `${BASE_URL}/auth/login`
export const refresh = `${BASE_URL}/auth/refresh`
export default BASE_URL