import Vue from 'vue'
import Router from 'vue-router'
import {getStore} from '../utils/storage'

Vue.use(Router)

const Product = r => require.ensure([], () => r(require('@/views/product')), 'chunk-product')
const Login = r => require.ensure([], () => r(require('@/views/login')), 'chunk-login')
const BasicInfo = r => require.ensure([], () => r(require('@/views/basicinfo')), 'chunk-basicinfo')
const ApplyInfo = r => require.ensure([], () => r(require('@/views/applyinfo')), 'chunk-applyinfo')
const ApplyComplete = r => require.ensure([], () => r(require('@/views/applycommplete')), 'chunk-applycomplete')
const UserCenter = r => require.ensure([], () => r(require('@/views/usercenter')), 'chunk-usercenter')
const LoanList = r => require.ensure([], () => r(require('@/views/loanlist')), 'chunk-loanlist')
const LoanDetail = r => require.ensure([], () => r(require('@/views/loandetail')), 'chunk-loandetail')
const Test = r => require.ensure([], () => r(require('@/views/test')), 'chunk-loandetail')

const router = new Router({
  routes: [
    { name: 'login', path: '/login/:sysSite/:site', component: Login, meta: { auth: false } },
    { name: 'basicinfo', path: '/basicinfo', component: BasicInfo, meta: { auth: true } },
    { name: 'applyinfo', path: '/applyinfo', component: ApplyInfo, meta: { auth: true } },
    { name: 'applycomplete', path: '/applycomplete/:id', component: ApplyComplete, meta: { auth: true } },
    { name: 'usercenter', path: '/usercenter', component: UserCenter, meta: { auth: true } },
    { name: 'loanlist', path: '/loanlist/:proType', component: LoanList, meta: { auth: true } },
    { name: 'loandetail', path: '/loandetail/:id', component: LoanDetail, meta: { auth: true } },
    { name: 'product', path: '/product/:site', component: Product, meta: { auth: false } },
    { name: 'test', path: '/test', component: Test, meta: { auth: false } },
    { path: '*', redirect: {name: 'login'} }
  ]
})

router.beforeEach(({ meta, name, path }, from, next) => {
  let { auth = true } = meta
  if (auth) {
    const token = getStore('token')
    // console.warn('-------------------------------------------')
    // console.log(name)
    // console.log(path)
    if (auth && !token && path !== 'login') {
      return next({
        name: 'login',
        query: { redirect: path }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  next()
})

export default router
