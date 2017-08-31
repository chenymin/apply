import * as types from '../mutation-types'
import xinyuLoan from '../../utils/config/xingyuloan'
import houseFinance from '../../utils/config/housefinance'
import productList from '../../utils/config/productlist'

console.log(xinyuLoan)
console.log(houseFinance)
console.log(productList)

const state = {
  currentData: '',
  pageSource: {
    '02': xinyuLoan,
    '01': houseFinance
  },
  productList
}

const getters = {
  currentData: state => state.currentData,
  productListData: state => state.productList
}

const actions = {
}

const mutations = {
  [types.GET_CURRENT_DATA] ({pageSource}, {type}) {
    console.log('--->types.GET_CURRENT_DATA')
    state.currentData = pageSource[type]
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}
