<template>
  <div class="pic-alert" v-if="isShow">
    <div class='alert-cover' @click.prevent="cancel"></div>
    <div class="common-bounced sendnum alert">
    <div class="title text-center">图形验证码</div>
		<div class="text-center send-input">
			<span class="name">
			  <input type="text" name="email" placeholder="请填写图形验证码" class="fs32" v-model="captchaCode">
				<img :src="picCodePath" @click.prevent="refreshCode" >
			</span>
		</div>
    <slot name="btu-group">
      <div class="btn text-center btn-group">
			  <button class="cancel" @click.prevent="cancel">取消</button>
			  <button class="confirm" @click.prevent.stop="confirm">确定</button>
		  </div>
    </slot>
	</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        captchaCode: '',
        picCodePath: '',
        isShow: false
      }
    },
    props: {
      url: {
        url: String,
        default: ''
      }
    },
    methods: {
      cancel () {
        this.isShow = false
      },
      confirm () {
        if (!this.captchaCode.length >= 1) {
          this.$store.commit('changeToast', {content: '请输入图形验证码'})
          this.eventBus.$emit('toast/show')
          return
        }
        this.eventBus.$emit('picAlert/confirm', this.captchaCode)
      },
      refreshCode () {
        this.picCodePath = `${this.url}/captcha/captcha?captchaId=captchaId&date=${new Date()}`
      },
      showPicAlert (isShow) {
        this.initData()
        this.isShow = isShow
      },
      initData () {
        this.captchaCode = ''
        this.refreshCode()
      }
    },
    created () {
      this.refreshCode()
      this.eventBus.$on('picAlert/show', this.showPicAlert)
      this.eventBus.$on('picAlert/init', this.initData)
    },
    destroyed () {
      this.eventBus.$off('picAlert/show')
      this.eventBus.$off('picAlert/init')
    }
  }
</script>

<style lang="scss" scoped>
  .pic-alert {
    .alert-cover {
      position: absolute;
      top: 0;
      z-index: 10;
      height: 100%;
      width: 100%;
      background-color: #929292;
      opacity: .8;
    }
    .btn-group {
      display: flex;
      .cancel {
        flex: 1;
        height: 0.37rem;
        border-right: 1px solid #ebebeb;
      }
      .confirm {
        flex: 1;
        color: #e0ac60!important;
      }
    }
  }
  
  .btn{
    display: inline-block;
    cursor: pointer;
    user-select: none;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
  }
	.fs32 {
    font-size: 0.32rem;
  }
  .text-center {
    text-align: center;
  }
	input::-webkit-input-placeholder {
    color: #bdbdbd;
  }
  
	.common-bounced {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 11;
    margin-left: -2.7rem;
    margin-top: -2.7rem; 
    width:5.4rem;
    font-size: 0.28rem;
    background-color:#FFFFFF;
    border-radius: 4px;
  }
	.common-bounced .title {
    background-color: #f5f5f5;
    height:1rem;
    line-height: 1rem;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
	.common-bounced .name {
    display:block;
    width: 5rem;
    margin: 0 auto;
    border-bottom: 1px solid #ebebeb;
    padding: 0.3rem 0 0.3rem 0;
  }
	.common-bounced .btn { 
    padding: 0.2rem 
  }
	.common-bounced .cancel,.common-bounced .delete{
    display:inline-block;
    width: 2.49rem;
  }
	.common-bounced .delete{
    color:#e0ac60;
    border-left: 1px solid #ebebeb;
  }
	.common-bounced .cancel {
    color: #999999;
  }
	.common-bounced .confirm,.common-bounced .cancel {
    background-color: #FFFFFF;
  }
	.sendnum input[type=text]{
    width: 4.6rem;
  }
	.sendnum .name {
    position: relative;
  }
	.sendnum .name img {
    position: absolute;
    width:1.8rem;
    right: 0.2rem;
    bottom: 0.45rem;
  }
	.send-input input{
    border: 0;
    border-bottom: 1px solid #666;
    padding: 0.3rem 0;
    text-align: left;
    width: 4.2rem;
    border-radius: 0;
  }
</style>


