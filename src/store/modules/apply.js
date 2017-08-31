import {loanApplicationAdd, getLoanList, getLoanDetil, getLoanLastData} from '../../api/apply'
import * as types from '../mutation-types'

const state = {
  loanList: [],
  loanInfo: {},
  loanLatestData: []
}

const getters = {
  loanList: state => state.loanList,
  loanInfo: state => state.loanInfo,
  loanLatestData: state => state.loanLatestRecord
}

const actions = {
  addLoanApply ({commit}, {param}) {
    loanApplicationAdd(param).then(({data}) => {
      console.log('loanApplicationAdd')
    })
  },
  fetchLoanList ({commit}, {param}) {
    getLoanList(param).then(({data}) => {
      console.log('getLoanList')
      commit(types.GET_LOAN_LIST, {data})
    })
  },

  fetchLoanInfo ({commit}, {param}) {
    getLoanDetil(param).then((data) => {
      console.log('getLoanInfo')
      commit(types.GET_LOAN_INFO, {data})
    })
  },

  fetchLoanLastData ({commit}) {
    getLoanLastData().then(({data}) => {
      commit(types.GET_LOAN_LAST_DATA, {data})
    })
  }
}

const mutations = {
  [types.GET_LOAN_LIST] (state, {data}) {
    state.loanList = data
  },

  [types.GET_LOAN_INFO] (state, {data}) {
    state.loanInfo = data
  },

  [types.GET_LOAN_LAST_DATA] (state, {data}) {
    state.loanLatestRecord = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
