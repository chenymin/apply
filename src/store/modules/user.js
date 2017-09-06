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
  login ({commit}, {param, router, redirect}) {
    userLogin(param).then(({data}) => {
      commit(types.USER_LOGIN, {data})
      router.push({
        path: redirect
      })
    })
  },
  async getUserInfo ({commit}) {
    const {data} = await userInfo()
    commit(types.GET_USER_INFO, {data})
    return await data
  },
  baseInfoVerify ({commit}, {param, router}) {
    console.log(param)
    userVerify(param).then(({data}) => {
      // TODO 验证未通过弹框
      const {code} = data
      if (code === 'error') {
        return
      }
      router.push({
        name: 'applyinfo'
      })
      console.log('userVerify')
    })
  },

  sendSmsCode ({commit}, {param}) {
    sendSMSMsg(param).then(({data}) => {
      commit(types.SEND_SMS_CODE, {data})
    })
  },

  removeToken () {
    removeStore('token')
  }
}

const mutations = {
  [types.USER_LOGIN] (state, {data}) {
    const {userId, token} = data
    setStore('token', token)
    state.userInfo = data
    console.log(token + ' ' + userId)
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
