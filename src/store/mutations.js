import _ from 'lodash'

const defaultKey = {myInput: 'value', mySelect: 'defaultVal', myDistPicker: 'defaultVal'}
export const bindDefaultValue = (state, key) => {
  const info = state.global.currentData[key]
  state.apply.applyEdit = {}
  _.forEach(info, ({type, props, model}) => {
    if (model) {
      state.apply.applyEdit[model] = props[defaultKey[type]] || ''
    }
  })
}

export const bindValue = (state, key) => {
  const info = state.global.currentData[key]
  _.forEach(info, ({type, props, model}) => {
    if (model && !_.isEmpty(state.apply.applyEdit)) {
      _.assign(props, {[defaultKey[type]]: state.apply.applyEdit[model]})
    }
  })
}

export const changeToast = (state, obj) => {
  _.assign(state.global.toast, obj)
}
