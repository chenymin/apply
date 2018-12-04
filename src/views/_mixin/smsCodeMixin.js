import PicAlert from '../../components/picalert'
import {url} from '../../utils/axios'
import {validMobile} from '../../utils/util'
import _ from 'lodash'
import {getStore} from '../../utils/storage'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      url,
      smsMobile: '',
      methodType: 0,
      smsObj: {}
    }
  },
  methods: {
    validMobile,
    getStore,
    sendCode (value) {
      let captchaCode = ''
      this.methodType = 0
      if (_.isObject(value)) {
        this.smsObj = value
      } else {
        captchaCode = value
      }
      const mobile = this.smsObj.mobileNum.replace(/\s+/g, '')
      const type = this.smsObj.type
      const appChanel = getStore('site')
      const proType = this.getStore('sysSite')
      const captchaId = this.smsCode.verifyCodeCount >= 3 ? 'captchaId' : ''
      const captcha = this.smsCode.verifyCodeCount >= 3 ? captchaCode : ''
      const action = captcha === '' ? 'to_sms' : ''
      const param = Object.assign({}, {mobile, type, captcha, appChanel, proType, action, captchaId, verificationType: 3})
      this.$store.dispatch('sendSmsCode', {param}).then(({data, code, statusCode}) => {
        console.log(this.smsCode.verifyCodeCount)
        if (action === 'to_sms' && this.smsCode.verifyCodeCount >= 3) {
          this.eventBus.$emit('picAlert/show', true)
          return
        }

        if (code === 'fail' && this.smsCode.verifyCodeCount >= 3) {
          this.eventBus.$emit('picAlert/init')
          return
        }

        if (code === 'suss') {
          this.eventBus.$emit('picAlert/show', false)
          this.eventBus.$emit('smsverification/countdown')
        }
      })
      return true
    },
    comFn (mobile) {
      if (mobile.length === 11 || mobile.length === 13) {
        this.smsMobile = mobile
        this.smsVer.isSendDisable = this.validMobile(mobile)
      } else {
        this.smsVer.isSendDisable = false
      }
    },
    getSignMobileValue ({mobile}) {
      this.comFn(mobile)
    },
    getMobileValue ({mobile}) {
      this.$set(this.mobileInput['props'], 'validOff', false)
      this.mobileInput.originalidValue = ''
      this.comFn(mobile)
    },
    picAlertConfirm (captchaCode) {
      this.sendCode(captchaCode)
    }
  },
  computed: {
    ...mapGetters([
      'smsCode'
    ])
  },
  components: {
    PicAlert
  },
  mounted () {
    this.eventBus.$on('picAlert/confirm', this.picAlertConfirm)
    this.eventBus.$on('smsverification/send', this.sendCode)
  },
  destroyed () {
    this.eventBus.$off('smsverification/send')
    this.eventBus.$off('picAlert/confirm')
  }
}
