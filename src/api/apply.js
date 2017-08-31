import axios from '../utils/axios'

export const loanApplicationAdd = (data) => axios.post('/loanapplication/add', data)

export const getLoanList = (data) => axios.get('/loanapplication/list', data)

export const getLoanDetil = (data) => axios.get('/loanapplication/info', data)

export const getLoanLastData = () => axios.get('/loanapplication/getLoanLatestRecord')
