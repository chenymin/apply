<template>
  <div class="login-container">
    <p class="prompt-text">请先用您的手机号登录</p>
    <form class='form-wrap'>
      <div class="form-filed">
        <label class="label">手机号</label>
        <input class="value" type='tel' placeholder="请输入手机号"/>
      </div>
      <div class="form-filed" v-if="smsCoun >= 4">
        <label class="label">图形验证</label>
        <input class="value" type='tel' placeholder="请输入图形验证码"/>
      </div>
      <div class="form-filed on-border">
        <label class="label">验证码</label>
        <input class="value" type='tel' placeholder="请输入您的验证码"/>
        <button class='sms-code'>发送验证码</button>
      </div>
      <button class='primary-button btn-disabled login-button'>立即登录</button>
    </form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        smsCoun: 4,
        myForm: {
          mobile: '',
          vcode: '',
          smsCode: ''
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
  }
</style>

