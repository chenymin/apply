import _ from 'lodash'
export default {
  methods: {
    validForm (form, msg) {
      let validSuccse = false
      if (!_.isEmpty(form)) {
        const arr = _.keys(form)
        for (let i = 0, len = arr.length; i < len; i++) {
          const temp = form[arr[i]]
          if (!temp || (temp && temp.toString().trim() === '')) {
            console.log(msg[arr[i]])
            break
          } else {
            validSuccse = true
          }
        }
      }
      return validSuccse
    },
    getPathKey () {
      const [, key] = _.split(this.$route.path, '/', 2)
      return key
    }
  }
}
