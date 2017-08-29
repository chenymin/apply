import Vue from 'vue'
import Router from 'vue-router'

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

export default new Router({
  routes: [
    { name: 'login', path: '/login', component: Login, meta: { auth: false } },
    { name: 'basicinfo', path: '/basicinfo', component: BasicInfo, meta: { auth: true } },
    { name: 'applyinfo', path: '/applyinfo', component: ApplyInfo, meta: { auth: true } },
    { name: 'applycomplete', path: '/applycomplete', component: ApplyComplete, meta: { auth: true } },
    { name: 'usercenter', path: '/usercenter', component: UserCenter, meta: { auth: true } },
    { name: 'loanlist', path: '/loanlist', component: LoanList, meta: { auth: true } },
    { name: 'loandetail', path: '/loandetail', component: LoanDetail, meta: { auth: true } },
    { name: 'product', path: '/product', component: Product, meta: { auth: false } },
    { name: 'test', path: '/test', component: Test, meta: { auth: false } },
    { path: '*', redirect: { name: 'login' } }
  ]
})
