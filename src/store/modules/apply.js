import {loanApplicationAdd, getLoanList, getLoanDetil, getLoanLastData, applyPrepayment} from '../../api/apply'
import {setStore, getStore, removeStore} from '../../utils/storage'
import * as types from '../mutation-types'
import {url} from '../../utils/axios'
import {floorNum} from '../../utils/util'
import _ from 'lodash'

const state = {
  loanList: [],
  loanInfo: {
  },
  applyEdit: {
  },
  loanLatestData: [
  ],
  protocolUrl: ''
}

const getters = {
  loanList: state => state.loanList,
  loanInfo: state => state.loanInfo,
  loanLatestData: state => state.loanLatestData,
  applyEdit: state => state.applyEdit,
  protocolUrl: state => state.protocolUrl
}

const actions = {
  async addLoanApply ({commit}, {param, router, fn}) {
    const {data, code} = await loanApplicationAdd(param).catch(() => {
      fn && fn()
    })
    if (code === 'suss') {
      fn && fn()
      removeStore('applyEdit')
      const {id} = data
      router.push({
        name: 'applycomplete',
        params: {id}
      })
    }
    return await {data, code}
  },

  fetchLoanList ({commit}, {proType}) {
    getLoanList({params: {proType: proType}}).then(({data, code}) => {
      if (code === 'suss') {
        commit(types.GET_LOAN_LIST, {data})
      }
    })
  },

  async fetchLoanInfo ({commit}, {id, pageData}) {
    const {data, code} = await getLoanDetil({params: {id: id}})
    if (code === 'suss') {
      commit(types.GET_LOAN_INFO, {data})
      commit(types.CHANGE_APP_COMPLETE_INFO, {pageData})
    }
    return await {data, code}
  },

  fetchLoanLastData ({commit}) {
    getLoanLastData().then(({data, code}) => {
      if (code === 'suss') {
        commit(types.GET_LOAN_LAST_DATA, {data})
      }
    })
  },

  async prepayment ({commit}, {param}) {
    const {data, code} = await applyPrepayment(param)
    return await {data, code}
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
    const {info} = pageData
    _.map(info, (item) => {
      const {modal} = item
      if (modal && modal === 'amount') {
        item.value = floorNum(state.loanInfo[modal])
      } else {
        item.value = state.loanInfo[modal]
      }
    })
  },

  changeApplyEdit (state, item) {
    _.assign(state.applyEdit, item)
    setStore('applyEdit', state.applyEdit)
  },

  getProtocolSrc (state) {
    const type = getStore('sysSite')
    if (type === '02') {
      state.protocolUrl = `${url}/pdf/ytxd_xyd.pdf`
    } else if (type === '01') {
      if (state.applyEdit && state.applyEdit.city.indexOf('上海') >= 0) {
        state.protocolUrl = `/static/protocol/${'shanghai'}.htm`
      } else if (state.applyEdit && state.applyEdit.city.indexOf('北京') >= 0) {
        state.protocolUrl = `/static/protocol/${'beijing'}.htm`
      }
    }
  },

  [types.CHANGE_APP_INFO] (state, {appInfoData}) {
    state.applyEdit = appInfoData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
