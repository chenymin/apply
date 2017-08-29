import axios from '../utils/axios'

export const login = (data) => axios.post('/user/login', data)

export const userInfo = (data) => axios.post('/account/info', data)

export const userVerify = (data) => axios.post('/account/verify', data)
