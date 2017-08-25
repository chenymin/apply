import xinyuLoan from '../../utils/config/xingyuloan'
import houseFinance from '../../utils/config/housefinance'
import productList from '../../utils/config/productlist'

console.log(xinyuLoan)
console.log(houseFinance)
console.log(productList)

const state = {
  xinyuLoan,
  houseFinance,
  productList
}

const getters = {
  xingYuLoanData: state => state.xinYuLoan,
  houseFinanceData: state => state.houseFinance,
  productListData: state => state.productList
}

export default {
  state,
  getters
}
