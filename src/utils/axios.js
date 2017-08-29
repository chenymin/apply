import axios from 'axios'
import URLSearchParams from 'url-search-params'

const instance = axios.create({
  baseURL: 'http://10.166.2.184:8080/credit-server-web/',
  timeout: 10000,
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
  document.cookie = `_csrf=${new Date().getTime()}; path=/`
  return config
})

// 返回拦截器
instance.interceptors.response.use(
  ({data, status, statusText}) => {
    return {data, status}
  },
  ({response}) => {
    if ([403, 401].indexOf(response.status) !== -1) {
      // TODO 根据业务需求处理
      console.log('请求')
    }
    return Promise.reject(response)
  })

export default instance
