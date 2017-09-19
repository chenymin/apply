import * as types from '../mutation-types'
import {setStore, removeStore} from '../../utils/storage'
import {userLogin, userInfo, userVerify, sendSMSMsg} from '../../api/user'
import _ from 'lodash'

const state = {
  userInfo: {},
  smsCode: {}
}

const getters = {
  userInfo: state => state.userInfo,
  smsCode: state => state.smsCode
}

const actions = {
  async login ({commit}, {param, router, redirect}) {
    const {data, code} = await userLogin(param)
    const {mobile} = param
    commit(types.USER_LOGIN, {data, mobile})
    return await {data, code}
  },
  async getUserInfo ({commit}) {
    const {data} = await userInfo()
    commit(types.GET_USER_INFO, {data})
    return await {data}
  },
  baseInfoVerify ({commit}, {param, router}) {
    userVerify(param).then(({data}) => {
      // TODO 验证未通过弹框
      const {code} = data
      if (code === 'error') {
        return
      }
      router.push({
        name: 'applyinfo'
      })
    })
  },

  async sendSmsCode ({commit}, {param}) {
    const {data, code} = await sendSMSMsg(param)
    commit(types.SEND_SMS_CODE, {data})
    return await {data, code}
  },

  removeToken () {
    removeStore('token')
  }
}

const mutations = {
  [types.USER_LOGIN] (state, {data, mobile}) {
    const {token} = data
    setStore('token', token)
    setStore('mobile', mobile)
    state.userInfo = data
  },

  [types.GET_USER_INFO] (state, {data}) {
    let {name, idNo, bankCard, bankMobile} = data
    bankMobile = bankMobile || ''
    _.assign(state.userInfo, {name, idNo, bankCard, bankMobile})
  },
  [types.SEND_SMS_CODE] (state, {data}) {
    const {verifyCodeCount} = data
    setStore('verifyCodeCount', verifyCodeCount)
    _.assign(state.smsCode, {verifyCodeCount})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
