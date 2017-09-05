import {loanApplicationAdd, getLoanList, getLoanDetil, getLoanLastData, applyPrepayment} from '../../api/apply'
import * as types from '../mutation-types'
import _ from 'lodash'

const state = {
  loanList: [],
  loanInfo: {
  },
  applyEdit: {
  },
  loanLatestData: [
  ]
}

const getters = {
  loanList: state => state.loanList,
  loanInfo: state => state.loanInfo,
  loanLatestData: state => state.loanLatestData,
  applyEdit: state => state.applyEdit
}

const actions = {
  addLoanApply ({commit}, {param, router}) {
    loanApplicationAdd(param).then(({data}) => {
      const {id} = data
      console.log('loanApplicationAdd')
      router.push({
        name: 'applycomplete',
        params: {id}
      })
    })
  },

  fetchLoanList ({commit}, {proType}) {
    getLoanList({params: {proType: proType}}).then(({data}) => {
      console.log('getLoanList' + proType)
      commit(types.GET_LOAN_LIST, {data})
    })
  },

  fetchLoanInfo ({commit}, {id, pageData}) {
    getLoanDetil({params: {id: id}}).then(({data}) => {
      commit(types.GET_LOAN_INFO, {data})
      commit(types.CHANGE_APP_COMPLETE_INFO, {pageData})
    })
  },

  fetchLoanLastData ({commit}) {
    getLoanLastData().then(({data}) => {
      commit(types.GET_LOAN_LAST_DATA, {data})
    })
  },

  prepayment ({commit}, {id}) {
    applyPrepayment({params: {id: id}}).then((data) => {
      console.log(data)
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
    state.loanLatestData = data
  },

  [types.CHANGE_APP_COMPLETE_INFO] (state, {pageData}) {
    console.log(state.loanInfo)
    const {info} = pageData
    _.map(info, (item) => {
      const {modal} = item
      item.value = state.loanInfo[modal]
    })
  },

  changeApplyEdit (state, item) {
    console.log('changeApplyEdit')
    _.assign(state.applyEdit, item)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
