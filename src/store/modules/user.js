import * as types from '../mutation-types'
import {setStore} from '../../utils/storage'
import {userLogin, userInfo, userVerify} from '../../api/user'
import _ from 'lodash'

const state = {
  userInfo: {}
}

const getters = {}

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
      router.push({
        name: 'applyinfo'
      })
      console.log('userVerify')
    })
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
    console.log('--->1')
    let {name, idNo, bankCard, bankMobile} = data
    bankMobile = bankMobile || ''
    _.assign(state.userInfo, {name, idNo, bankCard, bankMobile})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
