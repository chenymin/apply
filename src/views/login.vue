<template>
  <div class="login-container">
    <p class="prompt-text">请先用您的手机号登录</p>
    <form class='form-wrap'>
      <div class="form-filed">
        <label class="label">手机号</label>
        <input ref="mobileInput" class="value" type='tel' placeholder="请输入手机号" v-model.lazy="myForm.mobile" @input="formatMobile($event)"/>
      </div>
      <div class="form-filed" v-if="smsCount >= 4">
        <label class="label">图形验证</label>
        <input class="value" type='text' placeholder="请输入图形验证码" v-model="myForm.captchaCode"/>
        <img class="img-code" src="http://10.166.2.184:8080/credit-server-web/captcha/captcha" alt="">
      </div>
      <div class="form-filed on-border">
        <label class="label">验证码</label>
        <input class="value" type='tel' placeholder="请输入您的验证码" v-model="myForm.verificationCode"/>
        <button class='sms-code' :disabled="{'disabled': !isSendDisable}" :class="{'able-activity': isSendDisable}" @click='sendCode'>发送验证码</button>
      </div>
      <button class='primary-button btn-disabled login-button' :disabled="{'disabled': isLoginDisable}" @click="userLogin">立即登录</button>
    </form>
  </div>
</template>
<script>
  import {validMobile} from '../utils/util'
  export default {
    data () {
      return {
        smsCount: 5,
        isLoginDisable: true,
        isSendDisable: false,
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
      formatMobile (event) {
        let position = this.$refs.mobileInput.selectionStart
        let value = event.target.value.replace(/\D/g, '')
        let len = value.length

        if (len > 11) {
          value = value.substring(0, 11)
          len = 11
        }

        if (len === 11) {
          value = value.replace(/\B(?=(?:\d{4})+$)/g, ' ')
          // this.isSendDisable = this.validMobile(value.replace(/\D/g, ''))
        }

        this.$refs.mobileInput.value = value
        console.log(this.myForm.mobile)
        console.log(event)
        console.log(position)
      },
      sendCode () {
        console.log('sendCode')
      },
      userLogin () {
        console.log('login')
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
  }
</style>

