import _ from 'lodash'
export default {
  methods: {
    validForm (form, msg) {
      let [validSuccse, message] = [false, '']
      if (!_.isEmpty(form)) {
        const arr = _.keys(form)
        for (let i = 0, len = arr.length; i < len; i++) {
          const temp = form[arr[i]]
          console.log(!temp)
          console.log((temp && temp.toString().trim() === ''))
          if (!temp || (temp && temp.toString().trim() === '')) {
            validSuccse = false
            message = msg[arr[i]]
            break
          } else {
            validSuccse = true
            message = ''
          }
        }
      }
      return {validSuccse, message}
    },
    getPathKey () {
      const [, key] = _.split(this.$route.path, '/', 2)
      return key
    },
    showToast (msg) {
      this.$store.commit('changeToast', {content: msg, isShowToast: true})
      this.eventBus.$emit('toast/show')
    }
  }
}
