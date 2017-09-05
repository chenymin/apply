import axios from '../utils/axios'

export const userLogin = (data) => axios.post('/user/login', data)

export const userInfo = () => axios.get('/account/info')

export const userVerify = (data) => axios.post('/account/verify', data)

export const sendSMSMsg = (data) => axios.post('/user/sms', data)

