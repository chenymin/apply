import {loanApplicationAdd, getLoanList, getLoanDetil, getLoanLastData} from '../../api/apply'
import * as types from '../mutation-types'
import _ from 'lodash'

const state = {
  loanList: [],
  loanInfo: {
    comName: '121',
    amount: '200',
    loanPerods: '90',
    createTime: '2017-09-01'
  },
  loanLatestData: []
}

const getters = {
  loanList: state => state.loanList,
  loanInfo: state => state.loanInfo,
  loanLatestData: state => state.loanLatestRecord
}

const actions = {
  addLoanApply ({commit}, {param, router}) {
    loanApplicationAdd(param).then(({data}) => {
      // const {id} = data
      console.log('loanApplicationAdd')
      router.push({
        name: 'applycomplete',
        params: {id: 24}
      })
    })
  },
  fetchLoanList ({commit}, {param}) {
    getLoanList(param).then(({data}) => {
      console.log('getLoanList')
      commit(types.GET_LOAN_LIST, {data})
    })
  },

  fetchLoanInfo ({commit}, {id, commpleteData}) {
    getLoanDetil({params: {id: id}}).then(({data}) => {
      commit(types.GET_LOAN_INFO, {data})
      commit(types.CHANGE_APP_COMPLETE_INFO, {commpleteData})
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
  },
  [types.CHANGE_APP_COMPLETE_INFO] (state, {commpleteData}) {
    console.log(state.loanInfo)
    const {info} = commpleteData
    _.map(info, (item) => {
      const {modal} = item
      item.value = state.loanInfo[modal]
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
