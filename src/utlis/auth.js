import storage from './storage'
const TOKEN_KEN = 'HEIMA_TOUTIAO_TOKEN'

export const setToken = (token) => storage.set(TOKEN_KEN, token)
export const getToken = () => storage.get(TOKEN_KEN)
export const removeToken = (token) => storage.remove(TOKEN_KEN)
