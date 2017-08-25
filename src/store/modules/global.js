import xinyuloan from '../../utils/config/xingyuloan'
import housefinance from '../../utils/config/housefinance'
console.log(xinyuloan)
console.log(housefinance)
const state = {
  xinYuLoan: xinyuloan,
  houseFinance: housefinance
}

const getters = {
  xingYuLoanData: state => state.xinYuLoan,
  houseFinance: state => state.houseFinance
}

export default {
  state,
  getters
}
