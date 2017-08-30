import axios from '../utils/axios'

export const loanapplication = (data) => axios.post('/loanapplication/add', data)

export const getLoanapplication = () => axios.get('/loanapplication/list')
