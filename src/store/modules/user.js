import * as types from '../mutation-types'
import {setStore} from '../../utils/storage'
import {userLogin, userInfo} from '../../api/user'

const state = {
  userInfo: {}
}

const getters = {}

const actions = {
  login ({commit}, {param, router, redirect}) {
    userLogin(param).then(({data}) => {
      router.push({
        path: redirect
      })
      commit(types.USER_LOGIN, {data})
    })
  },
  getUserInfo ({commit}) {
    userInfo().then(({data}) => {
      console.log('userInfo')
    })
  }
}

const mutations = {
  [types.USER_LOGIN] (state, {data}) {
    const {userId, token} = data
    setStore('token', token)
    state.userInfo = data
    console.log(token + ' ' + userId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
