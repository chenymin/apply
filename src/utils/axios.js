import axios from 'axios'
import URLSearchParams from 'url-search-params'
import {getStore} from './storage'
import store from '../store/index'
import eventBus from '../utils/eventBus'

export const url = process.env.NODE_ENV === 'development' ? 'http://10.166.2.190:8080/credit-server-web' : ''

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
      store.commit('changeToast', {content: message, isShowToast: true})
      eventBus.$emit('toast/show')
    }
    if (data) {
      return {data}
    }
    return {
      code: '-1',
      data: ''
    }
  },
  (data) => {
    console.log(data)
    store.commit('changeToast', {content: 'session失效，请重新登录', isShowToast: true})
    eventBus.$emit('toast/show')
    store.dispatch('removeToken')
    window.location.reload()
    return Promise.reject(data)
  })

export default instance
