import store from '../../store/index'
export const myInputNoticeVal = (item) => {
  store.commit('changeApplyEdit', item)
}

export const mySelectNoticeVal = (item) => {
  store.commit('changeApplyEdit', item)
}

export const myDistChangeVal = (item) => {
  console.log('---->')
  store.commit('changeApplyEdit', item)
}

