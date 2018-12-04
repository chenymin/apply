import axios from 'axios'
import URLSearchParams from 'url-search-params'
import {getStore} from './storage'
import store from '../store/index'
import eventBus from '../utils/eventBus'
import _ from 'lodash'
import router from '../router/index'

export const url = process.env.NODE_ENV === 'development' ? 'http://10.166.15.46:19031/credit-server-web' : '/credit-server-web'

const showToast = (msg) => {
  store.commit('changeToast', {content: msg})
  eventBus.$emit('toast/show')
}

const instance = axios.create({
  baseURL: url,
  timeout: 30000,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: '_csrf',
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
  eventBus.$emit('loding/show')
  if (!config.headers.authorization) {
    config.headers.authorization = getStore('token')
  }
  document.cookie = `_csrf=${new Date().getTime()}; path=/`
  return config
})

// 返回拦截器
instance.interceptors.response.use(
  ({data: {code, message, data}}) => {
    eventBus.$emit('loding/hidden')
    // console.log(code)
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
  (data) => {
    eventBus.$emit('loding/hidden')
    if (!data) {
      showToast('网络请求错误')
    } else {
      const {response} = _.isObject(data) && data
      if (!response) {
        showToast('网络连接失败')
      } else {
        const {status} = response
        if (status && status === 401) {
          showToast('token失效，请重新登录')
          store.dispatch('removeToken')
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
        } else {
          showToast('系统出错')
        }
      }
    }
    return Promise.reject(data)
  })

export default instance
