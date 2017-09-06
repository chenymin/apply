import axios from 'axios'
import URLSearchParams from 'url-search-params'
import {getStore} from './storage'
import store from '../store/index'
import eventBus from '../utils/eventBus'

export const url = process.env.NODE_ENV === 'development' ? 'http://10.166.2.190:8080/credit-server-web' : ''

const showToast = (msg) => {
  store.commit('changeToast', {content: msg, isShowToast: true})
  eventBus.$emit('toast/show')
}

const instance = axios.create({
  baseURL: url,
  timeout: 10000,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: '_csrf',
  headers: {'authorization': getStore('token')},
  transformRequest (data) {
    if (!data) return
    // transform obj to formData
    var params = new URLSearchParams()
    Object.entries(data).forEach((item) => params.append.apply(params, item))
    return params
  },
  validateStatus (status) {
    return status === 200
  }
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  // before request send, set csrf
  if (!config.headers.authorization) {
    config.headers.authorization = getStore('token')
  }
  document.cookie = `_csrf=${new Date().getTime()}; path=/`
  return config
})

// 返回拦截器
instance.interceptors.response.use(
  ({data: {code, message, data}}) => {
    console.log(code)
    if (code === 'fail') {
      showToast(message)
    }
    if (data) {
      return {data, code}
    }
    return {
      code: '-1',
      data: ''
    }
  },
  ({response}) => {
    const {status} = response
    console.log(status)
    if (status === 401) {
      showToast('token失效，请重新登录')
      store.dispatch('removeToken')
      window.location.reload()
    }
    return Promise.reject(response)
  })

export default instance
