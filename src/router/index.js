import Vue from 'vue'
import Router from 'vue-router'
import {getStore} from '../utils/storage'
import {setTitle} from '../utils/util'

Vue.use(Router)

const Product = r => require.ensure([], () => r(require('@/views/product')), 'chunk-product')
const Login = r => require.ensure([], () => r(require('@/views/login')), 'chunk-login')
const BasicInfo = r => require.ensure([], () => r(require('@/views/basicinfo')), 'chunk-basicinfo')
const ApplyInfo = r => require.ensure([], () => r(require('@/views/applyinfo')), 'chunk-applyinfo')
const ApplyComplete = r => require.ensure([], () => r(require('@/views/applycommplete')), 'chunk-applycomplete')
const UserCenter = r => require.ensure([], () => r(require('@/views/usercenter')), 'chunk-usercenter')
const LoanList = r => require.ensure([], () => r(require('@/views/loanlist')), 'chunk-loanlist')
const LoanDetail = r => require.ensure([], () => r(require('@/views/loandetail')), 'chunk-loandetail')
const Prepaymentapply = r => require.ensure([], () => r(require('@/views/prepaymentapply')), 'chunk-prepaymentapply')

const router = new Router({
  routes: [
    { name: 'login', path: '/login', component: Login, meta: { auth: false, title: '登录' } },
    { name: 'basicinfo', path: '/basicinfo', component: BasicInfo, meta: { auth: true, title: `申请` } },
    { name: 'applyinfo', path: '/applyinfo', component: ApplyInfo, meta: { auth: true, title: `申请` } },
    { name: 'applycomplete', path: '/applycomplete/:id', component: ApplyComplete, meta: { auth: true, title: `申请` } },
    { name: 'usercenter', path: '/usercenter', component: UserCenter, meta: { auth: true, title: '账户中心' } },
    { name: 'loanlist', path: '/loanlist/:proType', component: LoanList, meta: { auth: true } },
    { name: 'loandetail', path: '/loandetail/:id/:type', component: LoanDetail, meta: { auth: true, title: '借款详情' } },
    { name: 'product', path: '/product/:site', component: Product, meta: { auth: false, title: '个人借款' } },
    { name: 'prepaymentapply', path: '/prepaymentapply/:id/:type', component: Prepaymentapply, meta: { auth: true, title: '提前还款申请' } },
    { path: '*', redirect: {name: 'login'} }
  ]
})

router.beforeEach(({ meta, name, path }, from, next) => {
  let { auth = true, title } = meta
  setTitle(title)
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
