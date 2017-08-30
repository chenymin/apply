<template>
  <div class="login-container">
    <p class="prompt-text">请先用您的手机号登录</p>
    <form class='form-wrap' @submit.prevent="userLoginSubmit('myForm')">
      <div class="form-filed">
        <label class="label">手机号</label>
        <input ref="mobileInput" class="value" type='tel' placeholder="请输入手机号" v-model.lazy="myForm.mobile" @keyup.prevent="formatMobile($event)"/>
      </div>
      <div class="form-filed" v-if="smsCount >= 4">
        <label class="label">图形验证</label>
        <input class="value" type='text' placeholder="请输入图形验证码" v-model="myForm.captchaCode"/>
        <img class="img-code" src="http://10.166.2.184:8080/credit-server-web/captcha/captcha" alt="">
      </div>
      <div class="form-filed on-border">
        <label class="label">验证码</label>
        <input class="value" type='tel' placeholder="请输入您的验证码" v-model="myForm.verificationCode"/>
        <button class='sms-code' :disabled="!isSendDisable" :class="{'able-activity': isSendDisable}" @click.prevent='sendCode'>{{smsText}}</button>
      </div>
      <button type="submit" class='primary-button login-button' :class="{'btn-disabled': !isLoginDisable}" :disabled="!isLoginDisable">立即登录</button>
    </form>
  </div>
</template>
<script>
  import {validMobile, setCaretPosition} from '../utils/util'
  import {userLogin, userInfo} from '../api/user'
  
  export default {
    data () {
      return {
        smsCount: 0,
        isLoginDisable: false,
        isSendDisable: false,
        smsText: '发送验证码',
        myForm: {
          mobile: '',
          verificationCode: '',
          captchaCode: '',
          sysSite: '',
          site: ''
        }
      }
    },
    methods: {
      validMobile,
      setCaretPosition,
      // 格式化手机号
      formatMobile (event) {
        const nodeInput = this.$refs.mobileInput
        let position = nodeInput.selectionStart
        let startLen = event.target.value.length
        let value = event.target.value.replace(/\D/g, '')
        if (value.length > 11) {
          value = value.substring(0, 11)
        }
        if (value.length === 11) {
          value = value.replace(/\B(?=(?:\d{4})+$)/g, ' ')
        }
        if (startLen - value.length > 0) {
          position = position - (startLen - value.length - 1)
        } else {
          position = position + Math.abs(startLen - value.length)
        }
        setTimeout(() => {
          this.setCaretPosition(nodeInput, position)
        }, 20)
        nodeInput.value = value
        this.myForm.mobile = value
      },
      // 发送验证码
      sendCode () {
        console.log('sendCode')
        let count = 60
        const countInterval = setInterval(() => {
          if (count > 0) {
            this.smsText = `${count--}s`
            this.isSendDisable = false
          } else {
            clearInterval(countInterval)
            this.smsText = '发送验证码'
            this.isSendDisable = true
          }
        }, 1000)

        userInfo().then(({data}) => {
          console.log(data)
        })
      },
      // 用户登录
      userLoginSubmit () {
        console.log('login')
        const sysSite = this.$route.params.sysSite
        const site = this.$route.params.site
        const mobile = this.myForm.mobile.replace(/\D/g, '')
        userLogin(Object.assign(this.myForm, {sysSite, site, mobile})).then(({data}) => {
          const {userId, token} = data
          window.localStorage.setItem('token', token)
          console.log(token + ' ' + userId)
        })
      }
    },
    watch: {
      'myForm': {
        deep: true,
        handler: function ({mobile, verificationCode, captchaCode}) {
          this.isSendDisable = this.validMobile(mobile)
          if (this.isSendDisable) {
            if (this.smsCount <= 3 && verificationCode.length > 0) {
              this.isLoginDisable = true
            } else if (verificationCode.length > 0 && captchaCode.length > 0) {
              this.isLoginDisable = true
            } else {
              this.isLoginDisable = false
            }
          } else {
            this.isLoginDisable = false
          }
        }
      }
    }
  }
</script>

<style lang="scss">
   @import "../scss/var";
  .login-container {
    overflow: hidden;
    .prompt-text {
        padding: $form-padding-top 0 $form-padding-bottom $primary-padding-bottom;
        padding-left: 0.3rem;
        font-size: $middle-font-size;
    }
    .login-button {
        margin-top: 0.43rem;
    }
    .sms-code {
        height: 1rem;
        position: absolute;
        top: 0;
        right: 0px;
        background-color: $bg-color;
        font-size: $small-font-size;
        padding: 0 0.3rem;
        color: #999;
    }
    .able-activity {
      background-color: #ffefea;
      color: #ff6633
    }
  }
</style>

