import {myInputNoticeVal, mySelectNoticeVal} from './monitorComsEmit'
const components = {}
components.myInput = require('../input.vue')
components.myLable = require('../label.vue')
components.mySelect = require('../selection.vue')

const eventOn = {}
eventOn.myInput = myInputNoticeVal
eventOn.mySelect = mySelectNoticeVal

export default {
  name: 'factor',
  props: ['factor'],
  render (h) {
    const createField = (field) => h(
      'div',
      [
        h(
          components[field.type] || field.type,
          {
            props: {
              props: field.props || {},
              model: field.model || ''
            },
            on: {
              [field.type]: eventOn[field.type] || ''
            }
          }
        )
      ]
    )
    const createFields = (fields) => fields.map((field) => createField(field))
    return h('div', {attrs: {class: 'factory'}}, createFields(this.factor))
  }
}
